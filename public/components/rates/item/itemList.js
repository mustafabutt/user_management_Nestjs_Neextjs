import {useEffect, useState} from "react";
import {RatesService} from "../../../services/rates.service";
import {List} from "../../general/index";

export const ItemList = (props) => {

    const [item, setItem] = useState(null);

    useEffect(()=>{
   
        RatesService().getItemList().then((data)=>{
            RatesService().getFabricList().then((fabricData)=>{
                let tempArray = [];
                fabricData.data.map((keyName)=> {
                    let fabricName = keyName.material;
                    tempArray.push(fabricName);
                })

                const obj = {"item":""};
                tempArray.forEach((element) => {
                    obj[`${element}`] = "";
                    });
                    
                var finalArray=[]
                data.data.map((itemData)=> {
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
                data.data=finalArray
                setItem(data);
            })
        })

    },[])

    async function ListData(item){
      
        props.invokeTopParent(item.trim().split("\t")[0]);
      }
    
    return (
  
        <div>
            
            {
                <List view = {"vieItem"} invokeUpper={ListData} data = {item} />
            }

        </div>

    )
}


