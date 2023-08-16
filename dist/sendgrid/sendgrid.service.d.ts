import { ConfigService } from '@nestjs/config';
import * as SendGrid from '@sendgrid/mail';
export declare class SendgridService {
    private readonly configService;
    constructor(configService: ConfigService);
    send(mail: SendGrid.MailDataRequired): Promise<[SendGrid.ClientResponse, {}]>;
}
