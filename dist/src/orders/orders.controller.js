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
exports.OrdersController = void 0;
const orders_service_1 = require("./orders.service");
const exceptions_1 = require("../exceptions/exceptions");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const orders_1 = require("../schemas/orders");
const client_service_1 = require("../client/client.service");
const common_1 = require("@nestjs/common");
let OrdersController = class OrdersController {
    constructor(ordersService, clientService, exceptions) {
        this.ordersService = ordersService;
        this.clientService = clientService;
        this.exceptions = exceptions;
    }
    async createOrder(response, order) {
        try {
            let email = order.client;
            let orderDetailsValid = await this.ordersService.checkOrderItems(order.details);
            let customerValid = await this.clientService.findSingleClient(order.client);
            order.client = customerValid['_id'];
            if (orderDetailsValid.includes(false) || customerValid == null)
                return response.status(common_1.HttpStatus.BAD_GATEWAY).JSON({ msg: "bad request" });
            const newOrder = await this.ordersService.createOrder(order);
            customerValid.orders.push(newOrder["_id"]);
            await this.clientService.updateClient(order.client, customerValid);
            order.client = email;
            await this.ordersService.generateInvoice(order);
            return response.status(common_1.HttpStatus.CREATED).json({
                newOrder,
            });
        }
        catch (err) {
            this.exceptions.generateGeneralException(err);
        }
    }
    async createInvoice(response, order) {
        try {
            let data = await this.ordersService.generateInvoice(order);
            console.log("all done");
            console.log(data);
            return response.status(common_1.HttpStatus.CREATED).json({
                data,
            });
        }
        catch (err) {
            this.exceptions.generateGeneralException(err);
        }
    }
    async fetchAllOrder(response) {
        try {
            const data = await this.ordersService.readAllOrders();
            return response.status(common_1.HttpStatus.OK).json({
                data,
            });
        }
        catch (err) {
            this.exceptions.generateGeneralException(err);
        }
    }
    async fetchAllInvoices(response, obj) {
        try {
            const data = await this.ordersService.readAllInvoices(obj.email);
            return response.status(common_1.HttpStatus.OK).json({
                data,
            });
        }
        catch (err) {
            this.exceptions.generateGeneralException(err);
        }
    }
    async deletenvoice(response, obj) {
        try {
            const data = await this.ordersService.removeInvoice(obj);
            return response.status(common_1.HttpStatus.OK).json({
                data,
            });
        }
        catch (err) {
            this.exceptions.generateGeneralException(err);
        }
    }
    async downloadInvoices(file, email, request, response, obj) {
        try {
            response.download("./invoices/" + email + "/" + file, (err) => {
                if (err) {
                    response.send({
                        error: err,
                        msg: "Problem downloading the file"
                    });
                }
            });
        }
        catch (err) {
            this.exceptions.generateGeneralException(err);
        }
    }
    async updateOrder(response, order) {
        try {
            if (order["action"] == "edit order") {
                if (!order.shipping || !order.client.email || !order.delivery_date) {
                    const singleOrder = await this.ordersService.findSingleOrder(order["_id"]);
                    order.shipping = singleOrder.shipping;
                    order.client.email = singleOrder.client.email;
                    order.delivery_date = singleOrder.delivery_date;
                }
                const updatedOrder = await this.ordersService.updateOrder(order["_id"], order);
                return response.status(common_1.HttpStatus.OK).json({
                    updatedOrder,
                });
            }
            else if (order["action"] == "delete order") {
                let a = await this.clientService.removeOrderFromClient(order["_id"]);
                const deletedOrder = await this.ordersService.deleteOrder(order["_id"]);
                return response.status(common_1.HttpStatus.OK).json({
                    deletedOrder,
                });
            }
        }
        catch (err) {
            this.exceptions.generateGeneralException(err);
        }
    }
};
__decorate([
    (0, common_1.Post)("/"),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, orders_1.Order]),
    __metadata("design:returntype", Promise)
], OrdersController.prototype, "createOrder", null);
__decorate([
    (0, common_1.Post)("/invoice/"),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, orders_1.Order]),
    __metadata("design:returntype", Promise)
], OrdersController.prototype, "createInvoice", null);
__decorate([
    (0, common_1.Get)("/"),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], OrdersController.prototype, "fetchAllOrder", null);
__decorate([
    (0, common_1.Post)("/invoices/"),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], OrdersController.prototype, "fetchAllInvoices", null);
__decorate([
    (0, common_1.Post)("/invoice/delete/"),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], OrdersController.prototype, "deletenvoice", null);
__decorate([
    (0, common_1.Post)("/invoice/download/:file"),
    __param(0, (0, common_1.Query)('file')),
    __param(1, (0, common_1.Query)('email')),
    __param(2, (0, common_1.Req)()),
    __param(3, (0, common_1.Res)()),
    __param(4, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object, Object, Object]),
    __metadata("design:returntype", Promise)
], OrdersController.prototype, "downloadInvoices", null);
__decorate([
    (0, common_1.Put)('/'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, orders_1.Order]),
    __metadata("design:returntype", Promise)
], OrdersController.prototype, "updateOrder", null);
OrdersController = __decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Controller)('orders'),
    __metadata("design:paramtypes", [orders_service_1.OrdersService,
        client_service_1.ClientService,
        exceptions_1.Exceptions])
], OrdersController);
exports.OrdersController = OrdersController;
//# sourceMappingURL=orders.controller.js.map