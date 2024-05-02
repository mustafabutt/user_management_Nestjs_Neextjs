import { Client, ClientDocument } from 'src/schemas/clients';
import { Model } from 'mongoose';
export declare class ClientService {
    private clientModel;
    constructor(clientModel: Model<ClientDocument>);
    readAllClients(): Promise<Client[]>;
    findSingleClient(name: any): Promise<Client>;
    createClient(Client: Client): Promise<Client>;
    updateClient(id: any, client: Client): Promise<Client>;
    deleteCleint(id: any): Promise<any>;
}
