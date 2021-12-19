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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("../services/users.service");
const jwt_1 = require("@nestjs/jwt");
const redis_cache_service_1 = require("../redis-cache/redis-cache.service");
const exceptions_1 = require("../exceptions/exceptions");
const constant_1 = require("../constant");
let AuthService = class AuthService {
    constructor(usersService, jwtService, exceptions, Redis) {
        this.usersService = usersService;
        this.jwtService = jwtService;
        this.exceptions = exceptions;
        this.Redis = Redis;
    }
    async validateUser(obj) {
        const user = await this.usersService.findbyName(obj.username);
        if (user && obj.password === user.password) {
            const { password } = user, result = __rest(user, ["password"]);
            return result;
        }
        return null;
    }
    async login(user) {
        const payload = { username: user._doc.username, sub: user._doc.userId };
        const token = this.jwtService.sign(payload);
        await this.Redis.set(user._doc.username, token);
        return {
            access_token: token,
        };
    }
    async signup(user) {
        try {
            const check = await this.usersService.findbyName(user.username);
            if (check)
                this.exceptions.generateUserExistException();
            return await this.usersService.create(user);
        }
        catch (err) {
            this.exceptions.generateGeneralException(err);
        }
    }
    async logout(token) {
        try {
            const decoded = this.jwtService.decode(token);
            await this.Redis.del(decoded[constant_1.globalConstants.TOKEN_USERNAME]);
            return await this.usersService.logout(token);
        }
        catch (err) {
            this.exceptions.generateGeneralException(err);
        }
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        jwt_1.JwtService,
        exceptions_1.Exceptions,
        redis_cache_service_1.RedisCacheService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map