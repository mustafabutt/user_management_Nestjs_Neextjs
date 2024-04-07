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
import { Fabric } from '../schemas/fabric';
import { RatesService } from '../rates/rates.service';
import { Exceptions } from '../exceptions/exceptions';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { globalConstants } from '../constant';
import { Item } from 'src/schemas/items';
import { Shipping } from 'src/schemas/shipping';
import { Print } from 'src/schemas/printing';
import { PriceCalculation } from 'src/types/price';
import { PrintingEnum } from 'src/types/printing';
import { EmbroideryEnum } from 'src/types/embroidery';
import { Embroidery } from 'src/schemas/embroidery';

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
      console.log(item);
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
         
        let shippingMode = item.shipping.split("(")[1].split(")")[0]+"Rate";
        let shippingCompany = item.shipping.split("(")[0];
        let profitMargin = item.profit_margin.split("%")[0]
        console.log(shippingCompany + shippingMode);
        let avg, fabricPrice, fabricPriceInGrams, shippinginPerItem, totalPrice, makery, dollarPrice, printingBaseRate, embBaseRate, printRate, embRate;

        const singleMaterial = await this.ratesService.findSingleMaterial(item.fabric);
        const singleItem = await this.ratesService.findSingleItem(item.item);

        const shipping:any = await this.ratesService.findSingleShipping(shippingCompany);

        console.log("shipping per KG "+shipping.rate[0][shippingMode])

        singleItem.fabricAverageAndMakery.filter((obj:any) =>{
          if(obj.fabric == item.fabric){
            avg = obj.quantity;
            makery =  obj.makery
          }
        })

        fabricPriceInGrams = 1000/avg
        fabricPrice = Number(singleMaterial.rate)/fabricPriceInGrams;
        console.log("fabric price is "+fabricPrice);
        
        shippinginPerItem = Number(shipping.rate[0][shippingMode])/fabricPriceInGrams;
        console.log("shipping per item "+shippinginPerItem);

        if(item.decoration.value == "Printing"){
          const singlePrinting = await this.ratesService.findSinglePrinting(item.decoration.type);
          printingBaseRate = singlePrinting.base_rate;
          let size = Number(item.decoration.size.width)*Number(item.decoration.size.height);
          if(size >= 1)
            printRate = size*5+printingBaseRate
            totalPrice = Number(shippinginPerItem)+Number(fabricPrice)+Number(makery)+printRate;
        }
        if(item.decoration.value == "Embroidery"){
          const singleEmb = await this.ratesService.findSingleEmbroidery(item.decoration.type);
          embBaseRate = singleEmb.base_rate;
          let size = Number(item.decoration.size.width)*Number(item.decoration.size.height);
          if(size >= 1)
            embRate = size*5+embBaseRate
          totalPrice = Number(shippinginPerItem)+Number(fabricPrice)+Number(makery)+embRate;
        }



        dollarPrice = Number(profitMargin)/Number(100)*Number(totalPrice)+totalPrice;
        dollarPrice = Math.round(dollarPrice/item.usdRate*100)/100;
        console.log("total price is "+totalPrice);
        console.log("dollar price is "+ dollarPrice);
        return response.status(HttpStatus.OK).json({
          "totalPrice":totalPrice,
          "dollarPrice": "$"+dollarPrice
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
        const singleItem = await this.ratesService.findSingleItem(item.name["item"]);
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


  @Get("/printing")
  async fetchAllPrinting(@Res() response) {
    try {
      const data = await this.ratesService.readAllPrinting();
      return response.status(HttpStatus.OK).json({
        data,
      });
    } catch (err) {
      this.exceptions.generateGeneralException(err);
    }
  }

  @Post("/printing")
  async createPrinting(@Res() response, @Body() printing: Print) {
    try {
      if(!(printing.name in PrintingEnum))
        return response.status(HttpStatus.BAD_GATEWAY).json({
          msg:"please send a valid printing type",
        });
      const check = await this.ratesService.findSinglePrinting(printing.name);
      if (check) this.exceptions.generateUserExistException();
 
      const newPrinting = await this.ratesService.createPrinting(printing);
      return response.status(HttpStatus.CREATED).json({
        newPrinting,
      });
    } catch (err) {
      this.exceptions.generateGeneralException(err);
    }
  }

  @Put('/printing/:entity')
  async updatePrinting(@Res() response, @Param("entity") entity, @Body() printing: Print) {
    try {

      if(printing["action"] == "edit printing"){
        if(!(printing.name in PrintingEnum))
          return response.status(HttpStatus.BAD_GATEWAY).json({
            msg:"please send a valid printing type",
          });
        const singlePrinting = await this.ratesService.findSinglePrinting(printing["previousPrinting"]);
        delete printing["previousPrinting"];
        delete printing["action"];
        const id = singlePrinting["_id"];
        const updatedPrinting = await this.ratesService.updatePrinting(id,printing);
   
        return response.status(HttpStatus.OK).json({
          updatedPrinting,
        });
        
      } else if(printing["action"] == "delete printing"){
   
        const singlePrinting = await this.ratesService.findSinglePrinting(printing.name);
        const id = singlePrinting["_id"];
        const deletedPrinting = await this.ratesService.deletePrinting(id);
        return response.status(HttpStatus.OK).json({
          deletedPrinting,
        });     
        
      }
     
    } catch (err) {
      this.exceptions.generateGeneralException(err);
    }
  }

  @Get("/embroidery")
  async fetchAllEmbroidery(@Res() response) {
    try {
      const data = await this.ratesService.readAllEmbroidery();
      return response.status(HttpStatus.OK).json({
        data,
      });
    } catch (err) {
      this.exceptions.generateGeneralException(err);
    }
  }

  @Post("/embroidery")
  async createEmbroidery(@Res() response, @Body() embroidery: Embroidery) {
    try {
      if(!(embroidery.name in EmbroideryEnum))
        return response.status(HttpStatus.BAD_GATEWAY).json({
          msg:"please send a valid embroidery type",
        });
      const check = await this.ratesService.findSingleEmbroidery(embroidery.name);
      if (check) this.exceptions.generateUserExistException();
 
      const newEmbroidery = await this.ratesService.createEmbroidery(embroidery);
      return response.status(HttpStatus.CREATED).json({
        newEmbroidery,
      });
    } catch (err) {
      this.exceptions.generateGeneralException(err);
    }
  }

  @Put('/embroidery/:entity')
  async updateEmbroidery(@Res() response, @Param("entity") entity, @Body() embroidery: Embroidery) {
    try {

      if(embroidery["action"] == "edit embroidery"){
        if(!(embroidery.name in EmbroideryEnum))
          return response.status(HttpStatus.BAD_GATEWAY).json({
            msg:"please send a valid embroidery type",
          });
        const singleEmbroidery = await this.ratesService.findSingleEmbroidery(embroidery["previousEmbroidery"]);
        delete embroidery["previousEmbroidery"];
        delete embroidery["action"];
        const id = singleEmbroidery["_id"];
        const updatedEmbroidery = await this.ratesService.updateEmbroidery(id,embroidery);
  
        return response.status(HttpStatus.OK).json({
          updatedEmbroidery,
        });
        
      } else if(embroidery["action"] == "delete embroidery"){
        console.log("hell ya")
        const singleEmbroidery= await this.ratesService.findSingleEmbroidery(embroidery.name);
        const id = singleEmbroidery["_id"];
        const deletedPEmbroidery = await this.ratesService.deleteEmbroidery(id);
        return response.status(HttpStatus.OK).json({
          deletedPEmbroidery,
        });     
        
      }
     
    } catch (err) {
      this.exceptions.generateGeneralException(err);
    }
  }

}
