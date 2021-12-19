import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Request } from 'express';
import { globalConstants } from '../constant';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ passReqToCallback: true });
  }
  async validate(request: Request): Promise<any> {
    if (
      request.body.hasOwnProperty(globalConstants.USERNAME) &&
      request.body.hasOwnProperty(globalConstants.PASSWORD)
    ) {
      const user = await this.authService.validateUser(request.body);
      if (!user) {
        throw new UnauthorizedException();
      }
      return user;
    } else throw new UnauthorizedException();
  }
}
