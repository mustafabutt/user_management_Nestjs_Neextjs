import { Strategy } from 'passport-local';
import { AuthService } from './auth.service';
import { Request } from 'express';
import { UsersService } from '../services/users.service';
declare const LocalStrategy_base: new (...args: any[]) => Strategy;
export declare class LocalStrategy extends LocalStrategy_base {
    private authService;
    private readonly userService;
    constructor(authService: AuthService, userService: UsersService);
    validate(request: Request): Promise<any>;
}
export {};
