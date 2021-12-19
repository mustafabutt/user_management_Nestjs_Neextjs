import { Model } from 'mongoose';
import { User, UserDocument } from '../schemas/users.schema';
export declare class UsersService {
    private bookModel;
    private readonly users;
    findOne(username: string): Promise<User | undefined>;
    constructor(bookModel: Model<UserDocument>);
    create(book: User): Promise<User>;
    readAll(): Promise<User[]>;
    readById(id: any): Promise<User>;
    update(id: any, book: User): Promise<User>;
    delete(id: any): Promise<any>;
}
