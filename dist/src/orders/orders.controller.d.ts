import { OrdersService } from './orders.service';
import { Exceptions } from 'src/exceptions/exceptions';
import { Order } from '../schemas/orders';
import { Request } from 'express';
export declare class OrdersController {
    private readonly ordersService;
    private exceptions;
    constructor(ordersService: OrdersService, exceptions: Exceptions);
    createOrder(response: any, order: Order): Promise<any>;
    createInvoice(response: any, order: Order): Promise<any>;
    fetchAllOrder(response: any): Promise<any>;
    fetchAllInvoices(response: any, obj: any): Promise<any>;
    deletenvoice(response: any, obj: any): Promise<any>;
    downloadInvoices(file: string, email: string, request: Request, response: any, obj: any): Promise<void>;
    updateOrder(response: any, order: Order): Promise<any>;
}
