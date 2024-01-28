import {useEffect, useState} from "react";

import {List} from "../../general/index";
import { ItemsListData } from "@/utils/itemsUtils";


export const ItemList = (props) => {

    const [item, setItem] = useState(null);

    useEffect(()=>{
   
        (async function(){
            
            setItem(await ItemsListData());
          }
        )()

    },[])

    async function ListData(item){
        props.invokeTopParent(item.trim().split("\t")[0]);
    }
    // debugger
    // item
    return (
  
        <div>
            
            {
                <List view = {"vieItem"} invokeUpper={ListData} data = {item} />
            }

        </div>

    )
}


