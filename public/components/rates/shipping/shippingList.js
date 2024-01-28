import {useEffect, useState} from "react";
import {List} from "../../general/index";
import { ShippingListData } from "@/utils/shippingUtils";
import { UserService } from "@/services/user.service";

export const ShippingList = (props) => {

    const [shipping, setShipping] = useState(null);

    useEffect( ()=>{
        (async function(){
            setShipping(await ShippingListData(UserService().getAccessToken()));
          }
        )()
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


