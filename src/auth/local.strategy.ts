import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Request } from 'express';
import { globalConstants } from '../constant';
import { UsersService } from '../services/users.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService,   private readonly userService: UsersService) {
    super({
       passReqToCallback: true,
       usernameField: globalConstants.EMAIL,
       passwordField: globalConstants.PASSWORD
       });

       (async () => {
        if(!await this.userService.findbyEmail(globalConstants.TEST_EMAIL)){
          await this.userService.create({
            email: globalConstants.TEST_EMAIL,
            password: globalConstants.TEST_PASSWORD,
            gender: globalConstants.TEST_GENDER,
            role:"admin",
            createdBy: globalConstants.TEST_EMAIL
          });
        
        }
      })();
     
  }
  async validate(request: Request): Promise<any> {
    if (
      request.body.hasOwnProperty(globalConstants.EMAIL) &&
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
