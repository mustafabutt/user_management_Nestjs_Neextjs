import { HttpStatus, Injectable } from '@nestjs/common';
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
  ) {}

  async validateUser(obj): Promise<any> {
    const user = await this.usersService.findbyName(obj.username);
    if (user && obj.password === user.password) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user._doc.username, sub: user._doc.userId };
    const token = this.jwtService.sign(payload);
    await this.Redis.set(user._doc.username, token);
    return {
      access_token: token,
    };
  }
  async signup(user: any) {
    try {
      const check = await this.usersService.findbyName(user.username);
      if (check) this.exceptions.generateUserExistException();
      return await this.usersService.create(user);
    } catch (err) {
      this.exceptions.generateGeneralException(err);
    }
  }
  async logout(token) {
    try {
      const decoded = this.jwtService.decode(token);
      await this.Redis.del(decoded[globalConstants.TOKEN_USERNAME]);
      return await this.usersService.logout(token);
    } catch (err) {
      this.exceptions.generateGeneralException(err);
    }
  }
}
