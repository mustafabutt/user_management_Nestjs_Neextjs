import { SendgridService } from 'src/sendgrid/sendgrid.service';
import { Exceptions } from '../exceptions/exceptions';
import { UsersService } from '../services/users.service';
import { RedisCacheService } from '../redis-cache/redis-cache.service';
export declare class MailController {
    private readonly sendgridService;
    private readonly userService;
    private Redis;
    private exceptions;
    constructor(sendgridService: SendgridService, userService: UsersService, Redis: RedisCacheService, exceptions: Exceptions);
    sendEmail(response: any, email: any): Promise<any>;
}
