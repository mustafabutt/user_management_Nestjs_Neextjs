
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../schemas/users.schema';
import { Token, TokenDocument } from '../schemas/token.schema';
// This should be a real class/interface representing a user entity
// export type User = any;

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Token.name) private tokenModel: Model<TokenDocument>,
  ) {}

  async create(book: User): Promise<User> {
    const newUser = new this.userModel(book);
    return await newUser.save();
  }

  async readAll(): Promise<User[]> {
    return await this.userModel.find().exec();
  }

  async readById(id): Promise<User> {
    return await this.userModel.findById(id).exec();
  }

  async findbyEmail(email): Promise<User> {
    return await this.userModel.findOne({email:email});
  }
  async update(id, book: User): Promise<User> {
    return await this.userModel.findByIdAndUpdate(id, book, { new: true });
  }

  async delete(id): Promise<any> {
    return await this.userModel.findByIdAndRemove(id);
  }
  async logout(token: Token): Promise<any> {
    const newToken = new this.tokenModel({"token": token});
    return await newToken.save();
  }
}
