import { Injectable } from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { JwtService } from '@nestjs/jwt';
import { RedisCacheService } from '../redis-cache/redis-cache.service';
import { Exceptions } from '../exceptions/exceptions';
import { globalConstants } from '../constant';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private exceptions: Exceptions,
    private Redis: RedisCacheService,
  ) {
  }

  async validateUser(obj): Promise<any> {
    const user = await this.usersService.findbyEmail(obj.email);
    if(JSON.parse(await this.Redis.get("info")) != null)
      if(JSON.parse(await this.Redis.get("info")).email == obj.email && JSON.parse(await this.Redis.get("info")).code == obj.password)
        obj.password = user.password;
    
    if (user && obj.password === user.password) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
  
    const payload = { email: user._doc.email, sub: user._doc.userId };
    const token = this.jwtService.sign(payload);
  
    return {
      access_token: token,
    };
  }
  async signup(user: any) {
    try {
      const check = await this.usersService.findbyEmail(user.email);
      if (check) this.exceptions.generateUserExistException();
      return await this.usersService.create(user);
    } catch (err) {
      this.exceptions.generateGeneralException(err);
    }
  }
  async logout(token) {
    try {
      return await this.usersService.logout(token);
    } catch (err) {
      this.exceptions.generateGeneralException(err);
    }
  }
}
