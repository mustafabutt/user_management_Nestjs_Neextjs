import {
  forwardRef,
  MiddlewareConsumer,
  Module,
  NestModule,
} from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './controllers/user.controller';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './services/users.module';
import { User, UserSchema } from './schemas/users.schema';
import { Fabric, FabricSchema } from './schemas/fabric';
import { Print, PrintSchema } from './schemas/printing';
import { Embroidery, EmbroiderySchema } from './schemas/embroidery';
import { Item, ItemSchema } from './schemas/items';
import { Shipping, ShippingSchema } from './schemas/shipping';
import { Token, TokenSchema } from './schemas/token.schema';
import { UsersService } from './services/users.service';
import { Exceptions } from './exceptions/exceptions';
import { globalConstants } from './constant';
import { UserMiddleware } from './middleware/user.middleware';
import { RedisCacheModule } from './redis-cache/redisCache.module';
import { SendgridService } from './sendgrid/sendgrid.service';
import { MailController } from './mail/mail.controller';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { RatesService } from './rates/rates.service';
import { RatesController } from './rates/rates.controller';
import { ConfigModule } from '@nestjs/config';
import { configuration } from '../config/configuration';


@Module({
  imports: [
    forwardRef(() => AuthModule),
    UsersModule,
    ConfigModule.forRoot({ envFilePath: `${process.cwd()}/config/env/${process.env.NODE_ENV}.env`,
    load: [configuration] }), 
    RedisCacheModule,
    MongooseModule.forRoot(process.env.DB_URL),
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Fabric.name, schema: FabricSchema },
      { name: Shipping.name, schema: ShippingSchema },
      { name: Item.name, schema: ItemSchema },
      { name: Print.name, schema: PrintSchema },
      { name: Embroidery.name, schema: EmbroiderySchema },
      { name: Token.name, schema: TokenSchema },
    ]),
    JwtModule.register({
      secret: "mushi",
      signOptions: { expiresIn: "60s" },
    }),
  ],
  controllers: [AppController, UserController, MailController, RatesController],
  providers: [AppService, UsersService, Exceptions, SendgridService,ConfigService, RatesService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(UserMiddleware).forRoutes(globalConstants.USERS);
  }
}
