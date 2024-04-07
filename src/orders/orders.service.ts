import { Injectable } from '@nestjs/common';
import {Order, OrderDocument } from 'src/schemas/orders';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Item, ItemDocument } from '../schemas/items';
import { RedisCacheService } from '../redis-cache/redis-cache.service';
import {Client, ClientDocument } from 'src/schemas/clients';

@Injectable()
export class OrdersService {
    constructor(
        @InjectModel(Order.name) private orderModel: Model<OrderDocument>,
        @InjectModel(Item.name) private itemModel: Model<ItemDocument>,
        private Redis: RedisCacheService,
        @InjectModel(Client.name) private clientModel: Model<ClientDocument>
    ) {}

    async readAllOrders(): Promise<Order[]> {
        return await this.orderModel.find({},{'_id': 0,'__v': 0}).exec();
    }
    async findSingleOrder(name): Promise<Order> {
        return await this.orderModel.findOne({name:name});
    }
    async createOrder(Client: Order): Promise<Order> {
        const newClient = new this.orderModel(Client);
        return await newClient.save();
    }
    async updateOrder(id,order: Order): Promise<Order> {
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
    async checkOrderCustomerID(id): Promise<any> {
        return await this.clientModel.findOne({id:id});
    }
}
