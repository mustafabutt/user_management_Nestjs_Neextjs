import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as SendGrid from '@sendgrid/mail';

@Injectable()
export class SendgridService {
    constructor(private readonly configService: ConfigService) {
        
        SendGrid.setApiKey("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");
      }
      async send(mail: SendGrid.MailDataRequired) {
        try{
          const transport = await SendGrid.send(mail);
          // avoid this on production. use log instead :)
       
          console.log(`E-Mail sent to ${mail.to}`);
          return transport;
        }catch(e){
          console.log(e.response.body)
        }
        
      }
  
}
