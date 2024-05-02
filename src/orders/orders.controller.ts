
import { OrdersService } from './orders.service';
import { Exceptions } from 'src/exceptions/exceptions';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Order } from '../schemas/orders';
import { Request } from 'express';
import {
    Body,
    Controller,
    Get,
    HttpStatus,
    Req,
    Post,
    Put,
    Res,
    UseGuards,
    Query,
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
            let a = await this.ordersService.generateInvoice(order);
            return response.status(HttpStatus.CREATED).json({
              newOrder,
          });

        } catch (err) {
          this.exceptions.generateGeneralException(err);
        }
      }
      @Post("/invoice/")
      async createInvoice(@Res() response, @Body() order: Order) {
        try {
            let data = await this.ordersService.generateInvoice(order);
            console.log("all done");
            console.log(data)
            return response.status(HttpStatus.CREATED).json({
              data,
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
      @Post("/invoices/")
      async fetchAllInvoices(@Res() response, @Body() obj: any) {
        try {
          const data = await this.ordersService.readAllInvoices(obj.email);
          
          return response.status(HttpStatus.OK).json({
            data,
          });
        } catch (err) {
          this.exceptions.generateGeneralException(err);
        }
      }

      @Post("/invoice/delete/")
      async deletenvoice(@Res() response, @Body() obj: any) {
        try {
          const data = await this.ordersService.removeInvoice(obj);
          return response.status(HttpStatus.OK).json({
            data,
          });
        } catch (err) {
          this.exceptions.generateGeneralException(err);
        }
      }


      @Post("/invoice/download/:file")
      async downloadInvoices(@Query('file') file: string, @Query('email') email: string, @Req() request: Request, @Res() response, @Body() obj: any) {
        try {
          console.log(file)
          response.download(
            "./invoices/"+email+"/"+file, 
            (err) => {
              if (err) {
                response.send({
                      error : err,
                      msg   : "Problem downloading the file"
                  })
              }
        });
        } catch (err) {
          this.exceptions.generateGeneralException(err);
        }
      }

      @Put('/')
      async updateOrder(@Res() response, @Body() order: Order) {
        try {
          if(order["action"] == "edit order"){
            if(!order.shipping || !order.customer_email || !order.delivery_date){
              const singleOrder = await this.ordersService.findSingleOrder(order["_id"]);
              order.shipping = singleOrder.shipping;
              order.customer_email = singleOrder.customer_email;
              order.delivery_date = singleOrder.delivery_date
            }
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


