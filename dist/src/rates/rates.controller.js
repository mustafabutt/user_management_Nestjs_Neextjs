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
exports.RatesController = void 0;
const common_1 = require("@nestjs/common");
const fabric_1 = require("../schemas/fabric");
const rates_service_1 = require("../rates/rates.service");
const exceptions_1 = require("../exceptions/exceptions");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const constant_1 = require("../constant");
const items_1 = require("../schemas/items");
const shipping_1 = require("../schemas/shipping");
const printing_1 = require("../schemas/printing");
const printing_2 = require("../types/printing");
const embroidery_1 = require("../types/embroidery");
const embroidery_2 = require("../schemas/embroidery");
let RatesController = class RatesController {
    constructor(ratesService, exceptions) {
        this.ratesService = ratesService;
        this.exceptions = exceptions;
    }
    async createFabric(response, fabric) {
        try {
            const check = await this.ratesService.findSingleMaterial(fabric.material);
            if (check)
                this.exceptions.generateUserExistException();
            const newFabric = await this.ratesService.createFabric(fabric);
            return response.status(common_1.HttpStatus.CREATED).json({
                newFabric,
            });
        }
        catch (err) {
            this.exceptions.generateGeneralException(err);
        }
    }
    async fetchAllFabric(response) {
        try {
            const data = await this.ratesService.readAllFabric();
            return response.status(common_1.HttpStatus.OK).json({
                data,
            });
        }
        catch (err) {
            this.exceptions.generateGeneralException(err);
        }
    }
    async findById(response, id) {
        try {
        }
        catch (err) {
            this.exceptions.generateGeneralException(err);
        }
    }
    async updateFabric(response, entity, fabric) {
        try {
            if (fabric["action"] == "edit fabric") {
                const singleMaterial = await this.ratesService.findSingleMaterial(fabric["previousMaterial"]);
                delete fabric["previousMaterial"];
                const id = singleMaterial["_id"];
                const updatedFabric = await this.ratesService.updateFabric(id, fabric);
                return response.status(common_1.HttpStatus.OK).json({
                    updatedFabric,
                });
            }
            else if (fabric["action"] == "delete fabric") {
                const singleMaterial = await this.ratesService.findSingleMaterial(fabric.material);
                const id = singleMaterial["_id"];
                const deletedFabric = await this.ratesService.deleteFabric(id);
                return response.status(common_1.HttpStatus.OK).json({
                    deletedFabric,
                });
            }
        }
        catch (err) {
            this.exceptions.generateGeneralException(err);
        }
    }
    async fetchAllItems(response) {
        try {
            const data = await this.ratesService.readAllItems();
            return response.status(common_1.HttpStatus.OK).json({
                data,
            });
        }
        catch (err) {
            this.exceptions.generateGeneralException(err);
        }
    }
    async createItem(response, item) {
        try {
            console.log(item);
            const check = await this.ratesService.findSingleItem(item.name);
            if (check)
                this.exceptions.generateUserExistException();
            const newItem = await this.ratesService.createItem(item);
            return response.status(common_1.HttpStatus.CREATED).json({
                newItem,
            });
        }
        catch (err) {
            this.exceptions.generateGeneralException(err);
        }
    }
    async calculateItemPrice(response, item) {
        try {
            console.log(item);
            let resp = await this.ratesService.calculatePrice(item);
            return response.status(common_1.HttpStatus.OK).json({
                "totalPrice": resp.totalPrice,
                "dollarPrice": "$" + resp.dollarPrice
            });
        }
        catch (err) {
            this.exceptions.generateGeneralException(err);
        }
    }
    async updateItem(response, entity, item) {
        try {
            if (item["action"] == "edit item") {
                const singleItem = await this.ratesService.findSingleItem(item["previousItem"]);
                delete item["previousItem"];
                delete item["action"];
                const id = singleItem["_id"];
                const updatedItem = await this.ratesService.updateItem(id, item);
                return response.status(common_1.HttpStatus.OK).json({
                    updatedItem,
                });
            }
            else if (item["action"] == "delete item") {
                const singleItem = await this.ratesService.findSingleItem(item.name["item"]);
                const id = singleItem["_id"];
                const deletedItem = await this.ratesService.deleteItem(id);
                return response.status(common_1.HttpStatus.OK).json({
                    deletedItem,
                });
            }
        }
        catch (err) {
            this.exceptions.generateGeneralException(err);
        }
    }
    async fetchAllShipping(skip, limit, response) {
        try {
            const data = await this.ratesService.readAllShipping(skip, limit);
            return response.status(common_1.HttpStatus.OK).json(data);
        }
        catch (err) {
            this.exceptions.generateGeneralException(err);
        }
    }
    async createShipping(response, shipping) {
        try {
            const check = await this.ratesService.findSingleShipping(shipping.service);
            if (check)
                this.exceptions.generateUserExistException();
            const newShipping = await this.ratesService.createShipping(shipping);
            return response.status(common_1.HttpStatus.CREATED).json({
                newShipping,
            });
        }
        catch (err) {
            this.exceptions.generateGeneralException(err);
        }
    }
    async updateShipping(response, entity, shipping) {
        try {
            if (shipping["action"] == "edit shipping") {
                const singleShipping = await this.ratesService.findSingleShipping(shipping["previousService"]);
                delete shipping["previousService"];
                delete shipping["action"];
                const id = singleShipping["_id"];
                const updatedShipping = await this.ratesService.updateShipping(id, shipping);
                return response.status(common_1.HttpStatus.OK).json({
                    updatedShipping,
                });
            }
            else if (shipping["action"] == "delete shipping") {
                const singleShipping = await this.ratesService.findSingleShipping(shipping.service);
                const id = singleShipping["_id"];
                const deletedShipping = await this.ratesService.deleteShipping(id);
                return response.status(common_1.HttpStatus.OK).json({
                    deletedShipping,
                });
            }
        }
        catch (err) {
            this.exceptions.generateGeneralException(err);
        }
    }
    async fetchAllPrinting(response) {
        try {
            const data = await this.ratesService.readAllPrinting();
            return response.status(common_1.HttpStatus.OK).json({
                data,
            });
        }
        catch (err) {
            this.exceptions.generateGeneralException(err);
        }
    }
    async createPrinting(response, printing) {
        try {
            if (!(printing.name in printing_2.PrintingEnum))
                return response.status(common_1.HttpStatus.BAD_GATEWAY).json({
                    msg: "please send a valid printing type",
                });
            const check = await this.ratesService.findSinglePrinting(printing.name);
            if (check)
                this.exceptions.generateUserExistException();
            const newPrinting = await this.ratesService.createPrinting(printing);
            return response.status(common_1.HttpStatus.CREATED).json({
                newPrinting,
            });
        }
        catch (err) {
            this.exceptions.generateGeneralException(err);
        }
    }
    async updatePrinting(response, entity, printing) {
        try {
            if (printing["action"] == "edit printing") {
                if (!(printing.name in printing_2.PrintingEnum))
                    return response.status(common_1.HttpStatus.BAD_GATEWAY).json({
                        msg: "please send a valid printing type",
                    });
                const singlePrinting = await this.ratesService.findSinglePrinting(printing["previousPrinting"]);
                delete printing["previousPrinting"];
                delete printing["action"];
                const id = singlePrinting["_id"];
                const updatedPrinting = await this.ratesService.updatePrinting(id, printing);
                return response.status(common_1.HttpStatus.OK).json({
                    updatedPrinting,
                });
            }
            else if (printing["action"] == "delete printing") {
                const singlePrinting = await this.ratesService.findSinglePrinting(printing.name);
                const id = singlePrinting["_id"];
                const deletedPrinting = await this.ratesService.deletePrinting(id);
                return response.status(common_1.HttpStatus.OK).json({
                    deletedPrinting,
                });
            }
        }
        catch (err) {
            this.exceptions.generateGeneralException(err);
        }
    }
    async fetchAllEmbroidery(response) {
        try {
            const data = await this.ratesService.readAllEmbroidery();
            return response.status(common_1.HttpStatus.OK).json({
                data,
            });
        }
        catch (err) {
            this.exceptions.generateGeneralException(err);
        }
    }
    async createEmbroidery(response, embroidery) {
        try {
            if (!(embroidery.name in embroidery_1.EmbroideryEnum))
                return response.status(common_1.HttpStatus.BAD_GATEWAY).json({
                    msg: "please send a valid embroidery type",
                });
            const check = await this.ratesService.findSingleEmbroidery(embroidery.name);
            if (check)
                this.exceptions.generateUserExistException();
            const newEmbroidery = await this.ratesService.createEmbroidery(embroidery);
            return response.status(common_1.HttpStatus.CREATED).json({
                newEmbroidery,
            });
        }
        catch (err) {
            this.exceptions.generateGeneralException(err);
        }
    }
    async updateEmbroidery(response, entity, embroidery) {
        try {
            if (embroidery["action"] == "edit embroidery") {
                if (!(embroidery.name in embroidery_1.EmbroideryEnum))
                    return response.status(common_1.HttpStatus.BAD_GATEWAY).json({
                        msg: "please send a valid embroidery type",
                    });
                const singleEmbroidery = await this.ratesService.findSingleEmbroidery(embroidery["previousEmbroidery"]);
                delete embroidery["previousEmbroidery"];
                delete embroidery["action"];
                const id = singleEmbroidery["_id"];
                const updatedEmbroidery = await this.ratesService.updateEmbroidery(id, embroidery);
                return response.status(common_1.HttpStatus.OK).json({
                    updatedEmbroidery,
                });
            }
            else if (embroidery["action"] == "delete embroidery") {
                console.log("hell ya");
                const singleEmbroidery = await this.ratesService.findSingleEmbroidery(embroidery.name);
                const id = singleEmbroidery["_id"];
                const deletedPEmbroidery = await this.ratesService.deleteEmbroidery(id);
                return response.status(common_1.HttpStatus.OK).json({
                    deletedPEmbroidery,
                });
            }
        }
        catch (err) {
            this.exceptions.generateGeneralException(err);
        }
    }
};
__decorate([
    (0, common_1.Post)("/fabric"),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, fabric_1.Fabric]),
    __metadata("design:returntype", Promise)
], RatesController.prototype, "createFabric", null);
__decorate([
    (0, common_1.Get)("/fabric"),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], RatesController.prototype, "fetchAllFabric", null);
