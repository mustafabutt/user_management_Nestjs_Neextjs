import { Order, OrderDocument } from 'src/schemas/orders';
import { Model } from 'mongoose';
import { ItemDocument } from '../schemas/items';
import { RedisCacheService } from '../redis-cache/redis-cache.service';
import { ClientDocument } from 'src/schemas/clients';
import { RatesService } from 'src/rates/rates.service';
import { ClientService } from 'src/client/client.service';
export declare class OrdersService {
    private orderModel;
    private itemModel;
    private Redis;
    private ratesService;
    private clientService;
    private clientModel;
    constructor(orderModel: Model<OrderDocument>, itemModel: Model<ItemDocument>, Redis: RedisCacheService, ratesService: RatesService, clientService: ClientService, clientModel: Model<ClientDocument>);
    readAllOrders(): Promise<Order[]>;
    findSingleOrder(id: any): Promise<Order>;
    createOrder(Client: Order): Promise<Order>;
    updateOrder(id: any, order: Order): Promise<Order>;
    deleteOrder(id: any): Promise<any>;
    checkOrderItems(detsils: any): Promise<any>;
    readAllInvoices(email: any): Promise<any>;
    removeInvoice(obj: any): Promise<any>;
    generateInvoice(order: any): Promise<any>;
}
