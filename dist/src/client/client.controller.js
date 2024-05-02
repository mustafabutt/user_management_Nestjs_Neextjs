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
exports.ClientController = void 0;
const client_service_1 = require("./client.service");
const exceptions_1 = require("../exceptions/exceptions");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const clients_1 = require("../schemas/clients");
var fs = require("fs");
const common_1 = require("@nestjs/common");
let ClientController = class ClientController {
    constructor(clientService, exceptions) {
        this.clientService = clientService;
        this.exceptions = exceptions;
    }
    async createClient(response, client) {
        try {
            const newClient = await this.clientService.createClient(client);
            var dir = './invoices/' + client.email;
            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir);
            }
            return response.status(common_1.HttpStatus.CREATED).json({
                newClient,
            });
        }
        catch (err) {
            this.exceptions.generateGeneralException(err);
        }
    }
    async fetchAllClient(response) {
        try {
            const data = await this.clientService.readAllClients();
            return response.status(common_1.HttpStatus.OK).json({
                data,
            });
        }
        catch (err) {
            this.exceptions.generateGeneralException(err);
        }
    }
    async updateClient(response, client) {
        try {
            if (client["action"] == "edit client") {
                delete client["action"];
                let singleClient = await this.clientService.findSingleClient(client["previousEmail"]);
                delete client["previousEmail"];
                let id = singleClient["_id"];
                const updatedClient = await this.clientService.updateClient(id, client);
                return response.status(common_1.HttpStatus.OK).json({
                    updatedClient,
                });
            }
            else if (client["action"] == "delete client") {
                const singleClient = await this.clientService.findSingleClient(client.email);
                const id = singleClient["_id"];
                const deletedClient = await this.clientService.deleteCleint(id);
                return response.status(common_1.HttpStatus.OK).json({
                    deletedClient,
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
    __metadata("design:paramtypes", [Object, clients_1.Client]),
    __metadata("design:returntype", Promise)
], ClientController.prototype, "createClient", null);
__decorate([
    (0, common_1.Get)("/"),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ClientController.prototype, "fetchAllClient", null);
__decorate([
    (0, common_1.Put)('/'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, clients_1.Client]),
    __metadata("design:returntype", Promise)
], ClientController.prototype, "updateClient", null);
ClientController = __decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Controller)('clients'),
    __metadata("design:paramtypes", [client_service_1.ClientService,
        exceptions_1.Exceptions])
], ClientController);
exports.ClientController = ClientController;
//# sourceMappingURL=client.controller.js.map