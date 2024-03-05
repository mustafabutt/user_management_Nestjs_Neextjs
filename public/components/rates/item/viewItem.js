import {useEffect, useRef, useState} from "react";
import loginStyles from '@/styles/login.module.css';
import {RatesService} from "@/services/rates.service";
import Alert from '@/components/alert';
import $ from 'jquery';
import { constants } from "../../../constants";

export const ViewItem = (props) => {

    const [itemUpdated, setItemUpdated] = useState(null);
    const [itemDeleted, setItemDeleted] = useState(null);
    let itemName = useRef();
    let time = useRef();
    const [margin, setMargin] = useState(null);
    const [error, setError] = useState(null);
    const [item,setItem] = useState(null);
    let tableArray =[];

    useEffect(()=>{
      setItem(props.item);
    },[])

    if(!item)
      return null;
    const showModel=()=>{
      $("#deleteModal").show();
    }
    const hideModel=()=>{
      $("#deleteModal").hide();
    }
    const focusHandler = () => {
      setError(false);
    }

    async function updateItem(e) {
      e.preventDefault();
      let finalArray = [], name="";
      let tempObj={};
      item.details.map((keyName)=> {
        let innerKeyName= Object.keys(keyName);
        tempObj={};
        tempObj['fabric'] = innerKeyName[0].split("Avg. in ")[1]
        tempObj['quantity'] = $("input[name="+innerKeyName[0].replace(/. +/g, "")+"]").val();
        tempObj['makery'] = $("input[name="+innerKeyName[0].replace(/. +/g, "")+"makery"+"]").val();
        if( tempObj['quantity'] == "")
          tempObj['quantity'] = $("input[name="+innerKeyName[0].replace(/. +/g, "")+"]").attr('placeholder');
        if( tempObj['makery'] == "")
          tempObj['makery'] = $("input[name="+innerKeyName[0].replace(/. +/g, "")+"makery"+"]").attr('placeholder');
        finalArray.push(tempObj);
      })
      if(!itemName.current.value | itemName.current.value == "")
        name =props.item.item
      else name = itemName.current.value;

      if(!time.current.value | time.current.value == "")
        time =props.item.production_time
      else time = time.current.value;

      if(!margin | margin == "")
        margin =props.item.profit_margin
      else margin = margin;

      const res = await RatesService().editItem({
        name: name,
        profit_margin: margin,
        production_time: time,
        fabricAverageAndMakery: finalArray,
        previousItem:  props.item.item
      });
      res.status == 200 ? setItemUpdated(true) : setError(true);
      if(res.status == 200)
        props.invokeParent();
    }

    function changeValue(e){
      setMargin(e.target.value)
    }
    async function deleteItem(e) {
      e.preventDefault();
      const res = await RatesService().DeleteItem({
        name: item
      });
      res.status == 200 ? setItemDeleted(true) : setError(true);
      if(res.status == 200)
        props.invokeParent();
    }
  return (
  
    <div >

      <div id="deleteModal" tabindex="-1" class=" flex items-center justify-center h-screen modal-backdrop" style={{display:"none"}}>
            
            <div class="relative max-w-md ">
              
                <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                    <button  onClick={hideModel} type="button" className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="popup-modal">
                        <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                        </svg>
                        <span class="sr-only">Close modal</span>
                    </button>
                    <div class="p-4 md:p-5 text-center">
                    {itemUpdated ? (
                          <Alert type="success">
                            <span>Item updated successfully.</span>
                          </Alert>
                      ) : null}
                      {itemDeleted ? (
                          <Alert type="success">
                            <span>Item deleted successfully.</span>
                          </Alert>
                      ) : null}
                      {error ? (
                        <Alert type="error">
                          <span>Error occurred! </span>
                        </Alert>
                      ) : null}
                        <svg class="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                        </svg>
                        <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Are you sure you want to delete this item?</h3>
                        <button onClick={deleteItem} data-modal-hide="popup-modal" type="button" class="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center me-2">
                            Yes, I'm sure
                        </button>
                        <button onClick={hideModel} data-modal-hide="popup-modal" type="button" class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">No, cancel</button>
                    </div>
                </div>
            </div>
        </div>

       
        <img onClick={showModel} style={{cursor: 'grab'}}  title="Delete this makery" src="/images/delete.png" className={loginStyles.deleteClass} />
        <form onSubmit={updateItem} className={loginStyles.formClass}>

          <div className={loginStyles.container}>
            <label htmlFor="uname">
              <b>Item</b>
            </label>
            <input
              placeholder={item.item}
              minLength="3"
              className={loginStyles.inputClass}
              type="text"
              name="item"
              ref={itemName}
              onFocus={focusHandler}
            />
            <div class="grid grid-cols-6 gap-3">
              <div class="bg-blue-100 col-span-3">
                <input
                ref={time}
                className={loginStyles.inputClass}
                type="number"
                min = "0"
                placeholder={item.production_time}
                name="time"
                onFocus={focusHandler}
                
              />
            </div>
            <div className="bg-red-100 col-span-3">
              <select onChange={changeValue} className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-4 px-6 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state">
                <option>---Choose a value---</option>
                  {constants.RANGE.map((keyName,keyIndex) => {
                    return <option key={keyIndex}>{keyName}</option>
                      }
                    )
                  } 
              </select>
            </div>
          </div>
            {

              <table className="table">
                  <tbody>
                  {
                    
                    item ?
                      item.details.map((keyName, keyIndex)=> {
                        tableArray= [];
                        let previous="";
                        Object.keys(keyName).map((innerKeyName)=>{
                         
                          tableArray.push( <tr   key={keyIndex} style={{ border: "4px solid"}}>
                                             
                                              <td >{innerKeyName}</td>
                                              <td> <input  onFocus={focusHandler} className="w-700 h-15 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800 " name={previous.replace(/. +/g, "")+""+innerKeyName.replace(/. +/g, "")} type="text" placeholder={keyName[innerKeyName]} /></td>
                                            
                                            </tr>)
                          previous = innerKeyName
                        })
                        return tableArray
                      }):null
                  }
                  </tbody>
              </table>
            }
            
            <hr />
            
            <button className={loginStyles.buttonClass} type='submit'>
              Save changes
            </button>
            
          </div>
        </form>

    </div>
  );
};

