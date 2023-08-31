import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Res,
  UseGuards,
} from '@nestjs/common';
import { User } from '../schemas/users.schema';
import { UsersService } from '../services/users.service';
import { Exceptions } from '../exceptions/exceptions';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { globalConstants } from '../constant';
import * as bcrypt from 'bcrypt';

@UseGuards(JwtAuthGuard)
@Controller(globalConstants.USERS)
export class UserController {
  constructor(
    private readonly userService: UsersService,
    private exceptions: Exceptions,
  ) {}

  @Post()
  async createUser(@Res() response, @Body() user: User) {
    try {
      const check = await this.userService.findbyEmail(user.email);
      if (check) this.exceptions.generateUserExistException();
      const newUser = await this.userService.create(user);
      console.log(newUser)
      return response.status(HttpStatus.CREATED).json({
        newUser,
      });
    } catch (err) {
      this.exceptions.generateGeneralException(err);
    }
  }

  @Get()
  async fetchAll(@Res() response) {
    try {
      const users = await this.userService.readAll();

      return response.status(HttpStatus.OK).json({
        users,
      });
    } catch (err) {
      console.log(err);
      this.exceptions.generateGeneralException(err);
    }
  }

  @Get('/:' + globalConstants.ID)
  async findById(@Res() response, @Param(globalConstants.ID) id) {
    try {
      const user = await this.userService.readById(id);
      return response.status(HttpStatus.OK).json({
        user,
      });
    } catch (err) {
      this.exceptions.generateGeneralException(err);
    }
  }

  @Put('/:email')
  async update(@Res() response, @Param("email") email, @Body() user: User) {
    try {

      const currentUser = await this.userService.findbyEmail(email);
      const id = currentUser["_id"];
      const saltOrRounds = 10;
      const hash = await bcrypt.hash(user.password, saltOrRounds);
      currentUser.password = hash;
 
      const updatedUser = await this.userService.update(id, currentUser);
      return response.status(HttpStatus.OK).json({
        updatedUser,
      });
    } catch (err) {
      console.log(err);
      this.exceptions.generateGeneralException(err);
    }
  }

  @Delete('/:' + globalConstants.ID)
  async delete(@Res() response, @Param(globalConstants.ID) id) {
    try {
      const deletedUser = await this.userService.delete(id);
      return response.status(HttpStatus.OK).json({
        deletedUser,
      });
    } catch (err) {
      this.exceptions.generateGeneralException(err);
    }
  }
}
