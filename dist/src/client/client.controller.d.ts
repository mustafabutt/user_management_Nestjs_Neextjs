import { ClientService } from './client.service';
import { Exceptions } from 'src/exceptions/exceptions';
import { Client } from '../schemas/clients';
export declare class ClientController {
    private readonly clientService;
    private exceptions;
    constructor(clientService: ClientService, exceptions: Exceptions);
    createClient(response: any, client: Client): Promise<any>;
    fetchAllClient(response: any): Promise<any>;
    updateClient(response: any, client: Client): Promise<any>;
}
