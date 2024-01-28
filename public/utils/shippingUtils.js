
import {RatesService} from "@/services/rates.service";

export async function ShippingListData(token) {
  console.log(token)
  var result = await RatesService().getShippingList(token);
  let obj = {"service":""};
  Object.keys(result.data[0].rate[0]).map((element) => {
      obj[`${element}`] = "";
      });
      var finalArray=[]
      result.data.map((shippingData)=> {
          var tempObj = Object.assign({}, obj);
          shippingData.rate.map((rate)=> {
        
            Object.keys(obj).map((tempkeyName, i)=> {
              obj.service =shippingData.service;
              obj[tempkeyName] = rate[tempkeyName];
            })     
          })
          const new_obj = Object.assign({}, obj);
          finalArray.push(new_obj);
          obj = tempObj        
      })
  result.data=finalArray
  return result;
}

