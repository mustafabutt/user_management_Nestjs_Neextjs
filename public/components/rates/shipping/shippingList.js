import {useEffect, useState} from "react";
import {RatesService} from "../../../services/rates.service";
import {List} from "../../general/index";

export const ShippingList = (props) => {

    const [shipping, setShipping] = useState(null);

    useEffect(()=>{
        RatesService().getShippingList().then((innerData)=>{
            
            const obj = {"service":""};
            Object.keys(innerData.data[0].rate[0]).map((element) => {
                obj[`${element}`] = "";
                });
                
                var finalArray=[]
                innerData.data.map((shippingData)=> {
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
                innerData.data=finalArray
            setShipping(innerData)
        })
            
    },[])

    async function ListData(makery){
      
        props.invokeTopParent(makery.trim().split("\t")[0]);
      }
    
    return (
  
        <div>
            
            {
                <List view = {"shipping"} invokeUpper={ListData} data = {shipping} />
            }

        </div>

    )
}


