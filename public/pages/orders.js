import loginStyles from '@/styles/login.module.css';
import React, {useCallback, useEffect, useState} from 'react';
import Head from 'next/head';
import dynamic from 'next/dynamic'
const Alert = dynamic(()=> import('@/components/alert'));
const Layout = dynamic(()=> import("@/components/layout"));
import utilStyles from '@/styles/utils.module.css';
import $ from 'jquery';
import {ClientsList} from "@/components/order-management/clients/clientList";
import { CreateClient } from '@/components/order-management/clients/createClient';
import { ViewClient } from '@/components/order-management/clients/viewClient';
import {useRouter} from "next/router";
import authMiddleware from './middleware';
import { OrderList } from '@/components/order-management/orders/orderList';
import {CreateOrder} from "@/components/order-management/orders/createOrder"

const Admin = () => {

  const [createClientView, setCreateClientView] = useState(null);
  const [clientCreated, setClientCreated] = useState(null);
  const [clientView, setClientView] = useState(null);
  const [showCreateClientButton, setShowCreateClientButton] = useState(true);

  const [createOrderView, setCreateOrderView] = useState(null);
  const [orderCreated, setOrderCreated] = useState(null);
  const [orderView, setOrderView] = useState(null);
  const [showCreateOrdereButton, setShowCreateOrderButton] = useState(true);

  const [currentClientEmail, setCurrentClientEmail] = useState(null);

  const router = useRouter();

  useEffect(()=>{
    authMiddleware(router)
  },[])

  const closeModal = (value) => {
    if(value == "clients"){
      if(!createClientView && !clientView)
        $('#clientsModal').hide();
      setCreateClientView(false);
      setClientView(false);
      setShowCreateClientButton(true);
    } else if(value == "orders"){
      debugger
      if(!createOrderView && !orderView)
        $('#orderModal').hide();

        setCreateOrderView(false);
        setOrderView(false);
        setShowCreateOrderButton(true);
    }  
  };
  const showModal = (value) => {
    if(value == "clients")
      $('#clientsModal').show();
    else if(value == "orders")
      $('#orderModal').show();
  }

  function createClient(e) {
    e.preventDefault();
    createClientView ? setCreateClientView(false) : setCreateClientView(true);
    setShowCreateClientButton(false);
  }

  function createOrder(e) {
    e.preventDefault();
    createOrderView ? setCreateOrderView(false) : setCreateOrderView(true);
    setShowCreateOrderButton(false);
  }

  function pullDataFromClient(){

    setCreateClientView(false);
    setClientCreated(true);
    setTimeout(()=>{
      setClientCreated(false);
    },3000);
    setShowCreateClientButton(true);

  }
  function pullDataFromOrder(){
    setCreateOrderView(false);
    setOrderCreated(true);
    setTimeout(()=>{
      setOrderCreated(false);
    },3000);
    setShowCreateOrderButton(true);
  }

  function pullClientListData(client_id){
  
    setCurrentClientEmail(client_id);
    setShowCreateClientButton(false);
    setClientView(true);
  }

  function pullDataFromClientView(){
    setTimeout(()=>{
      setClientView(false);
    },2000)
    setShowCreateClientButton(true);
  }
  
  function createInvoice(e) {
    e.preventDefault();
    createRateView ? setCreateInvoiceView(false) : setCreateInvoiceView(true);
    setShowCreateInvoiceButton(false);
  }
  function pullDataFromInvoice(){

    setCreateInvoiceView(false);
    setInvoiceCreated(true);
    setTimeout(()=>{
      setInvoiceCreated(false);
    },3000);
    setShowCreateInvoiceButton(true);

  }

  function pullInvoiceListData(user){
    setCurrentEmail(user);
    setShowCreateInvoiceButton(false);
    setInvoiceView(true);
  }

  function pullDataFromInvoiceView(){
    setTimeout(()=>{
      setInvoiceView(false);
    },2000)
    setShowCreateInvoiceButton(true);
  }


  return (
    <Layout admin>
      <Head>
        <title>Candlik - Order Management</title>
      </Head>
      <section className={utilStyles.headingMd}>

        <div id="clientsModal"  aria-hidden="true" className=" flex items-center justify-center h-screen modal modal-backdrop" style={{display:"none"}}  >
          <div class="relative overflow-auto max-h-full">
              {/* <!-- Modal content --> */}
              <div class="relative bg-white rounded-lg shadow dark:bg-gray-700" style={{  width: "fit-content" }}>
                  {/* <!-- Modal header --> */}
                  <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                      <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                          Clients
                      </h3>
                      {clientCreated ? (
                        <Alert type="success">
                          <span>New client created.</span>
                        </Alert>
                      ) : null}
                      <button className="hover:bg-red-300"  onClick={(value) => closeModal(value="clients")}  type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="default-modal">
                          <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                          </svg>
                          <span class="sr-only">Close modal</span>
                      </button>
                  </div>
                  {/* <!-- Modal body --> */}
                  <div class="p-4 md:p-5 space-y-4" >
                    {createClientView ? <CreateClient  invokeParent={pullDataFromClient} />: clientView ? <ViewClient email={currentClientEmail}  invokeParent={pullDataFromClientView}/> :<ClientsList view = {"clients"} invokeTopParent = {pullClientListData} />}  
                  </div>
                  {/* <!-- Modal footer --> */}
                  <div class="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                      {showCreateClientButton ? <span><button type="button" onClick={createClient}  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add new</button></span> : null }
                  </div>
              </div>
          </div>
        </div>


        <div id="orderModal" aria-hidden="true" className=" flex items-center justify-center h-screen modal modal-backdrop" style={{display:"none"}}  >
          <div class="relative overflow-auto max-h-full">
              {/* <!-- Modal content --> */}
              <div class="relative bg-white rounded-lg shadow dark:bg-gray-700" style={{  width: "fit-content" }}>
                  {/* <!-- Modal header --> */}
                  <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                      <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                          Orders
                      </h3>
                      {clientCreated ? (
                        <Alert type="success">
                          <span>New order created.</span>
                        </Alert>
                      ) : null}
                      <button className="hover:bg-red-300"  onClick={(value) => closeModal(value="orders")}  type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="default-modal">
                          <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                          </svg>
                          <span class="sr-only">Close modal</span>
                      </button>
                  </div>
                  {/* <!-- Modal body --> */}
                  <div class="p-4 md:p-5 space-y-4" >
                    {createOrderView ? <CreateOrder  invokeParent={pullDataFromOrder} />: clientView ? <ViewClient email={currentClientEmail}  invokeParent={pullDataFromClientView}/> :<OrderList parent = {"orders"} invokeTopParent = {pullClientListData} />}  
                  </div>
                  {/* <!-- Modal footer --> */}
                  <div class="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                      {showCreateOrdereButton ? <span><button type="button" onClick={createOrder}  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add new</button></span> : null }
                  </div>
              </div>
          </div>
        </div>
          
   
          <div class="items-center justify-center p-20 sm:ml-64 top-10 ">
            <div class="p-4">  
                <div class="grid grid-cols-2 gap-4">
                  <button onClick={(value) => showModal(value="clients")} className="bg-indigo-500 hover:bg-green-400 text-white font-bold py-2 px-4 border-b-4 border-green-700 hover:border-green-500 rounded">
                    <div class="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
                    <img src={"/images/clients.png"}  width={50} height={50} /> 
                     <p class="text-2xl text-gray-400 dark:text-gray-500">Clients</p>
                    </div>
                  </button>

                  <button onClick={(value) => showModal(value="orders")} className="bg-indigo-500 hover:bg-green-400 text-white font-bold py-2 px-4 border-b-4 border-green-700 hover:border-green-500 rounded">
                    <div class="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
                    <img src={"/images/money.png"}  width={50} height={50} /> 
                     <p class="text-2xl text-gray-400 dark:text-gray-500">Orders</p>
                    </div>
                  </button>
                </div>
            </div>
          </div>
        
      </section>

    </Layout>
  );
};
export default Admin;
