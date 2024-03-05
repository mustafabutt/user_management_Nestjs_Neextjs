import {useEffect, useRef, useState} from "react";
import loginStyles from '@/styles/login.module.css';
import {RatesService} from "@/services/rates.service";
import Alert from '@/components/alert';
import $ from 'jquery';
import { constants } from "../../../constants";

export const CreateItem = (props) => {
    const [makeryExists, setMakeryExists] = useState(null);
    const [fabricList, setFabricList] = useState(null);
    const item = useRef(null);
    const time = useRef(null);
    const [margin, setMargin] = useState(null);
   
    useEffect(()=>{props.view; 
      RatesService().getLocalFabricList().then((data)=>{
        let tempArray = [];
        data.data.map((keyName)=> {
          let fabricName = keyName.material;
          tempArray.push(fabricName);
      })

      const obj = {};
      tempArray.forEach((element) => {
          obj[`${element}`] = "";
          });
      setFabricList(obj)
      })
    },[])

    const focusHandler = () => {
      setMakeryExists(false);
    };

    async function createItemCall(e) {
      e.preventDefault();
      let finalArray = [];
      const tempObj={};
      Object.keys(fabricList).map((fabricName)=>{
        tempObj={};
        tempObj['fabric'] = fabricName;
        tempObj['quantity'] = $("input[name="+fabricName+"]").val();
        tempObj['makery'] = $("input[name=Makery"+fabricName+"]").val();
        finalArray.push(tempObj);
      })
      
      const res = await RatesService().createItem({ 
        name: item.current.value,
        profit_margin: margin,
        production_time: time.current.value,
        fabricAverageAndMakery:  finalArray
      });
      
      res.status == 201 ? props.invokeParent() : null;
      res.status == 409 ? setMakeryExists(true) : null;
    }
    function changeValue(e){
      setMargin(e.target.value)
    }
     
  return (
    <div >
      <form onSubmit={createItemCall} >
        
        <div className={loginStyles.container} >
          
          <input
            ref={item}
            minLength="3"
            className={loginStyles.inputClass}
            type="text"
            placeholder="Enter item name"
            name="item"
            onFocus={focusHandler}
            required
          />
          {makeryExists ? (
            <Alert type="error">
              <span>Already exists</span>
            </Alert>
          ) : null}
          
          <div class="grid grid-cols-6 gap-3">
            <div class="bg-blue-100 col-span-3">
              <input
              ref={time}
              className={loginStyles.inputClass}
              type="number"
              min = "0" 
              placeholder="Production time(days)"
              name="time"
              onFocus={focusHandler}
              required
            />
            </div>
            <div className="bg-red-100 col-span-3">
            
              <select onChange={changeValue} class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-4 px-6 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state">
                <option>---Choose a value---</option>
                
                  {constants.RANGE.map((keyName,keyIndex) => {
                    return <option key={keyIndex}>{keyName}</option>
                      }
                    )
                  } 
              </select>
            </div>
          </div>
          <table className="table">
              
              <tbody>
            
              {
                fabricList ?
                Object.keys(fabricList).map((keyName, keyIndex)=> {
                  
                return <tr key={keyIndex}>
              
                        <td>Avg. in {keyName}</td>
                        <td> <input className="w-700 h-15 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800 " name={keyName} type="text" size={5}  /></td>
                        <td>Makery for {keyName}</td>
                        <td> <input className="w-700 h-15 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800 " name={"Makery"+keyName} type="text" size={5}  /></td>
                      </tr>
                }):null
              }
              </tbody>
          </table>
        
          
          <button className={loginStyles.buttonClass} type='submit'>
            Save
          </button>
          
        </div>
      </form>

    </div>
  );
};

