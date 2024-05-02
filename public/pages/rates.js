import loginStyles from '@/styles/login.module.css';
import React, {useCallback, useEffect, useState} from 'react';
import Head from 'next/head';
import dynamic from 'next/dynamic'
const Alert = dynamic(()=> import('@/components/alert'));
const Layout = dynamic(()=> import("@/components/layout"));
import utilStyles from '@/styles/utils.module.css';
import authMiddleware from './middleware';
import $ from 'jquery';
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

const Rates = () => {

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

  const router = useRouter();

  useEffect(()=>{
    
    authMiddleware(router)
  },[])

  const closeModal = (value) => {
    
    if(value == "fabric"){
      if(!createFabricView && !fabricView)
        $('#fabricModal').hide();
      else {
        setShowCreateFabricButton(true);
        setCreateFabricView(false);
        setFabricView(false);
      }
    }
    if(value == "item"){
      
      if(!createItemView && !itemView)
        $('#itemModal').hide();
      else {
        setShowCreateItemButton(true);
        setCreateItemView(false);
        setItemView(false);
      }
    }
    if(value == "shipping"){
      
      if(!createShippingView && !shippingView)
        $('#shippingModal').hide();
      else {
        setShowCreateShippingButton(true);
        setCreateShippingView(false);
        setShippingView(false);
      }
    }
    if(value == "printing"){
      
      if(!createPrintingView && !printingView)
        $('#printingModal').hide();
      else {
        setShowCreatePrintingButton(true);
        setCreatePrintingView(false);
        setPrintingView(false);
      }
    }
    if(value == "embroidery"){
      
      if(!createEmbroideryView && !embroideryView)
        $('#embroideryModal').hide();
      else {
        setShowCreateEmbroideryButton(true);
        setCreateEmbroideryView(false);
        setEmbroideryView(false);
      }
    }
  };
  const showModal = (value) => {
    if(value == "fabric")
      $('#fabricModal').show();
    if(value == "item")
      $('#itemModal').show();
    if(value == "shipping")
      $('#shippingModal').show();
    if(value == "printing")
      $('#printingModal').show();
    if(value == "embroidery")
      $('#embroideryModal').show();
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

  return (
    <Layout admin>
      <Head>
        <title>Candlik - Rates</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <h3>Rates</h3>

        <div id="fabricModal"  aria-hidden="true" className="flex items-center justify-center h-screen modal-backdrop" style={{display:"none"}}   >
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



        <div id="itemModal"  aria-hidden="true" className="flex items-center justify-center h-screen modal-backdrop" style={{display:"none"}}   >
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

        <div id="printingModal"  aria-hidden="true" className="flex items-center justify-center h-screen modal-backdrop" style={{display:"none"}}   >
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

        <div id="embroideryModal"  aria-hidden="true" className="flex items-center justify-center h-screen modal-backdrop" style={{display:"none"}}   >
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


        <div id="shippingModal"  aria-hidden="true" className="flex items-center justify-center h-screen modal-backdrop" style={{display:"none"}}   >
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
        </div>


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
                <button onClick={(value) => showModal(value="shipping")}  className="bg-purple-500 hover:bg-green-400 text-white font-bold py-2 px-4 border-b-4 border-green-700 hover:border-green-500 rounded">
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
