import { Model } from 'mongoose';
import { User, UserDocument } from '../schemas/users.schema';
import { Token, TokenDocument } from '../schemas/token.schema';
export declare class UsersService {
    private userModel;
    private tokenModel;
    constructor(userModel: Model<UserDocument>, tokenModel: Model<TokenDocument>);
    create(User: User): Promise<User>;
    readAll(): Promise<User[]>;
    readById(id: any): Promise<User>;
    findbyEmail(email: any): Promise<User>;
    update(id: any, User: User): Promise<User>;
    delete(id: any): Promise<any>;
    logout(token: Token): Promise<any>;
}
