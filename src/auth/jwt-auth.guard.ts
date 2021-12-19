import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { globalConstants } from '../constant';

@Injectable()
export class JwtAuthGuard extends AuthGuard(
  globalConstants.AUTH_GUARD_JWT_TYPE,
) {}
