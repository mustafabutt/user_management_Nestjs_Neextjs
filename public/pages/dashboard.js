import loginStyles from '@/styles/login.module.css';
import React, {useCallback, useEffect, useState} from 'react';
import Head from 'next/head';
import dynamic from 'next/dynamic'
const Alert = dynamic(()=> import('@/components/alert'));
const Layout = dynamic(()=> import("@/components/layout"));
import utilStyles from '@/styles/utils.module.css';
import $ from 'jquery';
import {UserList} from "@/components/users/userList";
import { CreateUser } from '@/components/users/createUser';
import { ViewUser } from '@/components/users/viewUser';
import {useRouter} from "next/router";
import Link from 'next/link';
import authMiddleware from './middleware';
import { PriceGenerator } from '@/components/PriceGenerator';

const Admin = () => {

  const [createUserView, setCreateUserView] = useState(null);
  const [userCreated, setUserCreated] = useState(null);
  const [userView, setUserView] = useState(null);
  const [showCreateUserButton, setShowCreateUserButton] = useState(true);

  const [createInvoiceView, setCreateInvoiceView] = useState(null);
  const [invoiceCreated, setInvoiceCreated] = useState(null);
  const [invoiceView, setInvoiceView] = useState(null);
  const [showCreateInvoiceButton, setShowCreateInvoiceButton] = useState(true);

  const [currentEmail, setCurrentEmail] = useState(null);

  const router = useRouter();

  useEffect(()=>{
    authMiddleware(router)
  },[])

  const closeModal = (value) => {
    if(value == "users"){
      if(!createUserView && !userView)
        $('#userModal').hide();
      setCreateUserView(false);
      setUserView(false);
      setShowCreateUserButton(true);
    } else if(value == "invoice"){
      if(!createInvoiceView && !invoiceView)
        $('#invoiceModal').hide();

        setCreateInvoiceView(false);
        setInvoiceView(false);
        setShowCreateInvoiceButton(true);
    }  
  };
  const showUsersModal = (value) => {
    if(value == "users")
      $('#userModal').show();
    else if(value == "invoice")
      $('#invoiceModal').show();
  }

  function createUser(e) {
    e.preventDefault();
    createUserView ? setCreateUserView(false) : setCreateUserView(true);
    setShowCreateUserButton(false);
  }
  function pullDataFromUser(){

    setCreateUserView(false);
    setUserCreated(true);
    setTimeout(()=>{
      setUserCreated(false);
    },3000);
    setShowCreateUserButton(true);

  }

  function pullUSerListData(user){
    setCurrentEmail(user);
    setShowCreateUserButton(false);
    setUserView(true);
  }

  function pullDataFromUserView(){
    setTimeout(()=>{
      setUserView(false);
    },2000)
    setShowCreateUserButton(true);
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
        <title>Candlik - Admin Dashboard</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <h3>Admin Dashboard</h3>
        
        {/* <div className="modal modal-backdrop" id="userModal" role="dialog" style={{overflow:"auto"}}>
          <div className="modal-dialog">
            <div className="modal-content" style={{  width: "fit-content" }} >
              <div className="modal-header">
                <h4 className="modal-title">
                  <span >Users</span>
                </h4>
                {userCreated ? (
              <Alert type="success">
                <span>New user created.</span>
              </Alert>
            ) : null}
              </div>
              <div className="modal-body">

                  <div className={loginStyles.container}>
                    {createUserView ? <CreateUser  invokeParent={pullDataFromUser} />: userView ? <ViewUser invokeParent={pullDataFromUserView} email={currentEmail}/> :<UserList view = {"users"} invokeTopParent = {pullUSerListData} />}
                  </div>

              </div>
              <div className="modal-footer">
                <span>
                  <button type="button" onClick={(value) => closeModal(value="users")}  className="w-49 bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 border-b-4 border-red-700 hover:border-red-500 rounded">Close</button>
                  {showCreateUserButton ? <span><button type="button" onClick={createUser}  className="w-49 bg-green-500 hover:bg-green-400 text-white font-bold py-2 px-4 border-b-4 border-green-700 hover:border-green-500 rounded">Create User</button></span> : null }
             
                </span>
              </div>
            </div>
          </div>
        </div> */}


        <div id="userModal"  aria-hidden="true" className=" flex items-center justify-center h-screen modal modal-backdrop" style={{display:"none"}}  >
          <div class="relative overflow-auto max-h-full">
              {/* <!-- Modal content --> */}
              <div class="relative bg-white rounded-lg shadow dark:bg-gray-700" style={{  width: "fit-content" }}>
                  {/* <!-- Modal header --> */}
                  <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                      <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                          Users
                      </h3>
                      <button className="hover:bg-red-300"  onClick={(value) => closeModal(value="users")}  type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="default-modal">
                          <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                          </svg>
                          <span class="sr-only">Close modal</span>
                      </button>
                  </div>
                  {/* <!-- Modal body --> */}
                  <div class="p-4 md:p-5 space-y-4" >
                    {createUserView ? <CreateUser  invokeParent={pullDataFromUser} />: userView ? <ViewUser invokeParent={pullDataFromUserView} email={currentEmail}/> :<UserList view = {"users"} invokeTopParent = {pullUSerListData} />}  
                  </div>
                  {/* <!-- Modal footer --> */}
                  <div class="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                      {showCreateUserButton ? <span><button type="button" onClick={createUser}  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Create User</button></span> : null }
                  </div>
              </div>
          </div>
        </div>


        <div className="modal modal-backdrop" id="invoiceModal" role="dialog" style={{overflow:"auto"}}>
          <div className="modal-dialog">
              <div className="modal-content" style={{  width: "fit-content" }} >
                <div className="modal-header">
                  <h4 className="modal-title">
                    <span >Invoice</span>
                  </h4>
                  {invoiceCreated ? (
                <Alert type="success">
                  <span>New user created.</span>
                </Alert>
              ) : null}
                </div>
                <div className="modal-body">

                  <div className={loginStyles.container}>
                    <PriceGenerator />
                  </div>

                </div>
                <div className="modal-footer">
                  <span>
                    <button type="button" onClick={(value) => closeModal(value="invoice")} className="w-49 bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 border-b-4 border-red-700 hover:border-red-500 rounded">Close</button>
                    {showCreateInvoiceButton ? <span><button type="button" onClick={createInvoice}  className="w-49 bg-green-500 hover:bg-green-400 text-white font-bold py-2 px-4 border-b-4 border-green-700 hover:border-green-500 rounded">Generate Invoice</button></span> : null }
              
                  </span>
                </div>
              </div>
            </div>
          </div>
          
            {/* <div className="grid grid-cols-2 items-center px-80 md:h-screen">
        
              <button onClick={(value) => showUsersModal(value="users")} className="hover:bg-indigo-400 hover:border-indigo-500 w-50 h-25 bg-green-500 hover:bg-green-400 text-white font-bold py-2 px-4 border-b-4 border-green-700 hover:border-green-500 rounded">Users</button>
              <Link href="/rates"><button className="hover:bg-indigo-400 hover:border-indigo-500 w-50 h-25 bg-green-500 hover:bg-green-400 text-white font-bold py-2 px-4 border-b-4 border-green-700 hover:border-green-500 rounded">Rates</button></Link>
              
          </div> */}

          <div class="items-center justify-center p-10 sm:ml-64 top-10 ">
            <div class="p-4">  
                <div class="grid grid-cols-2 gap-4">
                  <button onClick={(value) => showUsersModal(value="users")} className="bg-indigo-500 hover:bg-green-400 text-white font-bold py-2 px-4 border-b-4 border-green-700 hover:border-green-500 rounded">
                    <div class="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
                    <img src={"/images/user.png"}  width={50} height={50} /> 
                     <p class="text-2xl text-gray-400 dark:text-gray-500"> Users</p>
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
