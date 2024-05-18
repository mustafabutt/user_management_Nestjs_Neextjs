import { StreamableFile } from '@nestjs/common';
import { User } from '../schemas/users.schema';
import { UsersService } from '../services/users.service';
import { Exceptions } from '../exceptions/exceptions';
import type { Response } from 'express';
export declare class UserController {
    private readonly userService;
    private exceptions;
    constructor(userService: UsersService, exceptions: Exceptions);
    createUser(response: any, user: User): Promise<any>;
    fetchAll(response: any): Promise<any>;
    getFile(Header: any, res: Response): Promise<StreamableFile>;
    findById(response: any, id: any): Promise<any>;
    updateAvatar(response: any, file: any, body: any): Promise<any>;
    update(response: any, email: any, user: User): Promise<any>;
    delete(response: any, email: any): Promise<any>;
}
