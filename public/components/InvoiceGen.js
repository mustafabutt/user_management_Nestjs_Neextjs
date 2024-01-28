'use client'
import {useEffect, useState, useRef} from "react";
import Dropdown from "./dropdown";
import { ShippingListData } from "@/utils/shippingUtils";
import { UserService } from "@/services/user.service";
import { ItemsListData } from "@/utils/itemsUtils";
import { FabricListData } from "@/utils/fabricUtils";
import { RatesService } from "@/services/rates.service";
import $ from 'jquery';
export const InvoiceGenerator = () => {
  const [shippinglist, setShippinglist] = useState(null);
  const [itemlist, setItemlist] = useState(null);
  const [fabriclist, setFabriclist] = useState(null);
  const [shippingValue, setShippingValue] = useState(null);
  const [itemValue, setItemValue] = useState(null);
  const [fabricValue, setFabricValue] = useState(null);
  const [totalPrice, setTotalPrice] = useState(null);
  const qty = useRef(null);


  useEffect( ()=>{
    (async function(){
      setShippinglist(await ShippingListData(UserService().getAccessToken()));
      setItemlist(await ItemsListData());
      setFabriclist(await FabricListData());
      }
    )()
    
  },[])
  if(shippinglist){
    
    let obj=[];
    if(shippinglist.data.length < 4){
      shippinglist.data.map((keyName,keyIndex) => {
        obj.push({"service":keyName.service+"(direct)", "direct":keyName.directRate})
        obj.push({"service":keyName.service+"(indirect)", "indirect":keyName.indirectRate})
        }
      )
      shippinglist.data = obj;
    }
    
  }
  
  const closeModal = () => {
    $("#priceModal").hide();
  };
  async function dropDownData(value, data){
    if(data == "shipping")
      setShippingValue(value)
    if(data == "item")
      setItemValue(value)
    if(data == "fabric")
      setFabricValue(value)
  }
  async function generateInvoice(e) {
    e.preventDefault();

    if(!shippingValue || !itemValue || !fabricValue)
      return null;
    let quantity = qty.current.value;
    const result = await RatesService().CalculateItemPrice({
      shippingValue, itemValue, fabricValue, quantity
    })
    let data = await result.json();
    if(result.status == 200)
    {
      setTotalPrice(data.totalPrice);
      $("#priceModal").show();
    }

  }

  if(!shippinglist || !itemlist || !fabriclist)
    return null;

  return (
    
    <>
      <div className="modal modal-backdrop" id="priceModal" role="dialog" style={{overflow:"auto"}}>
        <div className="modal-dialog">
          <div className="modal-content" style={{  width: "fit-content" }} >
            <div className="modal-header">
              <h4 className="modal-title">
                <span>Price Box</span>
              </h4>
            </div>
            <div className="modal-body">

              Price per {itemValue} is {totalPrice}. 
            </div>
            <div className="modal-footer">
              <span>
                <button type="button" onClick={(value) => closeModal(value="users")}  className="w-49 bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 border-b-4 border-red-700 hover:border-red-500 rounded">Close</button>
            
              </span>
            </div>
          </div>
        </div>
      </div>


      <form class="w-full max-w-lg" onSubmit={generateInvoice}>

        <div class="grid grid-cols-20">
          
          <div class="col-span-4">
            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-state">
              Item
            </label>
            <div class="relative">
              
               <Dropdown required data = {"item"} getData = {dropDownData} list= {itemlist.data} />
            </div>
          </div>
          <div class="col-span-4">
            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-state">
              Quantity
            </label>
            <div class="relative ">
            <input min = "0" required ref={qty} id="qty" aria-describedby="qty" type="number" className="w-100 h-15 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800 " />
            </div>
          </div>
          
          <div class="col-span-4">
            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-state">
              Fabric
            </label>
            <div class="relative">
              
               <Dropdown required data = {"fabric"}  getData = {dropDownData} list ={fabriclist.data} />
            </div>
          </div>
          <div class="col-span-4 ">
            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-state">
              Shipping
            </label>
            <div class="relative">
              
               <Dropdown required data = {"shipping"} getData = {dropDownData} list = {shippinglist.data} />
            </div>
          </div>
        </div>
        <button type="submit" className="w-full bg-black rounded-lg p-2 mt-3 text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Go</button>

      </form>

      </>
  );
};

