import {useEffect, useState} from "react";
import {List} from "../../general/index";
import { FabricListData } from "@/utils/fabricUtils";

export const FabricList = (props) => {

    const [fabric, setFabric] = useState(null);

    useEffect(()=>{
        
        (async function(){
            setFabric(await FabricListData());
          }
        )()
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


