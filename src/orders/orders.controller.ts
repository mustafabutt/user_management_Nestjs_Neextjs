
import { OrdersService } from './orders.service';
import { Exceptions } from 'src/exceptions/exceptions';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Order } from '../schemas/orders';
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
@Controller('orders')
export class OrdersController {
    constructor(
        private readonly ordersService: OrdersService,
        private exceptions: Exceptions,
      ) {}

      @Post("/")
      async createOrder(@Res() response, @Body() order: Order) {
        try {

            let orderDetailsValid = await this.ordersService.checkOrderItems(order.details);
            let customerValid= await this.ordersService.checkOrderCustomerID(order.customer_email);

            if(orderDetailsValid.includes(false) || customerValid == null)
                return response.status(HttpStatus.BAD_GATEWAY).JSON({msg:"bad request"});
            const newOrder = await this.ordersService.createOrder(order);
            return response.status(HttpStatus.CREATED).json({
                newOrder,
            });

        } catch (err) {
          this.exceptions.generateGeneralException(err);
        }
      }

      @Get("/")
      async fetchAllOrder(@Res() response) {
        try {
          const data = await this.ordersService.readAllOrders();
    
          return response.status(HttpStatus.OK).json({
            data,
          });
        } catch (err) {
          this.exceptions.generateGeneralException(err);
        }
      }

      @Put('/')
      async updateOrder(@Res() response, @Body() order: Order) {
        try {
          if(order["action"] == "edit order"){
       
            const updatedOrder = await this.ordersService.updateOrder(order["_id"],order);
            return response.status(HttpStatus.OK).json({
                updatedOrder,
            });
            
          } else if(order["action"] == "delete order"){
            const deletedOrder = await this.ordersService.deleteOrder(order["_id"]);
            return response.status(HttpStatus.OK).json({
                deletedOrder,
            });   
          }
         
        } catch (err) {
          this.exceptions.generateGeneralException(err);
        }
      }
}


