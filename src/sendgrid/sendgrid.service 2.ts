import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as SendGrid from '@sendgrid/mail';
import {globalConstants} from "../constant";

@Injectable()
export class SendgridService {
    constructor(private readonly configService: ConfigService) {
        
        SendGrid.setApiKey(process.env.SENDGRID_KEY);
      }
      async send(mail: SendGrid.MailDataRequired) {
        const transport = await SendGrid.send(mail);
        // avoid this on production. use log instead :)
     
        console.log(`E-Mail sent to ${mail.to}`);
        return transport;
      }
  
}
