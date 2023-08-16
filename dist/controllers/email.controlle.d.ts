import { SendgridService } from 'src/sendgrid/sendgrid.service';
import { Exceptions } from '../exceptions/exceptions';
export declare class EmailController {
    private readonly SendgridService;
    private exceptions;
    constructor(SendgridService: SendgridService, exceptions: Exceptions);
    SendEmail(response: any, email: string): Promise<any>;
}
