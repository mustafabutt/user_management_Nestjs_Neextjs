import loginStyles from '@/styles/login.module.css';
import React, {useCallback, useEffect, useState} from 'react';
import Head from 'next/head';
import dynamic from 'next/dynamic'
const Alert = dynamic(()=> import('@/components/alert'));
const Layout = dynamic(()=> import("@/components/layout"));
import utilStyles from '@/styles/utils.module.css';
import authMiddleware from './middleware';
import {FabricList} from "@/components/rates/fabric/fabricList";
import { CreateFabric } from '@/components/rates/fabric/createFabric';
import { ViewFabric } from '@/components/rates/fabric/viewFabric';
import {useRouter} from "next/router";
import { ViewItem } from '@/components/rates/item/viewItem'; 
import { ItemList } from '@/components/rates/item/itemList'; 
import {CreateItem} from "@/components/rates/item/createItem"
import { CreateShipping } from '@/components/rates/shipping/createShipping'; 
import { ViewShipping } from '@/components/rates/shipping/viewShipping'; 
import { ShippingList } from '@/components/rates/shipping/shippingList'; 
import { PrintingList } from '@/components/rates/printing/printingList'; 
import { CreatePrinting } from '@/components/rates/printing/createPrinting'; 
import { ViewPrinting } from '@/components/rates/printing/viewPrinting'; 
import {EmbroideryList} from "@/components/rates/embroidery/embroideryList"
import {ViewEmbroidery} from "@/components/rates/embroidery/viewEmbroidery"
import {CreateEmbroidery} from "@/components/rates/embroidery/createEmbroidery"
import { useSession } from "next-auth/react"

