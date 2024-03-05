import {useEffect, useState} from "react";
import {List} from "../../general/index";
import { EmbroideryListData } from "@/utils/embroideryUtils";
import { UserService } from "@/services/user.service";

export const EmbroideryList = (props) => {

    const [embroidery, setEmbroidery] = useState(null);

    useEffect( ()=>{
        (async function(){
          setEmbroidery(await EmbroideryListData(UserService().getAccessToken()));
          }
        )()
      },[])

    async function ListData(makery){
      props.invokeTopParent(makery.trim().split("\t")[0]);
    }
    
    return (
  
        <div>
            
            {
                <List view = {"embroidery"} invokeUpper={ListData} data = {embroidery} />
            }

        </div>

    )
}


