import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Fabric, FabricDocument } from '../schemas/fabric';
import { Item, ItemDocument } from '../schemas/items';
import { Shipping, ShippingDocument } from '../schemas/shipping';
import { Print, PrintDocument } from '../schemas/printing';
import { Embroidery,EmbroideryDocument } from 'src/schemas/embroidery';

@Injectable()
export class RatesService {
  constructor(
    @InjectModel(Fabric.name) private fabricModel: Model<FabricDocument>,
    @InjectModel(Item.name) private itemModel: Model<ItemDocument>,
    @InjectModel(Shipping.name) private shippingModel: Model<ShippingDocument>,
    @InjectModel(Print.name) private printingModel: Model<PrintDocument>,
    @InjectModel(Embroidery.name) private embroideryModel: Model<EmbroideryDocument>
  ) {}

  async createFabric(Fabric: Fabric): Promise<Fabric> {
    const newUser = new this.fabricModel(Fabric);
    return await newUser.save();
  }

  async readAllFabric(): Promise<Fabric[]> {
    return await this.fabricModel.find({}, { _id: 0, material: 1, rate: 1  }).exec();
  }

  async findSingleMaterial(material): Promise<Fabric> {
    return await this.fabricModel.findOne({material:material});
  }
  async findSingleItem(name): Promise<Item> {
    return await this.itemModel.findOne({name:name});
  }
  async findSingleShipping(name): Promise<Shipping> {
    return await this.shippingModel.findOne({service:name});
  }
  async updateFabric(id,fabric: Fabric): Promise<Fabric> {
    return await this.fabricModel.findByIdAndUpdate(id,fabric, { new: true });
  }
  async deleteFabric(id): Promise<any> {
    return await this.fabricModel.findByIdAndRemove(id);
  }

  async findSinglePrinting(name): Promise<Print> {
    return await this.printingModel.findOne({name:name});
  }
  async findSingleEmbroidery(name): Promise<Embroidery> {
    return await this.embroideryModel.findOne({name:name});
  }

  async readAllItems(): Promise<Item[]> {
    return await this.itemModel.find({}, { _id: 0, name: 1, fabricAverageAndMakery: 1, production_time: 1, profit_margin: 1  }).exec();
  }

  async deleteItem(id): Promise<any> {
    return await this.itemModel.findByIdAndRemove(id);
  }
  async deleteShipping(id): Promise<any> {
    return await this.shippingModel.findByIdAndRemove(id);
  }
  async deletePrinting(id): Promise<any> {
    return await this.printingModel.findByIdAndRemove(id);
  }
  async deleteEmbroidery(id): Promise<any> {
    return await this.embroideryModel.findByIdAndRemove(id);
  }
  async createItem(Item: Item): Promise<Item> {
    const newItem = new this.itemModel(Item);
    return await newItem.save();
  }
  async updateItem(id,item: Item): Promise<Item> {
    return await this.itemModel.findByIdAndUpdate(id,item);

  }
  async readAllShipping(): Promise<Shipping[]> {
    return await this.shippingModel.find({}, { _id: 0, service: 1, rate: 1  }).exec();
  }

  async readAllPrinting(): Promise<Print[]> {
    return await this.printingModel.find({}, { _id: 0, name: 1, base_rate: 1  }).exec();
  }
  async readAllEmbroidery(): Promise<Embroidery[]> {
    return await this.embroideryModel.find({}, { _id: 0, name: 1, base_rate: 1  }).exec();
  }
  async createShipping(Shipping: Shipping): Promise<Shipping> {
    const newShipping = new this.shippingModel(Shipping);
    return await newShipping.save();
  }
  async updateShipping(id,shipping: Shipping): Promise<Shipping> {
    return await this.shippingModel.findByIdAndUpdate(id,shipping);
  }
  async updatePrinting(id,printing: Print): Promise<Print> {
    return await this.printingModel.findByIdAndUpdate(id,printing);
  }
  async updateEmbroidery(id,embroidery: Embroidery): Promise<Embroidery> {
    return await this.embroideryModel.findByIdAndUpdate(id,embroidery);
  }
  async createPrinting(Print: Print): Promise<Print> {
    const newPrinting = new this.printingModel(Print);
    return await newPrinting.save();
  }
  async createEmbroidery(Embroidery: Embroidery): Promise<Embroidery> {
    const newEmbroidery = new this.embroideryModel(Embroidery);
    return await newEmbroidery.save();
  }

}
