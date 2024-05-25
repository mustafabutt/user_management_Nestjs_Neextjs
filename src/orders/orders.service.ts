import { Injectable } from '@nestjs/common';
import {Order, OrderDocument } from 'src/schemas/orders';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Item, ItemDocument } from '../schemas/items';
import { RedisCacheService } from '../redis-cache/redis-cache.service';
import {Client, ClientDocument } from 'src/schemas/clients';
import { RatesService } from 'src/rates/rates.service';
import { ClientService } from 'src/client/client.service';
var pdf = require("pdf-creator-node");
var fs = require("fs");
const path = require('path')

@Injectable()
export class OrdersService {
    constructor(
        @InjectModel(Order.name) private orderModel: Model<OrderDocument>,
        @InjectModel(Item.name) private itemModel: Model<ItemDocument>,
        private Redis: RedisCacheService,
        private ratesService: RatesService,
        private clientService: ClientService,
        @InjectModel(Client.name) private clientModel: Model<ClientDocument>
    ) {}

    async readAllOrders(): Promise<Order[]> {
        return await this.orderModel.find({}).populate("client", {email:1,_id:1}).exec();
    }
    async findSingleOrder(id): Promise<Order> {
        return await this.orderModel.findOne({"_id":id});
    }
    async createOrder(Client: Order): Promise<Order> {
        const newClient = new this.orderModel(Client);
        return await newClient.save();
    }
    async updateOrder(id,order: Order): Promise<Order> {
        console.log(id)
        return await this.orderModel.findByIdAndUpdate(id,order, { new: true });
    }
    async deleteOrder(id): Promise<any> {
        return await this.orderModel.findByIdAndRemove(id);
    }
    async checkOrderItems(detsils): Promise<any> {
        return await Promise.all(detsils.map(async (obj) => {
            let data = await this.itemModel.findOne({name:obj.item});
            if(!data && data == null)
                return false;
        }));
    }
    async readAllInvoices(email): Promise<any> {
        let files = await fs.readdirSync("./invoices/"+email);
        
        return files.filter(el => path.extname(el) === '.pdf')
    }
    async removeInvoice(obj): Promise<any> {
        return await fs.unlinkSync("./invoices/"+obj.email+"/"+obj.file);
    }
    async generateInvoice(order): Promise<any> {
   
        let singleClient = await this.clientService.findSingleClient(order.client);
        var tempArray = [], pricesArray=[], total =0;
        order.details.forEach((element:any) => {
          let obj:any = {};
          obj.shipping= order.shipping;
          obj.item=element.item;
          obj.fabric=element.fabric;
          obj.qty=element.qty;
          obj.profit_margin= element.profit_margin;
          obj.usdRate=275;
          obj.decoration= element.decoration
          tempArray.push(obj)
        });
        for(let order of tempArray){
          let obj:any={}, prices;
          prices = await this.ratesService.calculatePrice(order)
          obj.item=order.item;
          obj.fabric=order.fabric;
          obj.qty=order.qty;
          obj.prices=prices.dollarPrice;
          obj.netPrice = Math.round(Number(order.qty)*Number(prices.dollarPrice));
          pricesArray.push(obj);
          total+=Number(obj.netPrice)
        }

        var options = {
            format: "A3",
            orientation: "portrait",
            border: "10mm",
            header: {
                height: "65mm",
                contents: '<div style="text-align: center;"><h2>Candlik<h2></div>'
            },
            footer: {
                height: "28mm",
                contents: {
                    first: '',
                    2: 'Second page', // Any page number is working. 1-based index
                    default: '<span style="color: #444;">{{page}}</span>/<span>{{pages}}</span>', // fallback value
                    last: ''
                }
            }
        };
        
        var html = fs.readFileSync("./template/template.html", "utf8");
        var document = {
          html: html,
          data: {
            items: pricesArray,
            total:total,
            name:singleClient.name,
            adress:singleClient.adress,
            state: singleClient.state,
            city:singleClient.city,
            email:singleClient.email,
            country:singleClient.country,
            contact_no:singleClient.contact_no
          },
          path: "./invoices/"+singleClient.email+"/"+Date.now()+".pdf",
          type: "",
        };
        return await pdf.create(document, options)
          
    }
}
