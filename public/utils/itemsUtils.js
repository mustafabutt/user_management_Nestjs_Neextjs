import {RatesService} from "@/services/rates.service";

export async function ItemsListData() {

  let finalData, listData, fabricList;
  listData = await RatesService().getItemList();
  fabricList = await RatesService().getFabricList();
  
  if(listData.status == 409 || fabricList.status == 409)
    return null;
  let tempArray = [];
  fabricList.data.map((keyName)=> {
      let fabricName = keyName.material;
      tempArray.push(fabricName);
  })

  let obj = {"item":""};
  tempArray.forEach((element) => {
      obj[`${element}`] = "";
      });
      
  var finalArray=[]
  
  listData.data.map((itemData)=> {
        var tempObj = {item:"",details:[]}
        itemData.fabricAverageAndMakery.map((innerAvgkeyName)=> {
        tempObj.item =itemData.name;
        tempObj.production_time =itemData.production_time;
        tempObj.profit_margin =itemData.profit_margin;
        let innerTemp ={}

        innerTemp["Avg. in "+innerAvgkeyName.fabric] = innerAvgkeyName.quantity;
        innerTemp["makery"] = innerAvgkeyName.makery;
        tempObj.details.push(innerTemp)
      })
      const new_obj = Object.assign({}, tempObj);
      finalArray.push(new_obj);
  })
  listData.data=finalArray
  finalData = listData
  
  finalData.fabricNames=tempArray
  finalData.data= finalArray
//   finalData.data=[{"item":"hoodie",details:[{"Avg. in satin":"300g","makery":"500"},{"Avg. in fleece":"400g","makery":"450"}, {"Avg. in terry":"300g","makery":"300"}, {"Avg. in jersey":"300g","makery":"330"}]},{"item":"socks",details:[{"Avg. in satin":"300g","makery":"250"},{"Avg. in fleece":"300g","makery":"240"}, {"Avg. in terry":"300g","makery":"290"}, {"Avg. in jersey":"300g","makery":"120"}]}]
  return finalData;
}

