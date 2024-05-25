
import React, { useEffect, useState} from 'react';
import Head from 'next/head';
import dynamic from 'next/dynamic'
const Layout = dynamic(()=> import("@/components/layout"));
import utilStyles from '@/styles/utils.module.css';
import {UserList} from "@/components/users/userList";
import { CreateUser } from '@/components/users/createUser';
import { ViewUser } from '@/components/users/viewUser';
import {useRouter} from "next/router";
import authMiddleware from './middleware';

const Admin = () => {

  const [userModel, setUserModel] = useState(null);

  const [createUserView, setCreateUserView] = useState(null);
  const [userCreated, setUserCreated] = useState(null);
  const [userView, setUserView] = useState(null);
  const [showCreateUserButton, setShowCreateUserButton] = useState(true);

  const [currentEmail, setCurrentEmail] = useState(null);

  const router = useRouter();

  useEffect(()=>{
    authMiddleware(router)
  },[])

  const closeModal = (value) => {
    if(value == "users"){
      if(!createUserView && !userView)
        setUserModel(false);
      setCreateUserView(false);
      setUserView(false);
      setShowCreateUserButton(true);
    }
  };
  const showUsersModal = (value) => {
    if(value == "users")
      setUserModel(true);
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



  return (
    <Layout admin>
      <Head>
        <title>Candlik - Admin Dashboard</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <h3>Admin Dashboard</h3>

        {userModel?
          <div aria-hidden="true" className="flex items-center justify-center h-screen modal modal-backdrop"  >
          <div className="relative overflow-auto max-h-full">
              {/* <!-- Modal content --> */}
              <div className="relative bg-white rounded-lg shadow dark:bg-gray-700" style={{  width: "fit-content" }}>
                  {/* <!-- Modal header --> */}
                  <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600" >
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                          Users
                      </h3>
                      <button  onClick={(value) => closeModal(value="users")}  type="button" className=" hover:bg-red-300 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="default-modal">
                          <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                          </svg>
                          <span className="sr-only">Close modal</span>
                      </button>
                  </div>
                  {/* <!-- Modal body --> */}
                  <div className="p-4 md:p-5 space-y-4">
                    {createUserView ? <CreateUser invokeParent={pullDataFromUser} />: userView ? <ViewUser invokeParent={pullDataFromUserView} email={currentEmail}/> :<UserList view = {"users"} invokeTopParent = {pullUSerListData} />}  
                  </div>
                  {/* <!-- Modal footer --> */}
                  <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                      {showCreateUserButton ? <span><button type="button" onClick={createUser}  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Create User</button></span> : null }
                  </div>
              </div>
          </div>
        </div>
        :null}
        


          <div className="items-center justify-center p-10 sm:ml-64 top-10 ">
            <div className="p-4">  
                <div className="grid grid-cols-2 gap-4">
                  <button onClick={(value) => showUsersModal(value="users")} className="bg-indigo-500 hover:bg-green-400 text-white font-bold py-2 px-4 border-b-4 border-green-700 hover:border-green-500 rounded">
                    <div className="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
                    <img src={"/images/user.png"}  width={50} height={50} /> 
                     <p className="text-2xl text-gray-400 dark:text-gray-500"> Users</p>
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