__decorate([
    (0, common_1.Get)('/fabric":' + constant_1.globalConstants.ID),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)(constant_1.globalConstants.ID)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], RatesController.prototype, "findById", null);
__decorate([
    (0, common_1.Put)('/fabric/:entity'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)("entity")),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, fabric_1.Fabric]),
    __metadata("design:returntype", Promise)
], RatesController.prototype, "updateFabric", null);
__decorate([
    (0, common_1.Get)("/item"),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], RatesController.prototype, "fetchAllItems", null);
__decorate([
    (0, common_1.Post)("/item"),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, items_1.Item]),
    __metadata("design:returntype", Promise)
], RatesController.prototype, "createItem", null);
__decorate([
    (0, common_1.Post)('/item/calculate'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], RatesController.prototype, "calculateItemPrice", null);
__decorate([
    (0, common_1.Put)('/item/:entity'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)("entity")),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, items_1.Item]),
    __metadata("design:returntype", Promise)
], RatesController.prototype, "updateItem", null);
__decorate([
    (0, common_1.Get)("/shipping"),
    __param(0, (0, common_1.Query)('skip')),
    __param(1, (0, common_1.Query)('limit')),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], RatesController.prototype, "fetchAllShipping", null);
__decorate([
    (0, common_1.Post)("/shipping"),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, shipping_1.Shipping]),
    __metadata("design:returntype", Promise)
], RatesController.prototype, "createShipping", null);
__decorate([
    (0, common_1.Put)('/shipping/:entity'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)("entity")),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, shipping_1.Shipping]),
    __metadata("design:returntype", Promise)
], RatesController.prototype, "updateShipping", null);
__decorate([
    (0, common_1.Get)("/printing"),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], RatesController.prototype, "fetchAllPrinting", null);
__decorate([
    (0, common_1.Post)("/printing"),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, printing_1.Print]),
    __metadata("design:returntype", Promise)
], RatesController.prototype, "createPrinting", null);
__decorate([
    (0, common_1.Put)('/printing/:entity'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)("entity")),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, printing_1.Print]),
    __metadata("design:returntype", Promise)
], RatesController.prototype, "updatePrinting", null);
__decorate([
    (0, common_1.Get)("/embroidery"),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], RatesController.prototype, "fetchAllEmbroidery", null);
__decorate([
    (0, common_1.Post)("/embroidery"),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, embroidery_2.Embroidery]),
    __metadata("design:returntype", Promise)
], RatesController.prototype, "createEmbroidery", null);
__decorate([
    (0, common_1.Put)('/embroidery/:entity'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)("entity")),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, embroidery_2.Embroidery]),
    __metadata("design:returntype", Promise)
], RatesController.prototype, "updateEmbroidery", null);
RatesController = __decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Controller)(constant_1.globalConstants.RATES),
    __metadata("design:paramtypes", [rates_service_1.RatesService,
        exceptions_1.Exceptions])
], RatesController);
exports.RatesController = RatesController;
//# sourceMappingURL=rates.controller.js.map