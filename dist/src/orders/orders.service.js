"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrdersService = void 0;
const common_1 = require("@nestjs/common");
const orders_1 = require("../schemas/orders");
const mongoose_1 = require("mongoose");
const mongoose_2 = require("@nestjs/mongoose");
const items_1 = require("../schemas/items");
const redis_cache_service_1 = require("../redis-cache/redis-cache.service");
const clients_1 = require("../schemas/clients");
const rates_service_1 = require("../rates/rates.service");
const client_service_1 = require("../client/client.service");
var pdf = require("pdf-creator-node");
var fs = require("fs");
const path = require('path');
let OrdersService = class OrdersService {
    constructor(orderModel, itemModel, Redis, ratesService, clientService, clientModel) {
        this.orderModel = orderModel;
        this.itemModel = itemModel;
        this.Redis = Redis;
        this.ratesService = ratesService;
        this.clientService = clientService;
        this.clientModel = clientModel;
    }
    async readAllOrders() {
        return await this.orderModel.find({}).populate("client", { email: 1, _id: 1 }).exec();
    }
    async findSingleOrder(id) {
        return await this.orderModel.findOne({ "_id": id });
    }
    async createOrder(Client) {
        const newClient = new this.orderModel(Client);
        return await newClient.save();
    }
    async updateOrder(id, order) {
        console.log(id);
        return await this.orderModel.findByIdAndUpdate(id, order, { new: true });
    }
    async deleteOrder(id) {
        return await this.orderModel.findByIdAndRemove(id);
    }
    async checkOrderItems(detsils) {
        return await Promise.all(detsils.map(async (obj) => {
            let data = await this.itemModel.findOne({ name: obj.item });
            if (!data && data == null)
                return false;
        }));
    }
    async readAllInvoices(email) {
        let files = await fs.readdirSync("./invoices/" + email);
        return files.filter(el => path.extname(el) === '.pdf');
    }
    async removeInvoice(obj) {
        return await fs.unlinkSync("./invoices/" + obj.email + "/" + obj.file);
    }
    async generateInvoice(order) {
        let singleClient = await this.clientService.findSingleClient(order.client);
        var tempArray = [], pricesArray = [], total = 0;
        order.details.forEach((element) => {
            let obj = {};
            obj.shipping = order.shipping;
            obj.item = element.item;
            obj.fabric = element.fabric;
            obj.qty = element.qty;
            obj.profit_margin = element.profit_margin;
            obj.usdRate = 275;
            obj.decoration = element.decoration;
            tempArray.push(obj);
        });
        for (let order of tempArray) {
            let obj = {}, prices;
            prices = await this.ratesService.calculatePrice(order);
            obj.item = order.item;
            obj.fabric = order.fabric;
            obj.qty = order.qty;
            obj.prices = prices.dollarPrice;
            obj.netPrice = Math.round(Number(order.qty) * Number(prices.dollarPrice));
            pricesArray.push(obj);
            total += Number(obj.netPrice);
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
                    2: 'Second page',
                    default: '<span style="color: #444;">{{page}}</span>/<span>{{pages}}</span>',
                    last: ''
                }
            }
        };
        var html = fs.readFileSync("./template/template.html", "utf8");
        var document = {
            html: html,
            data: {
                items: pricesArray,
                total: total,
                name: singleClient.name,
                adress: singleClient.adress,
                state: singleClient.state,
                city: singleClient.city,
                email: singleClient.email,
                country: singleClient.country,
                contact_no: singleClient.contact_no
            },
            path: "./invoices/" + singleClient.email + "/" + Date.now() + ".pdf",
            type: "",
        };
        return await pdf.create(document, options);
    }
};
OrdersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_2.InjectModel)(orders_1.Order.name)),
    __param(1, (0, mongoose_2.InjectModel)(items_1.Item.name)),
    __param(5, (0, mongoose_2.InjectModel)(clients_1.Client.name)),
    __metadata("design:paramtypes", [mongoose_1.Model,
        mongoose_1.Model,
        redis_cache_service_1.RedisCacheService,
        rates_service_1.RatesService,
        client_service_1.ClientService,
        mongoose_1.Model])
], OrdersService);
exports.OrdersService = OrdersService;
//# sourceMappingURL=orders.service.js.map