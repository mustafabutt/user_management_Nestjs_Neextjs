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
exports.RatesService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const fabric_1 = require("../schemas/fabric");
const items_1 = require("../schemas/items");
const shipping_1 = require("../schemas/shipping");
const printing_1 = require("../schemas/printing");
const embroidery_1 = require("../schemas/embroidery");
let RatesService = class RatesService {
    constructor(fabricModel, itemModel, shippingModel, printingModel, embroideryModel) {
        this.fabricModel = fabricModel;
        this.itemModel = itemModel;
        this.shippingModel = shippingModel;
        this.printingModel = printingModel;
        this.embroideryModel = embroideryModel;
    }
    async createFabric(Fabric) {
        const newUser = new this.fabricModel(Fabric);
        return await newUser.save();
    }
    async readAllFabric() {
        return await this.fabricModel.find({}, { _id: 0, material: 1, rate: 1 }).exec();
    }
    async findSingleMaterial(material) {
        return await this.fabricModel.findOne({ material: material });
    }
    async findSingleItem(name) {
        return await this.itemModel.findOne({ name: name });
    }
    async findSingleShipping(name) {
        return await this.shippingModel.findOne({ service: name });
    }
    async updateFabric(id, fabric) {
        return await this.fabricModel.findByIdAndUpdate(id, fabric, { new: true });
    }
    async deleteFabric(id) {
        return await this.fabricModel.findByIdAndRemove(id);
    }
    async findSinglePrinting(name) {
        return await this.printingModel.findOne({ name: name });
    }
    async findSingleEmbroidery(name) {
        return await this.embroideryModel.findOne({ name: name });
    }
    async readAllItems() {
        return await this.itemModel.find({}, { _id: 0, name: 1, fabricAverageAndMakery: 1, production_time: 1, profit_margin: 1 }).exec();
    }
    async deleteItem(id) {
        return await this.itemModel.findByIdAndRemove(id);
    }
    async deleteShipping(id) {
        return await this.shippingModel.findByIdAndRemove(id);
    }
    async deletePrinting(id) {
        return await this.printingModel.findByIdAndRemove(id);
    }
    async deleteEmbroidery(id) {
        return await this.embroideryModel.findByIdAndRemove(id);
    }
    async createItem(Item) {
        const newItem = new this.itemModel(Item);
        return await newItem.save();
    }
    async updateItem(id, item) {
        return await this.itemModel.findByIdAndUpdate(id, item);
    }
    async readAllShipping(query) {
        const { skip, limit } = query;
        delete query['skip'];
        delete query['limit'];
        const count = await this.shippingModel.countDocuments({}).exec();
        const page_total = Math.floor((count - 1) / limit) + 1;
        const data = await this.shippingModel.find(query, { _id: 0 }).limit(limit).skip(skip).exec();
        return {
            data: data,
            page_total: page_total,
            count: count,
            status: 200,
        };
    }
    async readAllPrinting() {
        return await this.printingModel.find({}, { _id: 0, name: 1, base_rate: 1 }).exec();
    }
    async readAllEmbroidery() {
        return await this.embroideryModel.find({}, { _id: 0, name: 1, base_rate: 1 }).exec();
    }
    async createShipping(Shipping) {
        const newShipping = new this.shippingModel(Shipping);
        return await newShipping.save();
    }
    async updateShipping(id, shipping) {
        return await this.shippingModel.findByIdAndUpdate(id, shipping);
    }
    async updatePrinting(id, printing) {
        return await this.printingModel.findByIdAndUpdate(id, printing);
    }
    async updateEmbroidery(id, embroidery) {
        return await this.embroideryModel.findByIdAndUpdate(id, embroidery);
    }
    async createPrinting(Print) {
        const newPrinting = new this.printingModel(Print);
        return await newPrinting.save();
    }
    async createEmbroidery(Embroidery) {
        const newEmbroidery = new this.embroideryModel(Embroidery);
        return await newEmbroidery.save();
    }
    async calculatePrice(item) {
        console.log(item);
        let shippingMode = item.shipping.split("(")[1].split(")")[0] + "Rate";
        let shippingCompany = item.shipping.split("(")[0];
        let profitMargin = item.profit_margin.split("%")[0];
        console.log(shippingCompany + shippingMode);
        let avg, fabricPrice, fabricPriceInGrams, shippinginPerItem, totalPrice, makery, dollarPrice, printingBaseRate, embBaseRate, printRate = 0, embRate = 0;
        const singleMaterial = await this.findSingleMaterial(item.fabric);
        const singleItem = await this.findSingleItem(item.item);
        const shipping = await this.findSingleShipping(shippingCompany);
        console.log("shipping per KG " + shipping.rate[0][shippingMode]);
        singleItem.fabricAverageAndMakery.filter((obj) => {
            if (obj.fabric == item.fabric) {
                avg = obj.quantity;
                makery = obj.makery;
            }
        });
        fabricPriceInGrams = 1000 / avg;
        fabricPrice = Number(singleMaterial.rate) / fabricPriceInGrams;
        console.log("fabric price is " + fabricPrice);
        shippinginPerItem = Number(shipping.rate[0][shippingMode]) / fabricPriceInGrams;
        console.log("shipping per item " + shippinginPerItem);
        if (item.decoration.value != '' && item.decoration.value == "Printing") {
            console.log("111111");
            const singlePrinting = await this.findSinglePrinting(item.decoration.type);
            printingBaseRate = singlePrinting.base_rate;
            let size = Number(item.decoration.size.width) * Number(item.decoration.size.height);
            if (size >= 1)
                printRate = size * 5 + printingBaseRate;
            totalPrice = Number(shippinginPerItem) + Number(fabricPrice) + Number(makery) + printRate;
        }
        if (item.decoration.value != '' && item.decoration.value == "Embroidery") {
            console.log("22222");
            const singleEmb = await this.findSingleEmbroidery(item.decoration.type);
            embBaseRate = singleEmb.base_rate;
            let size = Number(item.decoration.size.width) * Number(item.decoration.size.height);
            if (size >= 1)
                embRate = size * 5 + embBaseRate;
        }
        totalPrice = Number(shippinginPerItem) + Number(fabricPrice) + Number(makery) + embRate + printRate;
        dollarPrice = Number(profitMargin) / Number(100) * Number(totalPrice) + totalPrice;
        dollarPrice = Math.round(dollarPrice / item.usdRate * 100) / 100;
        console.log("total price is " + totalPrice);
        console.log("dollar price is " + dollarPrice);
        return { totalPrice, dollarPrice };
    }
};
RatesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(fabric_1.Fabric.name)),
    __param(1, (0, mongoose_1.InjectModel)(items_1.Item.name)),
    __param(2, (0, mongoose_1.InjectModel)(shipping_1.Shipping.name)),
    __param(3, (0, mongoose_1.InjectModel)(printing_1.Print.name)),
    __param(4, (0, mongoose_1.InjectModel)(embroidery_1.Embroidery.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model])
], RatesService);
exports.RatesService = RatesService;
//# sourceMappingURL=rates.service.js.map