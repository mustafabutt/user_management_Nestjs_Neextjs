import { AuthService } from './auth/auth.service';
export declare class AppController {
    private authService;
    constructor(authService: AuthService);
    login(req: any): Promise<any>;
    logout(req: any, headers: any): Promise<any>;
    signup(response: any, req: any): Promise<any>;
}
