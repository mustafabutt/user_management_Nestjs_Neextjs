import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../schemas/users.schema';
import { Token, TokenDocument } from '../schemas/token.schema';
const fs = require('node:fs');

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Token.name) private tokenModel: Model<TokenDocument>,
  ) {}

  async create(User: User): Promise<User> {
    const newUser = new this.userModel(User);
    return await newUser.save();
  }

  async readAll(): Promise<User[]> {
    return await this.userModel.find({}, { _id: 0, email: 1, gender: 1, role:1,createdBy:1  }).exec();
  }

  async readById(id): Promise<User> {
    return await this.userModel.findById(id).exec();
  }

  async findbyEmail(email): Promise<User> {
    return await this.userModel.findOne({email:email});
  }
  async update(id, User: User): Promise<User> {
    return await this.userModel.findByIdAndUpdate(id, User, { new: true });
  }

  async delete(id): Promise<any> {
    return await this.userModel.findByIdAndRemove(id);
  }
  async logout(token: Token): Promise<any> {
    const newToken = new this.tokenModel({"token": token});
    return await newToken.save();
  }
  async saveAvatar(file,email): Promise<any> {
    try {
      return await fs.writeFileSync('./metaData/'+email+".jpg", file.buffer);
    } catch (err) {
      return err;
    }
  }
}
