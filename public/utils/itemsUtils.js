import {RatesService} from "@/services/rates.service";

export async function ItemsListData() {
  let finalData, listData, fabricList;
  listData = await RatesService().getItemList();
  fabricList = await RatesService().getFabricList();

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
      var tempObj = Object.assign({}, obj);
      itemData.fabricAverage.map((innerAvgkeyName)=> {
    
          Object.keys(obj).map((tempkeyName, i)=> {
              if(tempkeyName == innerAvgkeyName.fabric){
                  obj.item =itemData.name;
                  obj[tempkeyName] = innerAvgkeyName.quantity;
              }   
          })
      })
      const new_obj = Object.assign({}, obj);
      finalArray.push(new_obj);

      obj = tempObj 
  })
  listData.data=finalArray
  finalData = listData
  return finalData;
}

