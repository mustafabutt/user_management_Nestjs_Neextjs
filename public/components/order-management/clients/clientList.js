import {useEffect, useState} from "react";
import {List} from "../../general/index";
import { ClientListData } from "@/utils/clientUtils";
import { UserService } from "@/services/user.service";

export const ClientsList = (props) => {

    const [clients, setClients] = useState(null);

    useEffect( ()=>{
        (async function(){
          setClients(await ClientListData(UserService().getAccessToken()));
          }
        )()
      },[])

    async function ListData(client){
      props.invokeTopParent(client.trim().split("\t")[0]);
    }
    if(!clients || clients == null)
      return <p>No clients found.</p>
    return (
  
        <div>
            
            {
                <List view = {"clients"} invokeUpper={ListData} data = {clients} />
            }

        </div>

    )
}


