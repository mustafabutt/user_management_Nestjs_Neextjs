'use client'
import {useEffect, useState, useRef} from "react";
import Dropdown from "./dropdown";
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

  const router = useRouter();
  const [deliveryDate, setDeliveryDate] = useState(new Date()); 
  const [view, setView] = useState();
  const [priceModel, setPriceModel] = useState(false);
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
  const greenclassName = "w-100 h-15 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800 "
  const redclassName = " w-100 h-15 border border-red-300 rounded bg-red-50 focus:ring-3 focus:ring-primary-300 dark:bg-red-700 dark:border-red-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800 " 
  let orderArray =  useRef(new Array());
  let shippingListLocal = [];
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
  

  if(shippinglist && shippinglist.status != 409){
    
    let obj=[];
    
    if(shippinglist.data.length < shippinglist.data.length +1){
      shippinglist.data.map((keyName) => {
        obj.push({"service":keyName.service+"(direct)", "direct":keyName.directRate})
        obj.push({"service":keyName.service+"(indirect)", "indirect":keyName.indirectRate})
        }
      )
      shippingListLocal.data = obj;
    }

  } 
  else if(shippinglist && shippinglist.status == 409){
    (async ()=>{
      await UserService().callLogout(UserService().getAccessToken());
      router.push({ pathname: "/login"});
    })()
  }
  const closeModal = () => {
    setPriceModel(false);
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
    if(view == "index"){
      usdRate = rate.current.value;
      if(!shipping || !item || !fabric)
        return null;
    }else {
      if(!shipping || !item || !fabric || !client)
        return null;
    }

    results = await getData(item)
  
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
    debugger
    if(view == "createOrder" ){
      
      let date = deliveryDate.toISOString();
      orderArray.current.push(obj)
      props.invokeParent(orderArray.current, {client, date, shipping});

    }
    else {
      
      obj.shipping=shipping;
      const result = await RatesService().CalculateItemPrice(obj)
      let data = await result.json();
      debugger
      if(result.status == 200)
      {
        debugger
        setTotalPrice(data.dollarPrice);
        setCost(data.totalPrice);
        
        setPriceModel(true);
      }
    }

  }

  if(!shippinglist || !itemlist || !fabriclist || !printinglist || !embroiderylist || !clientlist)
    return (<div class="text-center">
            <div role="status">
                <svg aria-hidden="true" class="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                </svg>
                <span class="sr-only">Loading...</span>
            </div>
        </div>)

  return (
    
    <>
    {priceModel?
      <div tabIndex="-1" className="flex items-center justify-center h-screen modal-backdrop" >
          
        <div className="relative max-w-md ">
          
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                <button  onClick={closeModal} type="button" className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="popup-modal">
                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                    </svg>
                    <span className="sr-only">Close modal</span>
                </button>
                <div className="p-4 md:p-5 text-center">
                
                    <svg className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                    </svg>
                    <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Cost per {item} is {cost}. </h3>
                    <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Export Price per {item} is {totalPrice}. </h3>
                    <button onClick={closeModal} data-modal-hide="popup-modal" type="button" className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center me-2">
                        Generate another price
                    </button>
                </div>
            </div>
        </div>
      </div>
    :null}

      <form className="w-full max-w-lg" onSubmit={generateInvoice}>

        <div className="grid grid-cols-20">
        {view == "createOrder" ? <div className="col-span-1 p-2.5">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-state">
                Set delivery date
          </label>
            <div className="relative ">
            <DatePicker selected={deliveryDate} onChange= {(date) => setDeliveryDate(date)} /> 
            </div>
        </div>:null }

        {view == "createOrder" ?   <div className="col-span-1">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-state">
               Select customer
          </label>
            <div className="relative ">
            <Dropdown required data = {"cleints"} getData = {dropDownData} list= {clientlist.data} />
            </div>
          </div>:null }
        
          <div className="col-span-4 ">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-state">
              
            </label>
            <div className="relative">
              
               <Dropdown required data = {"shipping"} getData = {dropDownData} list = {shippingListLocal.data} />
            </div>
          </div>

          <div className="col-span-4">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-state">
              
            </label>
            <div className="relative">
              
               <Dropdown required data = {"item"} getData = {dropDownData} list= {itemlist.data} />
            </div>
          </div>
          
          <div className="col-span-4">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-state">
              
            </label>
            <div className="relative">
              
               <Dropdown required data = {"fabric"} getData = {dropDownData} list ={fabriclist.data} />
            </div>
          </div>
          
          <div className="col-span-4 ">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-state">
              
            </label>
            <div className="relative">
              
               <Dropdown required data = {"decoration"} list = {decoration} getData = {dropDownData} />
               {/* <DropdownMultiOptions list = {decoration} /> */}
            </div>
          </div>
          <div className="grid grid-cols-6 gap-3">
          <div className="col-span-8 " style = {{"display":"none"}} id = "printDrop">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-state">
              
            </label>
            <div className="relative">
              
               <Dropdown required data = {"print type"} getData = {dropDownDataForPrint} list = {printinglist.data} />
            </div>
          </div>
          <div className="col-span-8 " style = {{"display":"none"}} id = "embDrop">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-state">
              
            </label>
            <div className="relative">
              
               <Dropdown required data = {"embroidery type"} getData = {dropDownDataForEmb} list = {embroiderylist.data} />
            </div>
          </div>
          <div style = {{"display":"none"}} id="width" className="col-span-3">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-state">
              
            </label>
            <div className="relative ">
            <input placeholder="Width in centimeters" min = "0" ref={width}  aria-describedby="width" type="number" onFocus={removeBorder} className={ dimenssions? redclassName: greenclassName}  />
            </div>
          </div>
          <div style = {{"display":"none"}} id="height" className="col-span-3">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-state">
              
            </label>
            <div className="relative ">
            <input placeholder="Height in centimeters" min = "0" ref={height} aria-describedby="height" type="number" onFocus={removeBorder} className={ dimenssions? redclassName: greenclassName}  />
            </div>
          </div>

          <div className="col-span-3">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-state">
              
            </label>
            <div className="relative ">
            <input placeholder="Enter quantity" min = "0" required ref={quantity} id="qty" aria-describedby="qty" type="number" className="w-100 h-15 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800 " />            </div>
          </div>
          
          {view == "index" ? <div className="col-span-3">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-state">
              
            </label>
            <div className="relative ">
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



