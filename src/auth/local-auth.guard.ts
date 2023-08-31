import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { globalConstants } from '../constant';

@Injectable()
export class LocalAuthGuard extends AuthGuard(
  globalConstants.AUTH_GUARD_LOCAL_TYPE,
) {
  
}
