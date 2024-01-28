import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Fabric, FabricDocument } from '../schemas/fabric';
import { Makery, MakeryDocument } from '../schemas/makery';
import { Item, ItemDocument } from '../schemas/items';
import { Shipping, ShippingDocument } from '../schemas/shipping';


@Injectable()
export class RatesService {
  constructor(
    @InjectModel(Fabric.name) private fabricModel: Model<FabricDocument>,
    @InjectModel(Makery.name) private makeryModel: Model<MakeryDocument>,
    @InjectModel(Item.name) private itemModel: Model<ItemDocument>,
    @InjectModel(Shipping.name) private shippingModel: Model<ShippingDocument>
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

  async createMakery(Makery: Makery): Promise<Makery> {
    const newMakery = new this.makeryModel(Makery);
    return await newMakery.save();
  }

  async readAllMakery(): Promise<Makery[]> {
    return await this.makeryModel.find({}, { _id: 0, item: 1, rate: 1  }).exec();
  }

  async readAllItems(): Promise<Item[]> {
    return await this.itemModel.find({}, { _id: 0, name: 1, fabricAverage: 1  }).exec();
  }
  async findSingleMakery(item): Promise<Makery> {
    return await this.makeryModel.findOne({item:item});
  }
  async updateMakery(id,makery: Makery): Promise<Makery> {
    return await this.makeryModel.findByIdAndUpdate(id,makery);
  }
  async deleteMakery(id): Promise<any> {
    return await this.makeryModel.findByIdAndRemove(id);
  }
  async deleteItem(id): Promise<any> {
    return await this.itemModel.findByIdAndRemove(id);
  }
  async deleteShipping(id): Promise<any> {
    return await this.shippingModel.findByIdAndRemove(id);
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
  async createShipping(Shipping: Shipping): Promise<Shipping> {
    const newShipping = new this.shippingModel(Shipping);
    return await newShipping.save();
  }
  async updateShipping(id,shipping: Shipping): Promise<Shipping> {
    console.log(shipping);
    console.log(id);
    return await this.shippingModel.findByIdAndUpdate(id,shipping);

  }
}
