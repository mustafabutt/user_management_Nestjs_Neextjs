'use client'
import {useEffect, useState, useRef} from "react";
import Dropdown from "./dropdown";
import DropdownMultiOptions from "./DropdownMultiOptions";
import { ShippingListData } from "@/utils/shippingUtils";
import { UserService } from "@/services/user.service";
import { ItemsListData } from "@/utils/itemsUtils";
import { FabricListData } from "@/utils/fabricUtils";
import { EmbroideryListData } from "@/utils/embroideryUtils";
import { PrintingListData } from "@/utils/printingUtils";
import {ClientListData} from "@/utils/clientUtils";
import { RatesService } from "@/services/rates.service";
import {useRouter} from "next/router";
import $ from 'jquery';
import DatePicker from "react-datepicker"; 
import "react-datepicker/dist/react-datepicker.css";

export const PriceGenerator = (props) => {

  const [deliveryDate, setDeliveryDate] = useState(new Date()); 
  const [view, setView] = useState();
  const [shippinglist, setShippinglist] = useState(null);
  const [printinglist, setPrintinglist] = useState(null);
  const [embroiderylist, setembroiderylist] = useState(null);
  const [itemlist, setItemlist] = useState(null);
  const [clientlist, setClientlist] = useState(null);
  const [fabriclist, setFabriclist] = useState(null);
  const [shipping, setShipping] = useState(null);
  const [item, setItem] = useState(null);
  const [client, setClient] = useState(null);
  const [fabric, setFabric] = useState(null);
  const [embType, setEmbType] = useState(null);
  const [printType, setPrintType] = useState(null);
  const [totalPrice, setTotalPrice] = useState(null);
  const [decorationValue, setDecorationValue] = useState(null);
  const [dimenssions, setDimenssions] = useState(false);
  const [cost, setCost] = useState(null);
  const quantity = useRef(null);
  const rate = useRef(null);
  const width = useRef(null)
  const height = useRef(null);
  const decoration = ["Printing", "Embroidery"]
  const greenClass = "w-100 h-15 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800 "
  const redClass = " w-100 h-15 border border-red-300 rounded bg-red-50 focus:ring-3 focus:ring-primary-300 dark:bg-red-700 dark:border-red-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800 " 
  let orderArray =  useRef(new Array());
  
  useEffect( ()=>{
    (async function(){
      setShippinglist(await ShippingListData(UserService().getAccessToken()));
      setItemlist(await ItemsListData());
      setFabriclist(await FabricListData());
      setembroiderylist(await EmbroideryListData());
      setPrintinglist(await PrintingListData());
      setClientlist(await ClientListData());
      }
    )()
    setView(props.parent);
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
  function dropDownDataForEmb(value){
    
    setEmbType(value);
    setPrintType(null);
    $("#height").show()
    $("#width").show()
  }
  function dropDownDataForPrint(value){
    
    setPrintType(value);
    setEmbType(null);
    $("#height").show()
    $("#width").show()

  }
  async function dropDownData(value, data){
    if(data == "shipping")
      setShipping(value)
    if(data == "item")
      setItem(value)
    if(data == "fabric")
      setFabric(value)
    if(data == "decoration"){
      setDecorationValue(value);
    }
    if(data == "cleints"){
      setClient(value);
    }
    
    if(value == "Choose decoration"){  
      $("#printDrop").hide();
      $("#embDrop").hide();
      $("#height").hide()
      $("#width").hide()
      setPrintType("");
      setEmbType("");
    }

  }
  if(decorationValue == "Printing"){
    $("#printDrop").show();
    $("#embDrop").hide();
  }
  if(decorationValue == "Embroidery"){
    $("#embDrop").show();
    $("#printDrop").hide();
  }
  if(printType == "Choose print type" ){
    
    $("#height").hide()
    $("#width").hide()
  }
  if(embType == "Choose embroidery type" ){
    
    $("#height").hide()
    $("#width").hide()
  }

  async function getData(item){
    let tempObj={};
    await itemlist.data.forEach(element => {
      if(element.item == item){
        tempObj.profit_margin=element.profit_margin
        tempObj.production_time = element.production_time
      }
    });
    return tempObj;
  }
  function removeBorder(e){
    setDimenssions(false);
  }
  async function generateInvoice(e) {
    e.preventDefault();
    let results, decHeight, decWidth, obj, usdRate;

    if(!shipping || !item || !fabric || !client)
      return null;
    results = await getData(item)
    if(view == "index")
      usdRate = rate.current.value;;
    let qty = quantity.current.value;
    let profit_margin = results.profit_margin;
    let production_time = results.production_time

    if(decorationValue && (height.current.value && width.current.value)){
      decHeight = height.current.value;
      decWidth = width.current.value;
    }else if(decorationValue && (height.current.value == "" || width.current.value == "")){setDimenssions(true); return }
    obj = {
      item, fabric, qty, profit_margin, production_time, usdRate, "decoration":{value: "", type:"", size:{"width":"", "height":""}} 
    }
    if(decorationValue == "Printing"){
      obj = {
        item, fabric, qty, profit_margin, production_time, usdRate, "decoration":{value: decorationValue, type:printType, size:{"width":decWidth, "height":decHeight}} 
      }
    }
    if(decorationValue == "Embroidery"){
      obj = {
        item, fabric, qty, profit_margin, production_time, usdRate, "decoration":{value: decorationValue, type:embType, size:{"width":decWidth, "height":decHeight}} 
      }
    }
    if(view == "createOrder" ){
      
      let date = deliveryDate.toISOString();
      orderArray.current.push(obj)
      props.invokeParent(orderArray.current, {client, date, shipping});

    }
    else {
      const result = await RatesService().CalculateItemPrice(obj)
      let data = await result.json();
      if(result.status == 200)
      {
        setTotalPrice(data.dollarPrice);
        setCost(data.totalPrice);
        $("#priceModal").show();
      }
    }

  }

  if(!shippinglist || !itemlist || !fabriclist || !printinglist || !embroiderylist || !clientlist)
    return null;

  return (
    
    <>

    <div id="priceModal" tabindex="-1" class=" flex items-center justify-center h-screen modal-backdrop" style={{display:"none"}} >
      
      <div class="relative max-w-md ">
        
          <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <button  onClick={(value) => closeModal(value="users")} type="button" className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="popup-modal">
                  <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                  </svg>
                  <span class="sr-only">Close modal</span>
              </button>
              <div class="p-4 md:p-5 text-center">
              
                  <svg class="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                  </svg>
                  <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Cost per {item} is {cost}. </h3>
                  <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Export Price per {item} is {totalPrice}. </h3>
                  <button onClick={(value) => closeModal(value="users")} data-modal-hide="popup-modal" type="button" class="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center me-2">
                      Generate another price
                  </button>
              </div>
          </div>
      </div>
    </div>


      <form class="w-full max-w-lg" onSubmit={generateInvoice}>

        <div class="grid grid-cols-20">
        {view == "createOrder" ? <div class="col-span-1 p-2.5">
          <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-state">
                Set delivery date
          </label>
            <div class="relative ">
            <DatePicker selected={deliveryDate} onChange= {(date) => setDeliveryDate(date)} /> 
            </div>
        </div>:null }

        {view == "createOrder" ?   <div class="col-span-1">
          <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-state">
               Select customer
          </label>
            <div class="relative ">
            <Dropdown required data = {"cleints"} getData = {dropDownData} list= {clientlist.data} />
            </div>
          </div>:null }
        
          <div class="col-span-4 ">
            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-state">
              
            </label>
            <div class="relative">
              
               <Dropdown required data = {"shipping"} getData = {dropDownData} list = {shippinglist.data} />
            </div>
          </div>

          <div class="col-span-4">
            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-state">
              
            </label>
            <div class="relative">
              
               <Dropdown required data = {"item"} getData = {dropDownData} list= {itemlist.data} />
            </div>
          </div>
          
          <div class="col-span-4">
            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-state">
              
            </label>
            <div class="relative">
              
               <Dropdown required data = {"fabric"} getData = {dropDownData} list ={fabriclist.data} />
            </div>
          </div>
          
          <div class="col-span-4 ">
            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-state">
              
            </label>
            <div class="relative">
              
               <Dropdown required data = {"decoration"} list = {decoration} getData = {dropDownData} />
               {/* <DropdownMultiOptions list = {decoration} /> */}
            </div>
          </div>
          <div class="grid grid-cols-6 gap-3">
          <div class="col-span-8 " style = {{"display":"none"}} id = "printDrop">
            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-state">
              
            </label>
            <div class="relative">
              
               <Dropdown required data = {"print type"} getData = {dropDownDataForPrint} list = {printinglist.data} />
            </div>
          </div>
          <div class="col-span-8 " style = {{"display":"none"}} id = "embDrop">
            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-state">
              
            </label>
            <div class="relative">
              
               <Dropdown required data = {"embroidery type"} getData = {dropDownDataForEmb} list = {embroiderylist.data} />
            </div>
          </div>
          <div style = {{"display":"none"}} id="width" class="col-span-3">
            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-state">
              
            </label>
            <div class="relative ">
            <input placeholder="Width in centimeters" min = "0" ref={width}  aria-describedby="width" type="number" onFocus={removeBorder} className={ dimenssions? redClass: greenClass}  />
            </div>
          </div>
          <div style = {{"display":"none"}} id="height" class="col-span-3">
            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-state">
              
            </label>
            <div class="relative ">
            <input placeholder="Height in centimeters" min = "0" ref={height} aria-describedby="height" type="number" onFocus={removeBorder} className={ dimenssions? redClass: greenClass}  />
            </div>
          </div>

          <div class="col-span-3">
            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-state">
              
            </label>
            <div class="relative ">
            <input placeholder="Enter quantity" min = "0" required ref={quantity} id="qty" aria-describedby="qty" type="number" className="w-100 h-15 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800 " />            </div>
          </div>
          
          {view == "index" ? <div class="col-span-3">
            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-state">
              
            </label>
            <div class="relative ">
            <input placeholder="USD rate" min = "0" required ref={rate} id="qty" aria-describedby="rate" type="number" className="w-100 h-15 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800 " />
            </div>
          </div> :null }
          </div>
          
        </div>
        {view == "createOrder" ? <button type="submit" className="w-full bg-black rounded-lg p-2 mt-3 text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Add to cart</button> : <button type="submit" className="w-full bg-black rounded-lg p-2 mt-3 text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Calculate Price</button>}

      </form>

      </>
  );
};


{/* <DatePicker selected={startDate} onChange= {(date) => setStartDate(date)} />  */}

