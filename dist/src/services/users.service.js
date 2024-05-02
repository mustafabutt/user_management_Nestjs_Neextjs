"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const users_schema_1 = require("../schemas/users.schema");
const token_schema_1 = require("../schemas/token.schema");
let UsersService = class UsersService {
    constructor(userModel, tokenModel) {
        this.userModel = userModel;
        this.tokenModel = tokenModel;
    }
    async create(User) {
        const newUser = new this.userModel(User);
        return await newUser.save();
    }
    async readAll() {
        return await this.userModel.find({}, { _id: 0, email: 1, gender: 1, role: 1, createdBy: 1 }).exec();
    }
    async readById(id) {
        return await this.userModel.findById(id).exec();
    }
    async findbyEmail(email) {
        return await this.userModel.findOne({ email: email });
    }
    async update(id, User) {
        return await this.userModel.findByIdAndUpdate(id, User, { new: true });
    }
    async delete(id) {
        return await this.userModel.findByIdAndRemove(id);
    }
    async logout(token) {
        const newToken = new this.tokenModel({ "token": token });
        return await newToken.save();
    }
};
UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(users_schema_1.User.name)),
    __param(1, (0, mongoose_1.InjectModel)(token_schema_1.Token.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map