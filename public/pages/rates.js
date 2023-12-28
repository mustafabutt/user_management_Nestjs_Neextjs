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
import {UserService} from "@/services/user.service";
import { CreateFabric } from '@/components/rates/fabric/createFabric';
import { ViewFabric } from '@/components/rates/fabric/viewFabric';
import {useRouter} from "next/router";
import { MakeryList } from '@/components/rates/makery/makeryList';
import { CreateMakery } from '@/components/rates/makery/createMakery';
import { ViewMakery } from '@/components/rates/makery/viewMakery';
import { CreateItem } from '@/components/rates/item/createItem'; 
import { ViewItem } from '@/components/rates/item/viewItem'; 
import { ItemList } from '@/components/rates/item/itemList'; 

import { CreateShipping } from '@/components/rates/shipping/createShipping'; 
import { ViewShipping } from '@/components/rates/shipping/viewShipping'; 
import { ShippingList } from '@/components/rates/shipping/shippingList'; 

const Rates = () => {

  const [createFabricView, setCreateFabricView] = useState(null);
  const [fabricCreated, setFabricCreated] = useState(null);
  const [fabricView, setFabricView] = useState(null);
  const [showCreateFabricButton, setShowCreateFabricButton] = useState(true);
  const [currentMaterial, setCurrentMaterial] = useState(null);

  const [createMakeryView, setCreateMakeryView] = useState(null);
  const [makeryCreated, setMakeryCreated] = useState(null);
  const [makeryView, setMakeryView] = useState(null);
  const [showCreateMakeryButton, setShowCreateMakeryButton] = useState(true);
  const [currentMakery, setCurrentMakery] = useState(null);

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
    if(value == "makery"){
      
      if(!createMakeryView && !makeryView)
        $('#makeryModal').hide();
        else {
          setShowCreateMakeryButton(true);
          setCreateMakeryView(false);
          setMakeryView(false);
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
  };
  const showModal = (value) => {
    if(value == "fabric")
      $('#fabricModal').show();
    if(value == "makery")
      $('#makeryModal').show();
    if(value == "item")
      $('#itemModal').show();
    if(value == "shipping")
      $('#shippingModal').show();
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
  

  function createMakery(e) {
    e.preventDefault();
    createMakeryView ? setCreateMakeryView(false) : setCreateMakeryView(true);
    setShowCreateMakeryButton(false);
  }
  function pullDataFromMakery(){
    setCreateMakeryView(false);
    setMakeryCreated(true);
    setTimeout(()=>{
      setMakeryCreated(false);
    },3000);
    setShowCreateMakeryButton(true);
  }

  function pullMakeryListData(makery){
    
    setCurrentMakery(makery);
    setShowCreateMakeryButton(false);
    setMakeryView(true);
  }

  function pullDataFromMakeryView(){
    setTimeout(()=>{
      setMakeryView(false);
    },2000)
    setShowCreateMakeryButton(true);
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

  function pullItemListData(makery){
    
    setCurrentItem(makery);
    setShowCreateItemButton(false);
    setItemView(true);
  }

  function pullDataFromItemView(){
    setTimeout(()=>{
      setItemView(false);
    },2000)
    setShowCreateItemButton(true);
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

  function pullShippingListData(makery){
    
    setCurrentShipping(makery);
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
        <title>Rates</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <h3>Rates</h3>
        
        <div className="modal modal-backdrop" id="fabricModal" role="dialog" style={{overflow:"auto"}}>
          <div className="modal-dialog">
            <div className="modal-content" style={{  width: "fit-content" }} >
              <div className="modal-header">
                <h4 className="modal-title">
                  <span >Fabric</span>
                </h4>
                {fabricCreated ? (
              <Alert type="success">
                <span>New fabric created.</span>
              </Alert>
            ) : null}
              </div>
              <div className="modal-body">

                  <div className={loginStyles.container}>
                    {createFabricView ? <CreateFabric  invokeParent={pullDataFromFabric} />: fabricView ? <ViewFabric invokeParent={pullDataFromFabricView} material={currentMaterial}/> :<FabricList invokeTopParent = {pullFabricListData} />}
                  </div>

              </div>
              <div className="modal-footer">
                <span>
                  <button type="button" onClick={(value) => closeModal(value="fabric")}  className="w-49 bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 border-b-4 border-red-700 hover:border-red-500 rounded">Close</button>
                  {showCreateFabricButton ? <span><button type="button" onClick={createFabric}  className="w-49 bg-green-500 hover:bg-green-400 text-white font-bold py-2 px-4 border-b-4 border-green-700 hover:border-green-500 rounded">Create Fabric</button></span> : null }
             
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="modal modal-backdrop" id="makeryModal" role="dialog" style={{overflow:"auto"}}>
        <div className="modal-dialog">
            <div className="modal-content" style={{  width: "fit-content" }} >
              <div className="modal-header">
                <h4 className="modal-title">
                  <span >Makery</span>
                </h4>
                {makeryCreated ? (
              <Alert type="success">
                <span>New makery added.</span>
              </Alert>
            ) : null}
              </div>
              <div className="modal-body">

                  <div className={loginStyles.container}>
                    {createMakeryView ? <CreateMakery invokeParent={pullDataFromMakery} />: makeryView ? <ViewMakery invokeParent={pullDataFromMakeryView} item={currentMakery}/> :<MakeryList  invokeTopParent = {pullMakeryListData} />}
                  </div>

              </div>
              <div className="modal-footer">
                <span>
                  <button type="button" onClick={(value) => closeModal(value="makery")}  className="w-49 bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 border-b-4 border-red-700 hover:border-red-500 rounded">Close</button>
                  {showCreateMakeryButton ? <span><button type="button" onClick={createMakery}  className="w-49 bg-green-500 hover:bg-green-400 text-white font-bold py-2 px-4 border-b-4 border-green-700 hover:border-green-500 rounded">Insert Makery</button></span> : null }
             
                </span>
              </div>
            </div>
          </div>
        </div>


        <div className="modal modal-backdrop" id="itemModal" role="dialog" style={{overflow:"auto"}}>
        <div className="modal-dialog">
            <div className="modal-content" style={{  width: "fit-content" }} >
              <div className="modal-header">
                <h4 className="modal-title">
                  <span >Items</span>
                </h4>
                {itemCreated ? (
              <Alert type="success">
                <span>New items created.</span>
              </Alert>
            ) : null}
              </div>
              <div className="modal-body">

                  <div className={loginStyles.container}>
                    {createItemView ? <CreateItem invokeParent={pullDataFromItem} />: itemView ? <ViewItem invokeParent={pullDataFromItemView} item={currentItem}/> :<ItemList  invokeTopParent = {pullItemListData} />}
                  </div>

              </div>
              <div className="modal-footer">
                <span>
                  <button type="button" onClick={(value) => closeModal(value="item")}   className="w-49 bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 border-b-4 border-red-700 hover:border-red-500 rounded">Close</button>
                  {showCreateItemButton ? <span><button type="button" onClick={createItem}  className="w-49 bg-green-500 hover:bg-green-400 text-white font-bold py-2 px-4 border-b-4 border-green-700 hover:border-green-500 rounded">Create Item</button></span> : null }
             
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="modal modal-backdrop" id="shippingModal" role="dialog" style={{overflow:"auto"}}>
        <div className="modal-dialog">
            <div className="modal-content" style={{  width: "fit-content" }} >
              <div className="modal-header">
                <h4 className="modal-title">
                  <span >Shipping</span>
                </h4>
                {itemCreated ? (
              <Alert type="success">
                <span>New shipping created.</span>
              </Alert>
            ) : null}
              </div>
              <div className="modal-body">

                  <div className={loginStyles.container}>
                    {createShippingView ? <CreateShipping invokeParent={pullDataFromShipping} />: shippingView ? <ViewShipping invokeParent={pullDataFromShippingView} item={currentShipping}/> :<ShippingList  invokeTopParent = {pullShippingListData} />}
                  </div>

              </div>
              <div className="modal-footer">
                <span>
                  <button type="button" onClick={(value) => closeModal(value="shipping")}   className="w-49 bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 border-b-4 border-red-700 hover:border-red-500 rounded">Close</button>
                  {showCreateShippingButton ? <span><button type="button" onClick={createShipping}  className="w-49 bg-green-500 hover:bg-green-400 text-white font-bold py-2 px-4 border-b-4 border-green-700 hover:border-green-500 rounded">Create Shipping</button></span> : null }
             
                </span>
              </div>
            </div>
          </div>
        </div>

        <button onClick={(value) => showModal(value="fabric")} className="w-25 bg-green-500 hover:bg-green-400 text-white font-bold py-2 px-4 border-b-4 border-green-700 hover:border-green-500 rounded">Fabric</button>
        <button onClick={(value) => showModal(value="makery")} className="w-25 bg-green-500 hover:bg-green-400 text-white font-bold py-2 px-4 border-b-4 border-green-700 hover:border-green-500 rounded">Makery</button>
        <button onClick={(value) => showModal(value="item")}  className="w-25 bg-green-500 hover:bg-green-400 text-white font-bold py-2 px-4 border-b-4 border-green-700 hover:border-green-500 rounded">Items</button>
        <button onClick={(value) => showModal(value="shipping")}  className="w-25 bg-green-500 hover:bg-green-400 text-white font-bold py-2 px-4 border-b-4 border-green-700 hover:border-green-500 rounded">Shipping</button>
        
      </section>

    </Layout>
  );
};
export default Rates;
