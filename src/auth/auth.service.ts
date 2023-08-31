import { Injectable } from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { JwtService } from '@nestjs/jwt';
import { RedisCacheService } from '../redis-cache/redis-cache.service';
import { Exceptions } from '../exceptions/exceptions';
import * as bcrypt from 'bcrypt';

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
    let isMatch;
    const user = await this.usersService.findbyEmail(obj.email);
    if(JSON.parse(await this.Redis.get("info")) != null)
      if(JSON.parse(await this.Redis.get("info")).email == obj.email && JSON.parse(await this.Redis.get("info")).code == obj.password)
      obj.password = user.password;
    
      if(user && JSON.parse(await this.Redis.get("info")) == null)
        isMatch = await bcrypt.compare(obj.password, user.password);
        else isMatch = true;
    if (user && isMatch) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
  
    const payload = { email: user._doc.email, sub: user._doc.userId };
    const token = this.jwtService.sign(payload);
    user._doc.access_token = token
    delete user._doc.password;
    return user._doc;
  }
  async signup(user: any) {
    try {
      const check = await this.usersService.findbyEmail(user.email);
      if (check) this.exceptions.generateUserExistException();
      
      const saltOrRounds = 10;
      const hash = await bcrypt.hash(user.password, saltOrRounds);
    
      user.password = hash;
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
