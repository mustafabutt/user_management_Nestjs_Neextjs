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
import { Fabric } from '../schemas/fabric';
import { RatesService } from '../rates/rates.service';
import { Exceptions } from '../exceptions/exceptions';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { globalConstants } from '../constant';
import { Makery } from 'src/schemas/makery';
import { Item } from 'src/schemas/items';
import { Shipping } from 'src/schemas/shipping';
import { PriceCalculation } from 'src/types/price';

@UseGuards(JwtAuthGuard)
@Controller(globalConstants.RATES)
export class RatesController {
  constructor(
    private readonly ratesService: RatesService,
    private exceptions: Exceptions,
  ) {}

  @Post("/fabric")
  async createFabric(@Res() response, @Body() fabric: Fabric) {
    try {
      const check = await this.ratesService.findSingleMaterial(fabric.material);
      if (check) this.exceptions.generateUserExistException();
      const newFabric = await this.ratesService.createFabric(fabric);
      return response.status(HttpStatus.CREATED).json({
        newFabric,
      });
    } catch (err) {
      this.exceptions.generateGeneralException(err);
    }
  }

  @Get("/fabric")
  async fetchAllFabric(@Res() response) {
    try {
      const data = await this.ratesService.readAllFabric();

      return response.status(HttpStatus.OK).json({
        data,
      });
    } catch (err) {
      this.exceptions.generateGeneralException(err);
    }
  }

  @Get('/fabric":' + globalConstants.ID)
  async findById(@Res() response, @Param(globalConstants.ID) id) {
    try {
      
    } catch (err) {
      this.exceptions.generateGeneralException(err);
    }
  }

  @Put('/fabric/:entity')
  async updateFabric(@Res() response, @Param("entity") entity, @Body() fabric: Fabric) {
    try {
      if(fabric["action"] == "edit fabric"){
   
        const singleMaterial = await this.ratesService.findSingleMaterial(fabric["previousMaterial"]);
        delete fabric["previousMaterial"];
        const id = singleMaterial["_id"];

        const updatedFabric = await this.ratesService.updateFabric(id,fabric);
        return response.status(HttpStatus.OK).json({
          updatedFabric,
        });
        
      } else if(fabric["action"] == "delete fabric"){
   
        console.log(fabric)
        const singleMaterial = await this.ratesService.findSingleMaterial(fabric.material);
        const id = singleMaterial["_id"];
        const deletedFabric = await this.ratesService.deleteFabric(id);
        return response.status(HttpStatus.OK).json({
          deletedFabric,
        });   
      }
     
    } catch (err) {
      this.exceptions.generateGeneralException(err);
    }
  }

  @Post("/makery")
  async createMakery(@Res() response, @Body() makery: Makery) {
    try {
      const check = await this.ratesService.findSingleMaterial(makery.item);
      if (check) this.exceptions.generateUserExistException();
      const newMakery = await this.ratesService.createMakery(makery);
      return response.status(HttpStatus.CREATED).json({
        newMakery,
      });
    } catch (err) {
      this.exceptions.generateGeneralException(err);
    }
  }
  @Get("/makery")
  async fetchAllMakery(@Res() response) {
    try {
      const data = await this.ratesService.readAllMakery();

      return response.status(HttpStatus.OK).json({
        data,
      });
    } catch (err) {
      this.exceptions.generateGeneralException(err);
    }
  }

  @Put('/makery/:entity')
  async updateMakery(@Res() response, @Param("entity") entity, @Body() makery: Makery) {
    try {
      if(makery["action"] == "edit makery"){
   
        const singleMakery = await this.ratesService.findSingleMakery(makery["previousItem"]);
        delete makery["previousItem"];
        delete makery["action"];
        const id = singleMakery["_id"];

        const updatedMakery = await this.ratesService.updateMakery(id,makery);
   
        return response.status(HttpStatus.OK).json({
          updatedMakery,
        });
        
      } else if(makery["action"] == "delete makery"){
 
        const singleMaterial = await this.ratesService.findSingleMakery(makery.item);
        const id = singleMaterial["_id"];
        const deletedMakery = await this.ratesService.deleteMakery(id);
        return response.status(HttpStatus.OK).json({
          deletedMakery,
        });   
        
      }
     
    } catch (err) {
      this.exceptions.generateGeneralException(err);
    }
  }

