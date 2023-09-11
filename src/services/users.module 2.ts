import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { User, UserSchema } from '../schemas/users.schema';
import { Token, TokenSchema } from '../schemas/token.schema';
import { MongooseModule } from '@nestjs/mongoose';
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Token.name, schema: TokenSchema },
    ]),
  ],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
