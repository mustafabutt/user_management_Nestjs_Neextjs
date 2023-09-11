import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';
import { JwtStrategy } from './jwt.strategy';
import { UsersModule } from '../services/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { globalConstants } from '../constant';
import { RedisCacheModule } from '../redis-cache/redisCache.module';
import { Exceptions } from '../exceptions/exceptions';
@Module({
  imports: [
    UsersModule,
    PassportModule,
    RedisCacheModule,
    JwtModule.register({
      secret: globalConstants.SECRET,
      signOptions: { expiresIn: globalConstants.TOKEN_EXP_TIME },
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy, Exceptions],
  exports: [AuthService],
})
export class AuthModule {}
