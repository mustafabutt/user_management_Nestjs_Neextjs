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

@Module({
  imports: [
    forwardRef(() => AuthModule),
    UsersModule,
    RedisCacheModule,
    MongooseModule.forRoot(globalConstants.DB_URL),
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Token.name, schema: TokenSchema },
    ]),
    JwtModule.register({
      secret: "mushi",
      signOptions: { expiresIn: "60s" },
    }),
  ],
  controllers: [AppController, UserController, MailController],
  providers: [AppService, UsersService, Exceptions, SendgridService,ConfigService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(UserMiddleware).forRoutes(globalConstants.USERS);
  }
}
