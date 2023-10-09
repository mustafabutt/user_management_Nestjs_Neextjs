import {useEffect, useState} from "react";
import {RatesService} from "../../../services/rates.service";
import {List} from "../../general/index";

export const FabricList = (props) => {

    const [fabric, setFabric] = useState(null);

    useEffect(()=>{
        
        RatesService().getLocalFabricList().then((data)=>{
            
            if(!data){
                RatesService().getFabricList().then((innerData)=>{
                    setFabric(innerData)
                })
            }else  setFabric(data);
           
        });
    },[])

    async function ListData(fabric){
      
        props.invokeTopParent(fabric.trim().split("\t")[0]);
      }
    
    return (
  
        <div>
            
            {
                <List view = {"fabric"} invokeUpper={ListData} data = {fabric} />
            }

        </div>

    )
}


