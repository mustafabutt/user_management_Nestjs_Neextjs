import { Injectable, NestMiddleware, UseGuards } from '@nestjs/common';
import { Exceptions } from '../exceptions/exceptions';
import { globalConstants } from '../constant';

@Injectable()
export class UserMiddleware implements NestMiddleware {

  constructor(private exceptions: Exceptions) {
  }
  use(req: any, res: any, next: () => void) {
    if (req.method === globalConstants.POST) {
      if (
        req.body.hasOwnProperty(globalConstants.EMAIL) &&
        req.body.hasOwnProperty(globalConstants.PASSWORD)
      )
        next();
      else this.exceptions.generateBadRequestException();
    } else if (req.method === globalConstants.PUT) {
      if (
        req.body.hasOwnProperty(globalConstants.EMAIL) &&
        req.body.hasOwnProperty(globalConstants.PASSWORD) &&
        req.body.hasOwnProperty(globalConstants.ID)
      )
        next();
      else this.exceptions.generateBadRequestException();
    } else if (req.method === globalConstants.DELETE) {
      if (req.body.hasOwnProperty(globalConstants.ID)) next();
      else this.exceptions.generateBadRequestException();
    } else next();
  }
}
