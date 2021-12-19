"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const user_controller_1 = require("./controllers/user.controller");
const auth_module_1 = require("./auth/auth.module");
const users_module_1 = require("./services/users.module");
const users_schema_1 = require("./schemas/users.schema");
const token_schema_1 = require("./schemas/token.schema");
const users_service_1 = require("./services/users.service");
const exceptions_1 = require("./exceptions/exceptions");
const constant_1 = require("./constant");
const user_middleware_1 = require("./middleware/user.middleware");
const redisCache_module_1 = require("./redis-cache/redisCache.module");
let AppModule = class AppModule {
    configure(consumer) {
        consumer.apply(user_middleware_1.UserMiddleware).forRoutes(constant_1.globalConstants.USERS);
    }
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            (0, common_1.forwardRef)(() => auth_module_1.AuthModule),
            users_module_1.UsersModule,
            redisCache_module_1.RedisCacheModule,
            mongoose_1.MongooseModule.forRoot(constant_1.globalConstants.DB_URL),
            mongoose_1.MongooseModule.forFeature([
                { name: users_schema_1.User.name, schema: users_schema_1.UserSchema },
                { name: token_schema_1.Token.name, schema: token_schema_1.TokenSchema },
            ]),
        ],
        controllers: [app_controller_1.AppController, user_controller_1.UserController],
        providers: [app_service_1.AppService, users_service_1.UsersService, exceptions_1.Exceptions],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map