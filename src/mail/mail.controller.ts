import {
    Body,
    Post,
    Res,
    Controller,   HttpStatus,
  } from '@nestjs/common';
import { SendgridService } from 'src/sendgrid/sendgrid.service';
import { Exceptions } from '../exceptions/exceptions';
import { globalConstants } from '../constant';
import { UsersService } from '../services/users.service';
import { RedisCacheService } from '../redis-cache/redis-cache.service';

@Controller(globalConstants.SEND_EMAIL)
export class MailController {
    constructor(
        private readonly sendgridService: SendgridService,
        private readonly userService: UsersService,
        private Redis: RedisCacheService,
        private exceptions: Exceptions,
      ) {}

      @Post()
      async sendEmail(@Res() response, @Body() email: any) {
        console.log(email)
        const check = await this.userService.findbyEmail(email.email);
        if (!check) this.exceptions.generateUserExistException();
        
        const code = Array.from(Array(8), () => Math.floor(Math.random() * 36).toString(36)).join('' )

        await this.Redis.set("info",JSON.stringify({"code":code, email: email.email}));

        const mail = {
          to: email.email,
          subject: 'Password reset',
          from: globalConstants.SENDER_EMAIL,
          html: 'Your temporary password is <b>'+code+'</b> <br>Please change your password by navigating into settings.',
        };
  
        const data = await this.sendgridService.send(mail);
        
        return response.status(HttpStatus.CREATED).json({
            data,
          });
      }
}
