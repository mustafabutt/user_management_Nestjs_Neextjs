import { ClientService } from './client.service';
import { Exceptions } from 'src/exceptions/exceptions';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Client } from '../schemas/clients';
import {
    Body,
    Controller,
    Get,
    HttpStatus,
    Param,
    Post,
    Put,
    Res,
    UseGuards,
  } from '@nestjs/common';
@UseGuards(JwtAuthGuard)
@Controller('clients')
export class ClientController {
    constructor(
        private readonly clientService: ClientService,
        private exceptions: Exceptions,
      ) {}

      @Post("/")
      async createClient(@Res() response, @Body() client: Client) {
        try {
     
          const newClient = await this.clientService.createClient(client);
          return response.status(HttpStatus.CREATED).json({
            newClient,
          });
        } catch (err) {
          this.exceptions.generateGeneralException(err);
        }
      }

      @Get("/")
      async fetchAllClient(@Res() response) {
        try {
          const data = await this.clientService.readAllClients();
    
          return response.status(HttpStatus.OK).json({
            data,
          });
        } catch (err) {
          this.exceptions.generateGeneralException(err);
        }
      }

      @Put('/')
      async updateClient(@Res() response, @Body() client: Client) {
        try {
          if(client["action"] == "edit client"){
      
            delete client["action"];
            let singleClient = await this.clientService.findSingleClient(client["previousEmail"]);
            delete client["previousEmail"];
            let id = singleClient["_id"];

            const updatedClient = await this.clientService.updateClient(id,client);
            return response.status(HttpStatus.OK).json({
                updatedClient,
            });
            
          } else if(client["action"] == "delete client"){
      
            const singleClient = await this.clientService.findSingleClient(client.email);
            const id = singleClient["_id"];
            const deletedClient = await this.clientService.deleteCleint(id);
            return response.status(HttpStatus.OK).json({
                deletedClient,
            });   
          }
         
        } catch (err) {
          this.exceptions.generateGeneralException(err);
        }
      }
}
