
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
import { useSession } from "next-auth/react"
const Admin = () => {

  const { status } = useSession();

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
