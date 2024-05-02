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
const bcrypt = require("bcrypt");
let AuthService = class AuthService {
    constructor(usersService, jwtService, exceptions, Redis) {
        this.usersService = usersService;
        this.jwtService = jwtService;
        this.exceptions = exceptions;
        this.Redis = Redis;
    }
    async validateUser(obj) {
        let isMatch;
        const user = await this.usersService.findbyEmail(obj.email);
        if (JSON.parse(await this.Redis.get("info")) != null)
            if (JSON.parse(await this.Redis.get("info")).email == obj.email && JSON.parse(await this.Redis.get("info")).code == obj.password)
                obj.password = user.password;
        if (user && JSON.parse(await this.Redis.get("info")) == null)
            isMatch = await bcrypt.compare(obj.password, user.password);
        else
            isMatch = true;
        if (user && isMatch) {
            const { password } = user, result = __rest(user, ["password"]);
            return result;
        }
        return null;
    }
    async login(user) {
        const payload = { email: user._doc.email, sub: user._doc.userId };
        const token = this.jwtService.sign(payload);
        user._doc.access_token = token;
        delete user._doc.password;
        return user._doc;
    }
    async signup(user) {
        try {
            const check = await this.usersService.findbyEmail(user.email);
            if (check)
                this.exceptions.generateUserExistException();
            const saltOrRounds = 10;
            const hash = await bcrypt.hash(user.password, saltOrRounds);
            user.password = hash;
            return await this.usersService.create(user);
        }
        catch (err) {
            this.exceptions.generateGeneralException(err);
        }
    }
    async logout(token) {
        try {
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