const Rates = () => {

  const [shippingModel, setShippingModel] = useState(false);
  const [fabricModel, setFabricModel] = useState(false);
  const [itemModel, setItemModel] = useState(false);
  const [printiModel, setPrintiModel] = useState(false);
  const [embroideryModel, setEmbroideryModel] = useState(false);

  const [createFabricView, setCreateFabricView] = useState(null);
  const [fabricCreated, setFabricCreated] = useState(null);
  const [fabricView, setFabricView] = useState(null);
  const [showCreateFabricButton, setShowCreateFabricButton] = useState(true);
  const [currentMaterial, setCurrentMaterial] = useState(null);

  const [createItemView, setCreateItemView] = useState(null);
  const [itemCreated, setItemCreated] = useState(null);
  const [itemView, setItemView] = useState(null);
  const [showCreateItemButton, setShowCreateItemButton] = useState(true);
  const [currentItem, setCurrentItem] = useState(null);

  const [createShippingView, setCreateShippingView] = useState(null);
  const [shippingCreated, setShippingCreated] = useState(null);
  const [shippingView, setShippingView] = useState(null);
  const [showCreateShippingButton, setShowCreateShippingButton] = useState(true);
  const [currentShipping, setCurrentShipping] = useState(null);

  const [createPrintingView, setCreatePrintingView] = useState(null);
  const [printingCreated, setPrintingCreated] = useState(null);
  const [printingView, setPrintingView] = useState(null);
  const [showCreatePrintingButton, setShowCreatePrintingButton] = useState(true);
  const [currentPrinting, setCurrentPrinting] = useState(null);

  const [createEmbroideryView, setCreateEmbroideryView] = useState(null);
  const [embroideryCreated, setEmbroideryCreated] = useState(null);
  const [embroideryView, setEmbroideryView] = useState(null);
  const [showCreateEmbroideryButton, setShowCreateEmbroideryButton] = useState(true);
  const [currentEmbroidery, setCurrentEmbroidery] = useState(null);
  const { status } = useSession();
  const router = useRouter();

  useEffect(()=>{
    
    authMiddleware(router)
  },[])

  const closeModal = (value) => {
    
    if(value == "fabric"){
      if(!createFabricView && !fabricView)
        setFabricModel(false);
      else {
        setShowCreateFabricButton(true);
        setCreateFabricView(false);
        setFabricView(false);
      }
    }
    if(value == "item"){
      
      if(!createItemView && !itemView)
        setItemModel(false);
      else {
        setShowCreateItemButton(true);
        setCreateItemView(false);
        setItemView(false);
      }
    }
    if(value == "shipping"){
      
      if(!createShippingView && !shippingView)
        setShippingModel(false);
      else {
        setShowCreateShippingButton(true);
        setCreateShippingView(false);
        setShippingView(false);
      }
    }
    if(value == "printing"){
      
      if(!createPrintingView && !printingView)
        setPrintiModel(false);
      else {
        setShowCreatePrintingButton(true);
        setCreatePrintingView(false);
        setPrintingView(false);
      }
    }
    if(value == "embroidery"){
      
      if(!createEmbroideryView && !embroideryView)
        setEmbroideryModel(false);
      else {
        setShowCreateEmbroideryButton(true);
        setCreateEmbroideryView(false);
        setEmbroideryView(false);
      }
    }
  };
  const showModal = (value) => {
    if(value == "fabric")
      setFabricModel(true)
    if(value == "item")
      setItemModel(true);
    if(value == "shipping"){
      setShippingModel(true);
    }
    if(value == "printing")
      setPrintiModel(true);
    if(value == "embroidery")
      setEmbroideryModel(true);
  }

  function createFabric(e) {
    e.preventDefault();
    createFabricView ? setCreateFabricView(false) : setCreateFabricView(true);
    setShowCreateFabricButton(false);
  }
  function pullDataFromFabric(){ 
    setCreateFabricView(false);
    setFabricCreated(true);
    setTimeout(()=>{
      setFabricCreated(false);
    },3000);
    setShowCreateFabricButton(true);
  }

  function pullFabricListData(fabric){
    
    setCurrentMaterial(fabric);
    setShowCreateFabricButton(false);
    setFabricView(true);
  }

  function pullDataFromFabricView(){
    setTimeout(()=>{
      setFabricView(false);
    },2000)
    setShowCreateFabricButton(true);
  }
  
  function createPrinting(e) {
    e.preventDefault();
    createPrintingView ? setCreatePrintingView(false) : setCreatePrintingView(true);
    setShowCreatePrintingButton(false);
  }
  function createItem(e) {
    e.preventDefault();
    createItemView ? setCreateItemView(false) : setCreateItemView(true);
    setShowCreateItemButton(false);
  }
  function pullDataFromItem(){
    setCreateItemView(false);
    setItemCreated(true);
    setTimeout(()=>{
      setItemCreated(false);
    },3000);
    setShowCreateItemButton(true);
  }

  function createEmbroidery(e) {
    e.preventDefault();
    createEmbroideryView ? setCreateEmbroideryView(false) : setCreateEmbroideryView(true);
    setShowCreateEmbroideryButton(false);
  }
  function createItem(e) {
    e.preventDefault();
    createItemView ? setCreateItemView(false) : setCreateItemView(true);
    setShowCreateItemButton(false);
  }
  function pullDataFromItem(){
    setCreateItemView(false);
    setItemCreated(true);
    setTimeout(()=>{
      setItemCreated(false);
    },3000);
    setShowCreateItemButton(true);
  }

  function pullDataFromPrinting(){
    setCreatePrintingView(false);
    setPrintingCreated(true);
    setTimeout(()=>{
      setPrintingCreated(false);
    },3000);
    setShowCreatePrintingButton(true);
  }
  
  function pullDataFromEmbroidery(){
    setCreateEmbroideryView(false);
    setEmbroideryCreated(true);
    setTimeout(()=>{
      setEmbroideryCreated(false);
    },3000);
    setShowCreateEmbroideryButton(true);
  }

  function pullPrintingListData(item){
    setCurrentPrinting(item);
    setShowCreatePrintingButton(false);
    setPrintingView(true);
  }
  
  function pullEmbroideryListData(item){
    setCurrentEmbroidery(item);
    setShowCreateEmbroideryButton(false);
    setEmbroideryView(true);
  }

  function pullItemListData(item){
    setCurrentItem(item);
    setShowCreateItemButton(false);
    setItemView(true);
  }

  function pullDataFromPrintingView(){
    setTimeout(()=>{
      setPrintingView(false);
    },2000)
    setShowCreatePrintingButton(true);
  }

  function pullDataFromItemView(){
    setTimeout(()=>{
      setItemView(false);
    },2000)
    setShowCreateItemButton(true);
  }

  function pullDataFromEmbroideryView(){
    setTimeout(()=>{
      setEmbroideryView(false);
    },2000)
    setShowCreateEmbroideryButton(true);
  }

  function createShipping(e) {
    e.preventDefault();
    createShippingView ? setCreateShippingView(false) : setCreateShippingView(true);
    setShowCreateShippingButton(false);
  }
  function pullDataFromShipping(){
    setCreateShippingView(false);
    setShippingCreated(true);
    setTimeout(()=>{
      setShippingCreated(false);
    },3000);
    setShowCreateShippingButton(true);
  }

  function pullShippingListData(shipping){
    
    setCurrentShipping(shipping);
    setShowCreateShippingButton(false);
    setShippingView(true);
  }

  function pullDataFromShippingView(){
    setTimeout(()=>{
      setShippingView(false);
    },2000)
    setShowCreateShippingButton(true);
  }
  if( status == "loading"){ 
    return (<div class="text-center">
        <div role="status">
            <svg aria-hidden="true" class="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
            </svg>
            <span class="sr-only">Loading...</span>
        </div>
    </div>)
  }

  return (
    <Layout admin>
      <Head>
        <title>Candlik - Rates</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <h3>Rates</h3>

        {fabricModel?
          <div  aria-hidden="true" className="flex items-center justify-center h-screen modal-backdrop"  >
          <div className="relative p-6 min-h-full max-h-full overflow-auto" >
              {/* <!-- Modal content --> */}
              <div className="relative bg-white rounded-lg shadow dark:bg-gray-700 " style={{  width: "fit-content"}} >
                  {/* <!-- Modal header --> */}
                  <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 overflow-inherit">
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                      Fabric
                      </h3>
                      {fabricCreated ? (
                        <Alert type="success">
                          <span>New fabric created.</span>
                        </Alert>
                      ) : null}
                      <button onClick={(value) => closeModal(value="fabric")}  type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="default-modal">
                          <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                          </svg>
                          <span className="sr-only">Close modal</span>
                      </button>
                  </div>
                  {/* <!-- Modal body --> */}
                  <div className={loginStyles.container} >
                  {createFabricView ? <CreateFabric  invokeParent={pullDataFromFabric} />: fabricView ? <ViewFabric invokeParent={pullDataFromFabricView} material={currentMaterial}/> :<FabricList invokeTopParent = {pullFabricListData} />}
                  </div>
                  {/* <!-- Modal footer --> */}
                  <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600 ">
                  {showCreateFabricButton ? <span><button type="button" onClick={createFabric}   className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add New Fabric</button></span> : null }
                  </div>
              </div>
          </div>
        </div>
        :null}



        {itemModel? 
          <div  aria-hidden="true" className="flex justify-center h-screen modal-backdrop" >
          <div className="relative p-6 min-h-full max-h-full overflow-auto" >
              {/* <!-- Modal content --> */}
              <div className="relative bg-white rounded-lg shadow dark:bg-gray-700 " style={{  width: "fit-content"}} >
                  {/* <!-- Modal header --> */}
                  <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 overflow-inherit">
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                          Items
                      </h3>
                      {itemCreated ? (
                        <Alert type="success">
                          <span>New item created.</span>
                        </Alert>
                      ) : null}
                      <button onClick={(value) => closeModal(value="item")}  type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="default-modal">
                          <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                          </svg>
                          <span className="sr-only">Close modal</span>
                      </button>
                  </div>
                  {/* <!-- Modal body --> */}
                  <div className={loginStyles.container} >
                    {createItemView ? <CreateItem invokeParent={pullDataFromItem} />: itemView ? <ViewItem invokeParent={pullDataFromItemView} item={currentItem}/> :<ItemList  invokeTopParent = {pullItemListData} />}
                  </div>
                  {/* <!-- Modal footer --> */}
                  <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600 ">
                  {showCreateItemButton ? <span><button type="button" onClick={createItem}  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Create Item</button></span> : null }
                  </div>
              </div>
          </div>
        </div>
        : null}

        {printiModel?
          <div  aria-hidden="true" className="flex items-center justify-center h-screen modal-backdrop"  >
          <div className="relative p-6 min-h-full max-h-full overflow-auto" >
              {/* <!-- Modal content --> */}
              <div className="relative bg-white rounded-lg shadow dark:bg-gray-700 " style={{  width: "fit-content"}} >
                  {/* <!-- Modal header --> */}
                  <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 overflow-inherit">
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                          Printing
                      </h3>
                      {printingCreated ? (
                        <Alert type="success">
                          <span>New printing created.</span>
                        </Alert>
                      ) : null}
                      <button onClick={(value) => closeModal(value="printing")}  type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="default-modal">
                          <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                          </svg>
                          <span className="sr-only">Close modal</span>
                      </button>
                  </div>
                  {/* <!-- Modal body --> */}
                  <div className={loginStyles.container} >
                    {createPrintingView ? <CreatePrinting invokeParent={pullDataFromPrinting} />: printingView ? <ViewPrinting invokeParent={pullDataFromPrintingView} item={currentPrinting}/> :<PrintingList  invokeTopParent = {pullPrintingListData} />}
                  </div>
                  {/* <!-- Modal footer --> */}
                  <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600 ">
                  {showCreatePrintingButton ? <span><button type="button" onClick={createPrinting}  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Create Printing</button></span> : null }
                  </div>
              </div>
          </div>
        </div>
        :null}

        {embroideryModel?
          <div  aria-hidden="true" className="flex items-center justify-center h-screen modal-backdrop"  >
          <div className="relative p-6 min-h-full max-h-full overflow-auto" >
              {/* <!-- Modal content --> */}
              <div className="relative bg-white rounded-lg shadow dark:bg-gray-700 " style={{  width: "fit-content"}} >
                  {/* <!-- Modal header --> */}
                  <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 overflow-inherit">
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                          Embroidery
                      </h3>
                      {embroideryCreated ? (
                        <Alert type="success">
                          <span>New embroidery created.</span>
                        </Alert>
                      ) : null}
                      <button onClick={(value) => closeModal(value="embroidery")}  type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="default-modal">
                          <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                          </svg>
                          <span className="sr-only">Close modal</span>
                      </button>
                  </div>
                  {/* <!-- Modal body --> */}
                  <div className={loginStyles.container} >
                    {createEmbroideryView ? <CreateEmbroidery invokeParent={pullDataFromEmbroidery} />: embroideryView ? <ViewEmbroidery invokeParent={pullDataFromEmbroideryView} item={currentEmbroidery}/> :<EmbroideryList  invokeTopParent = {pullEmbroideryListData} />}
                  </div>
                  {/* <!-- Modal footer --> */}
                  <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600 ">
                  {showCreateEmbroideryButton ? <span><button type="button" onClick={createEmbroidery}  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Create Embroidery</button></span> : null }
                  </div>
              </div>
          </div>
        </div>
        :null}


        {shippingModel ? <div id="shippingModal"  aria-hidden="true" className="flex items-center justify-center h-screen modal-backdrop"  >
          <div className="relative p-6 min-h-full max-h-full overflow-auto" >
              {/* <!-- Modal content --> */}
              <div className="relative bg-white rounded-lg shadow dark:bg-gray-700 " style={{  width: "fit-content"}} >
                  {/* <!-- Modal header --> */}
                  <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 overflow-inherit">
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                      Shipping
                      </h3>
                      {shippingCreated ? (
                        <Alert type="success">
                          <span>New shipping created.</span>
                        </Alert>
                      ) : null}
                      <button onClick={(value) => closeModal(value="shipping")}  type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="default-modal">
                          <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                          </svg>
                          <span className="sr-only">Close modal</span>
                      </button>
                  </div>
                  {/* <!-- Modal body --> */}
                  <div className={loginStyles.container} >
                  {createShippingView ? <CreateShipping invokeParent={pullDataFromShipping} />: shippingView ? <ViewShipping invokeParent={pullDataFromShippingView} item={currentShipping}/> :<ShippingList  invokeTopParent = {pullShippingListData} />}
                  </div>
                  {/* <!-- Modal footer --> */}
                  <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600 ">
                  {showCreateShippingButton ? <span><button type="button" onClick={createShipping}  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Create Shipping</button></span> : null }
                  </div>
              </div>
          </div>
        </div>:null}


        <div className="items-center justify-center p-10 sm:ml-64 top-10 ">
          <div className="p-4">  
              <div className="grid grid-cols-2 gap-4">
                <button onClick={(value) => showModal(value="fabric")} className="bg-indigo-500 hover:bg-green-400 text-white font-bold py-2 px-4 border-b-4 border-green-700 hover:border-green-500 rounded">
                  <div className="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
                      <p className="text-2xl text-gray-400 dark:text-gray-500">Fabric</p>
                  </div>
                </button>
                <button onClick={(value) => showModal(value="item")}  className=" bg-blue-500 hover:bg-green-400 text-white font-bold py-2 px-4 border-b-4 border-green-700 hover:border-green-500 rounded">
                  <div className="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
                      <p className="text-2xl text-gray-400 dark:text-gray-500">Items</p>
                  </div>
                </button>
                <button onClick={(value) => showModal(value="printing")}  className="bg-pink-500 hover:bg-green-400 text-white font-bold py-2 px-4 border-b-4 border-green-700 hover:border-green-500 rounded">
                  <div className="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
                      <p className="text-2xl text-gray-400 dark:text-gray-500">Printing</p>
                  </div>
                </button>
                <button onClick={(value) => showModal(value="embroidery")}  className="bg-yellow-500 hover:bg-green-400 text-white font-bold py-2 px-4 border-b-4 border-green-700 hover:border-green-500 rounded">
                  <div className="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
                      <p className="text-2xl text-gray-400 dark:text-gray-500">Embroidery</p>
                  </div>
                </button>
                <button onClick={(value) => showModal(value="shipping")} className="bg-purple-500 hover:bg-green-400 text-white font-bold py-2 px-4 border-b-4 border-green-700 hover:border-green-500 rounded">
                  <div className="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
                      <p className="text-2xl text-gray-400 dark:text-gray-500">Shipping</p>
                  </div>
                </button>
              </div>
          </div>
        </div>

      </section>

    </Layout>
  );
};
export default Rates;
