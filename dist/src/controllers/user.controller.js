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
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const users_schema_1 = require("../schemas/users.schema");
const users_service_1 = require("../services/users.service");
const exceptions_1 = require("../exceptions/exceptions");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const constant_1 = require("../constant");
const bcrypt = require("bcrypt");
let UserController = class UserController {
    constructor(userService, exceptions) {
        this.userService = userService;
        this.exceptions = exceptions;
    }
    async createUser(response, user) {
        try {
            const check = await this.userService.findbyEmail(user.email);
            if (check)
                this.exceptions.generateUserExistException();
            const newUser = await this.userService.create(user);
            return response.status(common_1.HttpStatus.CREATED).json({
                newUser,
            });
        }
        catch (err) {
            this.exceptions.generateGeneralException(err);
        }
    }
    async fetchAll(response) {
        try {
            const data = await this.userService.readAll();
            return response.status(common_1.HttpStatus.OK).json({
                data,
            });
        }
        catch (err) {
            this.exceptions.generateGeneralException(err);
        }
    }
    async findById(response, id) {
        try {
            const user = await this.userService.readById(id);
            return response.status(common_1.HttpStatus.OK).json({
                user,
            });
        }
        catch (err) {
            this.exceptions.generateGeneralException(err);
        }
    }
    async update(response, email, user) {
        try {
            if (user["action"] == "edit user") {
                const currentUser = await this.userService.findbyEmail(user["previousEmail"]);
                delete user["previousEmail"];
                const id = currentUser["_id"];
                const updatedUser = await this.userService.update(id, user);
                return response.status(common_1.HttpStatus.OK).json({
                    updatedUser,
                });
            }
            else if (user["action"] == "change password") {
                const currentUser = await this.userService.findbyEmail(email);
                const id = currentUser["_id"];
                const saltOrRounds = 10;
                const hash = await bcrypt.hash(user.password, saltOrRounds);
                currentUser.password = hash;
                const updatedUser = await this.userService.update(id, currentUser);
                return response.status(common_1.HttpStatus.OK).json({
                    updatedUser,
                });
            }
            else if (user["action"] == "delete user") {
                const currentUser = await this.userService.findbyEmail(email);
                const id = currentUser["_id"];
                const deletedUser = await this.userService.delete(id);
                return response.status(common_1.HttpStatus.OK).json({
                    deletedUser,
                });
            }
        }
        catch (err) {
            this.exceptions.generateGeneralException(err);
        }
    }
    async delete(response, email) {
        try {
            const currentUser = await this.userService.findbyEmail(email);
            const id = currentUser["_id"];
            const deletedUser = await this.userService.delete(id);
            return response.status(common_1.HttpStatus.OK).json({
                deletedUser,
            });
        }
        catch (err) {
            this.exceptions.generateGeneralException(err);
        }
    }
};
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, users_schema_1.User]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "createUser", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "fetchAll", null);
__decorate([
    (0, common_1.Get)('/:' + constant_1.globalConstants.ID),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)(constant_1.globalConstants.ID)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "findById", null);
__decorate([
    (0, common_1.Put)('/:email'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)("email")),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, users_schema_1.User]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)('/:email'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)("email")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "delete", null);
UserController = __decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Controller)(constant_1.globalConstants.USERS),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        exceptions_1.Exceptions])
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map