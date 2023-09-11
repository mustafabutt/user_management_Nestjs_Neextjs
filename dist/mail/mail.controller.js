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
exports.MailController = void 0;
const common_1 = require("@nestjs/common");
const sendgrid_service_1 = require("../sendgrid/sendgrid.service");
const exceptions_1 = require("../exceptions/exceptions");
const constant_1 = require("../constant");
const users_service_1 = require("../services/users.service");
const redis_cache_service_1 = require("../redis-cache/redis-cache.service");
let MailController = class MailController {
    constructor(sendgridService, userService, Redis, exceptions) {
        this.sendgridService = sendgridService;
        this.userService = userService;
        this.Redis = Redis;
        this.exceptions = exceptions;
    }
    async sendEmail(response, email) {
        const check = await this.userService.findbyEmail(email.email);
        if (!check)
            this.exceptions.generateUserExistException();
        const code = Array.from(Array(8), () => Math.floor(Math.random() * 36).toString(36)).join('');
        await this.Redis.set("info", JSON.stringify({ "code": code, email: email.email }));
        const mail = {
            to: email.email,
            subject: 'Password reset',
            from: constant_1.globalConstants.SENDER_EMAIL,
            html: 'Your temporary password is <b>' + code + '</b> <br>Please change your password by navigating into settings.',
        };
        const data = await this.sendgridService.send(mail);
        return response.status(common_1.HttpStatus.CREATED).json({
            data,
        });
    }
};
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], MailController.prototype, "sendEmail", null);
MailController = __decorate([
    (0, common_1.Controller)(constant_1.globalConstants.SEND_EMAIL),
    __metadata("design:paramtypes", [sendgrid_service_1.SendgridService,
        users_service_1.UsersService,
        redis_cache_service_1.RedisCacheService,
        exceptions_1.Exceptions])
], MailController);
exports.MailController = MailController;
//# sourceMappingURL=mail.controller.js.map