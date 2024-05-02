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
const fabric_1 = require("./schemas/fabric");
const printing_1 = require("./schemas/printing");
const embroidery_1 = require("./schemas/embroidery");
const clients_1 = require("./schemas/clients");
const items_1 = require("./schemas/items");
const orders_1 = require("./schemas/orders");
const shipping_1 = require("./schemas/shipping");
const token_schema_1 = require("./schemas/token.schema");
const users_service_1 = require("./services/users.service");
const exceptions_1 = require("./exceptions/exceptions");
const constant_1 = require("./constant");
const user_middleware_1 = require("./middleware/user.middleware");
const redisCache_module_1 = require("./redis-cache/redisCache.module");
const sendgrid_service_1 = require("./sendgrid/sendgrid.service");
const mail_controller_1 = require("./mail/mail.controller");
const config_1 = require("@nestjs/config");
const jwt_1 = require("@nestjs/jwt");
const rates_service_1 = require("./rates/rates.service");
const rates_controller_1 = require("./rates/rates.controller");
const config_2 = require("@nestjs/config");
const configuration_1 = require("../config/configuration");
const client_controller_1 = require("./client/client.controller");
const client_service_1 = require("./client/client.service");
const orders_controller_1 = require("./orders/orders.controller");
const orders_service_1 = require("./orders/orders.service");
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
            config_2.ConfigModule.forRoot({ envFilePath: `${process.cwd()}/config/env/${process.env.NODE_ENV}.env`,
                load: [configuration_1.configuration] }),
            redisCache_module_1.RedisCacheModule,
            mongoose_1.MongooseModule.forRoot(process.env.DB_URL),
            mongoose_1.MongooseModule.forFeature([
                { name: users_schema_1.User.name, schema: users_schema_1.UserSchema },
                { name: fabric_1.Fabric.name, schema: fabric_1.FabricSchema },
                { name: shipping_1.Shipping.name, schema: shipping_1.ShippingSchema },
                { name: items_1.Item.name, schema: items_1.ItemSchema },
                { name: printing_1.Print.name, schema: printing_1.PrintSchema },
                { name: embroidery_1.Embroidery.name, schema: embroidery_1.EmbroiderySchema },
                { name: clients_1.Client.name, schema: clients_1.ClientSchema },
                { name: orders_1.Order.name, schema: orders_1.OrderSchema },
                { name: token_schema_1.Token.name, schema: token_schema_1.TokenSchema },
            ]),
            jwt_1.JwtModule.register({
                secret: "mushi",
                signOptions: { expiresIn: "60s" },
            }),
        ],
        controllers: [app_controller_1.AppController, user_controller_1.UserController, mail_controller_1.MailController, rates_controller_1.RatesController, client_controller_1.ClientController, orders_controller_1.OrdersController],
        providers: [app_service_1.AppService, users_service_1.UsersService, exceptions_1.Exceptions, sendgrid_service_1.SendgridService, config_1.ConfigService, rates_service_1.RatesService, client_service_1.ClientService, orders_service_1.OrdersService],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map