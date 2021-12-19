import { UsersService } from '../services/users.service';
import { JwtService } from '@nestjs/jwt';
import { RedisCacheService } from '../redis-cache/redis-cache.service';
import { Exceptions } from '../exceptions/exceptions';
export declare class AuthService {
    private usersService;
    private jwtService;
    private exceptions;
    private Redis;
    constructor(usersService: UsersService, jwtService: JwtService, exceptions: Exceptions, Redis: RedisCacheService);
    validateUser(obj: any): Promise<any>;
    login(user: any): Promise<{
        access_token: string;
    }>;
    signup(user: any): Promise<import("../schemas/users.schema").User>;
    logout(token: any): Promise<any>;
}
