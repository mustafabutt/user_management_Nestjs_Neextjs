import loginStyles from '../../styles/login.module.css';
import React, {useCallback, useEffect, useState} from 'react';
import Head from 'next/head';
import dynamic from 'next/dynamic'
const Alert = dynamic(()=> import('../../components/alert'));
const Layout = dynamic(()=> import("../../components/layout"));
import utilStyles from '../../styles/utils.module.css';
import $ from 'jquery';
import {UserList} from "../../components/users/UserList";
import {UserService} from "../../services";
import { CreateUser } from '../../components/general/createUser';
import { ViewUser } from '../../components/general/viewUser';
import {useRouter} from "next/router";

const Admin = () => {

  const [createUserView, setCreateUserView] = useState(null);
  const [userCreated, setUserCreated] = useState(null);
  const [userView, setUserView] = useState(null);
  const [currentEmail, setCurrentEmail] = useState(null);
  const [showCreateUserButton, setShowCreateUserButton] = useState(true);
  const router = useRouter();
debugger
  useEffect(()=>{
 
    if(!UserService().isAdmin())
      router.push("/");
  },[])

  const closeModal = () => {
    if(!createUserView && !userView)
      $('#myModal').hide();
    setCreateUserView(false);
    setUserView(false);
    setShowCreateUserButton(true);
  };
  const showUsersModal = () => {
    $('#myModal').show()
  }
  function createUser(e) {
    e.preventDefault();
    createUserView ? setCreateUserView(false):setCreateUserView(true);
    setShowCreateUserButton(false);
  }
  function pullData(){
    setCreateUserView(false);
    setUserCreated(true);
    setTimeout(()=>{
      setUserCreated(false);
    },3000);
    setShowCreateUserButton(true);
  }

  function pullListData(user){

    setCurrentEmail(user);
    setShowCreateUserButton(false);
    setUserView(true);
  }

  function pullDataFromView(){
    setTimeout(()=>{
      setUserView(false);
    },2000)
    setShowCreateUserButton(true);
  }

  return (
    <Layout admin>
      <Head>
        <title>Admin Dashboard</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <h3>Admin Dashboard</h3>
        
        <div className="modal modal-backdrop" id="myModal" role="dialog" style={{overflow:"auto"}}>
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
                    {createUserView ? <CreateUser invokeParent={pullData} />: userView ? <ViewUser invokeParent={pullDataFromView} email={currentEmail}/> :<UserList invokeTopParent = {pullListData} />}
                  </div>

              </div>
              <div className="modal-footer">
                <span>
                  <button type="button" onClick={closeModal} className="btn btn-danger">Close</button>
                  {showCreateUserButton ? <span><button type="button" onClick={createUser}  className="btn btn-success">Create user</button></span> : null }
             
                </span>
              </div>
            </div>
          </div>
        </div>

        <button onClick={showUsersModal} className={loginStyles.buttonClass}>
              Users
            </button>
        
      </section>

    </Layout>
  );
};
export default Admin;
