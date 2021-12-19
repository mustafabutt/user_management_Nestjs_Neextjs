import {
  Controller,
  Get,
  Request,
  Post,
  UseGuards,
  Put,
  Headers, HttpStatus, Res,
} from '@nestjs/common';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { AuthService } from './auth/auth.service';
import { globalConstants } from './constant';

@Controller()
export class AppController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post(globalConstants.LOGIN)
  async login(@Request() req) {
    return this.authService.login(req.user);
  }
  @Post(globalConstants.LOGOUT)
  async logout(@Request() req, @Headers() headers) {
    return this.authService.logout(
      headers.authorization.split(globalConstants.SPACE)[1],
    );
  }
  @Post(globalConstants.SIGN_UP)
  async signup(@Res() response, @Request() req) {
    try {
      const resp = await this.authService.signup(req.body);
      return response.status(HttpStatus.CREATED).json({
        resp,
      });
    } catch (err) {
      if (err.response.error.response.error == 'User already exists') {
        return response.status(HttpStatus.SEE_OTHER).json({
          msg: err.response.error.response,
        });
      }
    }
  }
}
