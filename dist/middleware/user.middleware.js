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
exports.UserMiddleware = void 0;
const common_1 = require("@nestjs/common");
const exceptions_1 = require("../exceptions/exceptions");
const constant_1 = require("../constant");
let UserMiddleware = class UserMiddleware {
    constructor(exceptions) {
        this.exceptions = exceptions;
    }
    use(req, res, next) {
        if (req.method === constant_1.globalConstants.POST) {
            if (req.body.hasOwnProperty(constant_1.globalConstants.USERNAME) &&
                req.body.hasOwnProperty(constant_1.globalConstants.PASSWORD))
                next();
            else
                this.exceptions.generateBadRequestException();
        }
        else if (req.method === constant_1.globalConstants.PUT) {
            if (req.body.hasOwnProperty(constant_1.globalConstants.USERNAME) &&
                req.body.hasOwnProperty(constant_1.globalConstants.PASSWORD) &&
                req.body.hasOwnProperty(constant_1.globalConstants.ID))
                next();
            else
                this.exceptions.generateBadRequestException();
        }
        else if (req.method === constant_1.globalConstants.DELETE) {
            if (req.body.hasOwnProperty(constant_1.globalConstants.ID))
                next();
            else
                this.exceptions.generateBadRequestException();
        }
        else
            next();
    }
};
UserMiddleware = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [exceptions_1.Exceptions])
], UserMiddleware);
exports.UserMiddleware = UserMiddleware;
//# sourceMappingURL=user.middleware.js.map