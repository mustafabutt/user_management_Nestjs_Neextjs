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
      const check = await this.userService.findbyName(user.username);
      if (check) this.exceptions.generateUserExistException();
      const newUser = await this.userService.create(user);
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

  @Put('/:' + globalConstants.ID)
  async update(@Res() response, @Param(globalConstants.ID) id, @Body() user: User) {
    try {
      const updatedUser = await this.userService.update(id, user);
      return response.status(HttpStatus.OK).json({
        updatedUser,
      });
    } catch (err) {
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
