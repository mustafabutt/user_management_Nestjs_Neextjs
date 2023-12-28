import {useEffect, useState} from "react";
import {RatesService} from "../../../services/rates.service";
import {List} from "../../general/index";

export const MakeryList = (props) => {

    const [makery, setMakery] = useState(null);

    useEffect(()=>{
        
        RatesService().getLocalMakeryList().then((data)=>{
            
            if(!data){
                RatesService().getMakeryList().then((innerData)=>{
                    setMakery(innerData)
                })
            }else  setMakery(data);
           
        });
    },[])

    async function ListData(makery){
      
        props.invokeTopParent(makery.trim().split("\t")[0]);
      }
    
    return (
  
        <div>
            
            {
                <List view = {"makery"} invokeUpper={ListData} data = {makery} />
            }

        </div>

    )
}


