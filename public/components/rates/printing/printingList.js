import {useEffect, useState} from "react";
import {List} from "../../general/index";
import { PrintingListData } from "@/utils/printingUtils";
import { UserService } from "@/services/user.service";

export const PrintingList = (props) => {

    const [printing, setPrinting] = useState(null);

    useEffect( ()=>{
        (async function(){
          setPrinting(await PrintingListData(UserService().getAccessToken()));
          }
        )()
      },[])

    async function ListData(makery){
      props.invokeTopParent(makery.trim().split("\t")[0]);
    }
    
    return (
  
        <div>
            
            {
                <List view = {"printing"} invokeUpper={ListData} data = {printing} />
            }

        </div>

    )
}


