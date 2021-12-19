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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Exceptions = void 0;
const common_1 = require("@nestjs/common");
const constant_1 = require("../constant");
let Exceptions = class Exceptions {
    constructor() { }
    generateUserExistException() {
        throw new common_1.HttpException({
            status: common_1.HttpStatus.CONFLICT,
            error: constant_1.globalConstants.USER_EXIST,
        }, common_1.HttpStatus.CONFLICT);
    }
    generateGeneralException(err) {
        throw new common_1.HttpException({
            status: common_1.HttpStatus.CONFLICT,
            error: err,
        }, common_1.HttpStatus.CONFLICT);
    }
    generateBadRequestException() {
        throw new common_1.HttpException({
            status: common_1.HttpStatus.BAD_REQUEST,
            error: constant_1.globalConstants.BAD_REQUEST,
        }, common_1.HttpStatus.BAD_REQUEST);
    }
};
Exceptions = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], Exceptions);
exports.Exceptions = Exceptions;
//# sourceMappingURL=exceptions.js.map