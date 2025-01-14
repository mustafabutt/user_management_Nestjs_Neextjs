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
  UploadedFile,
  UseGuards,
  UseInterceptors,
  StreamableFile,
  Headers
} from '@nestjs/common';
import { User } from '../schemas/users.schema';
import { UsersService } from '../services/users.service';
import { Exceptions } from '../exceptions/exceptions';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { globalConstants } from '../constant';
import * as bcrypt from 'bcrypt';
import { FileInterceptor } from '@nestjs/platform-express';
import { createReadStream,existsSync } from 'fs';
import type { Response } from 'express';

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
      const data = await this.userService.readAll();

      return response.status(HttpStatus.OK).json({
        data,
      });
    } catch (err) {
      this.exceptions.generateGeneralException(err);
    }
  }
  @Get('/avatar')
  async getFile(@Headers() Header, @Res({ passthrough: true }) res: Response) {
    try{
      let path =null;
      if(existsSync('./metaData/'+Header.email+'.jpg'))
        path = './metaData/'+Header.email+'.jpg';
      else path = './metaData/default.jpg'
      const file = await createReadStream(path,{
        autoClose: true,
        start: 0
    });
      return new StreamableFile(file);
    }catch(err){
      console.log(err)
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



  @Put('/avatar/')
  @UseInterceptors(FileInterceptor('file'))
  async updateAvatar(@Res() response, @UploadedFile() file, @Body() body) {
    try {   
      await this.userService.saveAvatar(file,body.email);
      return response.status(HttpStatus.CREATED).json({
        msg:"created"
      });
    } catch (err) {
      this.exceptions.generateGeneralException(err);
    }
  }

  @Put('/:email')
  async update(@Res() response, @Param("email") email, @Body() user: User) {
    try {
      if(user["action"] == "edit user"){
   
        const currentUser = await this.userService.findbyEmail(user["previousEmail"]);
        delete user["previousEmail"];
        const id = currentUser["_id"];
        const updatedUser = await this.userService.update(id, user);
        return response.status(HttpStatus.OK).json({
          updatedUser,
        });
        
      }else if(user["action"] == "change password"){
        const currentUser = await this.userService.findbyEmail(email);
        const id = currentUser["_id"];
        const saltOrRounds = 10;
        const hash = await bcrypt.hash(user.password, saltOrRounds);
        currentUser.password = hash;
   
        const updatedUser = await this.userService.update(id, currentUser);
        return response.status(HttpStatus.OK).json({
          updatedUser,
        });
      }else if(user["action"] == "delete user"){
   
        const currentUser = await this.userService.findbyEmail(email);
        const id = currentUser["_id"];
        const deletedUser = await this.userService.delete(id);
        return response.status(HttpStatus.OK).json({
          deletedUser,
        });
        
      }   
     
    } catch (err) {
      this.exceptions.generateGeneralException(err);
    }
  }

  @Delete('/:email' )
  async delete(@Res() response, @Param("email") email) {
    try {
 
      const currentUser = await this.userService.findbyEmail(email);
      const id = currentUser["_id"];
      const deletedUser = await this.userService.delete(id);
      return response.status(HttpStatus.OK).json({
        deletedUser,
      });
    } catch (err) {
      this.exceptions.generateGeneralException(err);
    }
  }
}
