import { Token } from '../schemas/token.schema';
import { UsersService } from '../services/users.service';
import { Exceptions } from '../exceptions/exceptions';
import { RedisCacheService } from '../redis-cache/redis-cache.service';
export declare class TokenController {
    private readonly userService;
    private exceptions;
    private Redis;
    constructor(userService: UsersService, exceptions: Exceptions, Redis: RedisCacheService);
    logout(response: any, token: Token, headers: any): Promise<any>;
}
