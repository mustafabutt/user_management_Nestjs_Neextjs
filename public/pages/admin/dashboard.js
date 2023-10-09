import loginStyles from '../../styles/login.module.css';
import React, {useCallback, useEffect, useState} from 'react';
import Head from 'next/head';
import dynamic from 'next/dynamic'
const Alert = dynamic(()=> import('../../components/alert'));
const Layout = dynamic(()=> import("../../components/layout"));
import utilStyles from '../../styles/utils.module.css';
import $ from 'jquery';
import {UserList} from "../../components/users/userList";
import {UserService} from "../../services/user.service";
import { CreateUser } from '../../components/users/createUser';
import { ViewUser } from '../../components/users/viewUser';
import {useRouter} from "next/router";
import Link from 'next/link';

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

    if(!UserService().isAdmin())
      router.push("/");
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
        <title>Admin Dashboard</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <h3>Admin Dashboard</h3>
        
        <div className="modal modal-backdrop" id="userModal" role="dialog" style={{overflow:"auto"}}>
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
                  <button type="button" onClick={(value) => closeModal(value="users")}  className="btn btn-danger">Close</button>
                  {showCreateUserButton ? <span><button type="button" onClick={createUser}  className="btn btn-success">Create User</button></span> : null }
             
                </span>
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
                    {createInvoiceView ? <CreateUser invokeParent={pullDataFromInvoice} />: invoiceView ? <ViewUser invokeParent={pullDataFromInvoiceView} email={currentEmail}/> :<UserList  invokeTopParent = {pullInvoiceListData} />}
                  </div>

              </div>
              <div className="modal-footer">
                <span>
                  <button type="button" onClick={(value) => closeModal(value="invoice")}   className="btn btn-danger">Close</button>
                  {showCreateInvoiceButton ? <span><button type="button" onClick={createInvoice}  className="btn btn-success">Generate Invoice</button></span> : null }
             
                </span>
              </div>
            </div>
          </div>
        </div>

        <button onClick={(value) => showUsersModal(value="users")} className={loginStyles.buttonClass}>Users</button>
        <Link href="/admin/rates"><button className={loginStyles.buttonClass}>Rates</button></Link>
        <button onClick={(value) => showUsersModal(value="invoice")}  className={loginStyles.buttonClass}>Invoice Generator</button>
        
      </section>

    </Layout>
  );
};
export default Admin;
