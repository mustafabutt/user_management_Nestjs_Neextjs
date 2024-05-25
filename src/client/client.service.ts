import { Injectable } from '@nestjs/common';
import {Client, ClientDocument } from 'src/schemas/clients';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class ClientService {
    constructor(
        @InjectModel(Client.name) private clientModel: Model<ClientDocument>,
    ) {}

    async readAllClients(): Promise<Client[]> {
        return await this.clientModel.find({},{'_id': 0 ,'__v': 0}).populate('orders').exec();
    }
    async findSingleClient(email): Promise<Client> {
        return await this.clientModel.findOne({email:email});
    }
    async createClient(Client: Client): Promise<Client> {
        const newClient = new this.clientModel(Client);
        return await newClient.save();
    }
    async updateClient(id,client: Client): Promise<Client> {
        return await this.clientModel.findByIdAndUpdate(id,client, { new: true });
    }
    async removeOrderFromClient(id): Promise<any> {
        return this.clientModel.updateMany( 
            { },
            { $pull: {  "orders": { "$in" : [id]}  } }, 
            { multi: true } 
        )
    }
    async deleteCleint(id): Promise<any> {
        return await this.clientModel.findByIdAndRemove(id);
    }
}