  @Get("/item")
  async fetchAllItems(@Res() response) {
    try {
      const data = await this.ratesService.readAllItems();

      return response.status(HttpStatus.OK).json({
        data,
      });
    } catch (err) {
      this.exceptions.generateGeneralException(err);
    }
  }
  @Post("/item")
  async createItem(@Res() response, @Body() item: Item) {
    try {
    
      const check = await this.ratesService.findSingleItem(item.name);
      if (check) this.exceptions.generateUserExistException();
  
      const newItem = await this.ratesService.createItem(item);

      return response.status(HttpStatus.CREATED).json({
        newItem,
      });
    } catch (err) {
      this.exceptions.generateGeneralException(err);
    }
  }
  @Post('/item/calculate')
  async calculateItemPrice(@Res() response, @Body() item: PriceCalculation) {
    try {
        console.log(item)
      
        let shippingMode = item.shippingValue.split("(")[1].split(")")[0]+"Rate";
        let shippingCompany = item.shippingValue.split("(")[0];

        console.log(shippingCompany + shippingMode);
        let avg, fabricPrice, fabricPriceInGrams, shippinginPerItem, totalPrice;

        const singleMaterial = await this.ratesService.findSingleMaterial(item.fabricValue);
        const singleAvg = await this.ratesService.findSingleItem(item.itemValue);
        const shipping:any = await this.ratesService.findSingleShipping(shippingCompany);
        const makery:any = await this.ratesService.findSingleMakery(item.itemValue);

        console.log("shipping per KG "+shipping.rate[0][shippingMode])

        singleAvg.fabricAverage.filter((obj:any) =>{
          if(obj.fabric == item.fabricValue)
            avg = obj.quantity    
        })
        
        fabricPriceInGrams = 1000/avg
        fabricPrice = Number(singleMaterial.rate)/fabricPriceInGrams;
        console.log("fabric price is "+fabricPrice);
        
        shippinginPerItem = Number(shipping.rate[0][shippingMode])/fabricPriceInGrams;
        console.log("shipping per item "+shippinginPerItem);
        totalPrice = shippinginPerItem+fabricPrice+makery.rate
        console.log("total price is "+totalPrice);
        return response.status(HttpStatus.OK).json({
          "totalPrice":totalPrice
        });  
    } catch (err) {
      this.exceptions.generateGeneralException(err);
    }
  }

  @Put('/item/:entity')
  async updateItem(@Res() response, @Param("entity") entity, @Body() item: Item) {
    try {
      if(item["action"] == "edit item"){
   
        const singleItem = await this.ratesService.findSingleItem(item["previousItem"]);
        delete item["previousItem"];
        delete item["action"];
        const id = singleItem["_id"];
        const updatedItem = await this.ratesService.updateItem(id,item);
   
        return response.status(HttpStatus.OK).json({
          updatedItem,
        });
        
      } else if(item["action"] == "delete item"){
   
        const singleItem = await this.ratesService.findSingleItem(item.name);
        const id = singleItem["_id"];
        const deletedItem = await this.ratesService.deleteItem(id);
        return response.status(HttpStatus.OK).json({
          deletedItem,
        });     
        
      }
     
    } catch (err) {
      this.exceptions.generateGeneralException(err);
    }
  }



  @Get("/shipping")
  async fetchAllShipping(@Res() response) {
    try {
      const data = await this.ratesService.readAllShipping();
      return response.status(HttpStatus.OK).json({
        data,
      });
    } catch (err) {
      this.exceptions.generateGeneralException(err);
    }
  }
  @Post("/shipping")
  async createShipping(@Res() response, @Body() shipping: Shipping) {
    try {
      const check = await this.ratesService.findSingleShipping(shipping.service);
      if (check) this.exceptions.generateUserExistException();
 
      const newShipping = await this.ratesService.createShipping(shipping);
      return response.status(HttpStatus.CREATED).json({
        newShipping,
      });
    } catch (err) {
      this.exceptions.generateGeneralException(err);
    }
  }
  @Put('/shipping/:entity')
  async updateShipping(@Res() response, @Param("entity") entity, @Body() shipping: Shipping) {
    try {
     
      if(shipping["action"] == "edit shipping"){
  
        const singleShipping = await this.ratesService.findSingleShipping(shipping["previousService"]);
        delete shipping["previousService"];
        delete shipping["action"];
        const id = singleShipping["_id"];
    

        const updatedShipping = await this.ratesService.updateShipping(id,shipping);
   
        return response.status(HttpStatus.OK).json({
          updatedShipping,
        });
        
      } else if(shipping["action"] == "delete shipping"){
   
        const singleShipping = await this.ratesService.findSingleShipping(shipping.service);
        const id = singleShipping["_id"];
        const deletedShipping = await this.ratesService.deleteShipping(id);
        return response.status(HttpStatus.OK).json({
          deletedShipping,
        });     
        
      }
     
    } catch (err) {
      this.exceptions.generateGeneralException(err);
    }
  }

}
