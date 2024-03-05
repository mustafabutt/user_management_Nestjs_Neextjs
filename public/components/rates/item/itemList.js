import {useEffect, useState} from "react";
import globalStyle from '@/styles/utils.module.css'

import { ItemsListData } from "@/utils/itemsUtils";


export const ItemList = (props) => {

    const [item, setItem] = useState(null);
    let detailsArray=[];
    useEffect(()=>{
        (async function(){ 
            setItem(await ItemsListData());
        }
        )()
    },[])

    async function fetchData(e){
        e.preventDefault();
        debugger
        item.data.map((user) => {
            if(e.currentTarget.id == user.item)
                props.invokeTopParent(user);
        })
     
    }
    debugger
    if(!item || item === null)
        return "No data"
    if(item.data.length == 0)
        return "No data"
    return (
        <div>
        {
            item.status==200 ?
            <table className="table-auto overflow-scroll w-full" >
                <tbody>
                    {item && item.data.map((user) => (
                    <>
                        <tr className={globalStyle.tab}><th style={{ border: "7px solid green" }}>Item</th><td style={{ border: "7px solid green" }}><span className="text-blue-500">{user.item.toUpperCase()}</span></td><th style={{ border: "7px solid green" }}>Production time</th><td style={{ border: "7px solid green" }}>{user.production_time}</td> <th style={{ border: "7px solid green" }}>Profit margin</th><td style={{ border: "7px solid green" }}>{user.profit_margin}</td>
                            <tr className={globalStyle.tab} style={{cursor: 'grab'}} id={user.item} onClick={fetchData} >
                                {
                                    user.details.map((innerKeyName, innerKeyIndex)=> { 
                                        detailsArray=[];
                                        Object.keys(innerKeyName).map((mostInnerKeyName, mostInnerKeyIndex)=> {
                                            detailsArray.push( <th style={{ border: "7px solid purple" }}>{mostInnerKeyName}</th>);
                                            detailsArray.push( <td style={{ border: "7px solid purple" }}>{innerKeyName[mostInnerKeyName]}g</td>);
                                            
                                        })
                                        return detailsArray;
                                    })                         
                                }
                            </tr>
                        </tr>
                        <tr>
                            <br></br>
                        </tr>
                    </>
                    ))
                    }
                </tbody>
            </table>
            : null
        }

        </div>

    )
}


