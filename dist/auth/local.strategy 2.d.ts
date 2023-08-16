import { Strategy } from 'passport-local';
import { AuthService } from './auth.service';
import { Request } from 'express';
declare const LocalStrategy_base: new (...args: any[]) => Strategy;
export declare class LocalStrategy extends LocalStrategy_base {
    private authService;
    constructor(authService: AuthService);
    validate(request: Request): Promise<any>;
}
export {};
