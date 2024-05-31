import dynamic from 'next/dynamic'
const Alert = dynamic(()=> import('@/components/alert'));
import loginStyles from '@/styles/login.module.css';
import React, {useEffect, useRef, useState} from 'react';
import {UserService} from "@/services/user.service";
import Head from 'next/head';
const Layout = dynamic(()=> import("@/components/layout"));
import Image from 'next/image'
import {FileUploader} from "@/components/FileUploader"
import { useSession } from "next-auth/react"
import eventBus from '@/components/eventBus';

const Profile = () => {
  const [avatar, setAvatar] = useState(null);
  const password = useRef(null);
  const re_password = useRef(null);
  const [notMatch, setNotMatch] = useState(null);
  const [passwordUpdate, setPasswordUpdate] = useState(null);
  const [passwordModel, setPasswordModel] = useState(false);
  const [picturedModel, setPicturedModel] = useState(false);
  const {status } = useSession();



  useEffect(async ()=>{
    if (UserService().isUserLoggedIn())
      setAvatar(await UserService().getAvatar()); 
    else  
      setAvatar(null);
    eventBus.subscribe(async (event) => {
      if (event.data == 'Profile picture is changed') {
        setAvatar(await UserService().getAvatar()); 
      }
    });
  },[]);

  function closeModal () {
    setPasswordModel(false);
  };
  function showPassChange () {
    setPasswordModel(true);
  }
  const closeProfileModal = () => {
    setPicturedModel(false);
  };
  const showProfilePicture = () => {
    setPicturedModel(true);
  }
  const focusHandler = () => {
    setNotMatch(false);
  };
  async function changePassword(e) {
    e.preventDefault();
    if(password.current.value !==  re_password.current.value){
      setNotMatch(true);
      return;
    }
     
    const res = await UserService().changePassword({
      email: JSON.parse(localStorage.getItem('user')).email,
      password: password.current.value,
    });
    res.status == 200 ? setPasswordUpdate(true) : null;
    
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
    <Layout profile>
      <Head>
        <title>Candlik - User Profile</title>
      </Head>
      <section className="bg-gray-50 dark:bg-gray-900">
        {passwordModel?
          <div className="flex items-center justify-center h-screen modal-backdrop" aria-hidden="true" role="dialog">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h4 className="modal-title">
                  <span >Update Password</span>
                </h4>
              </div>
              <div className="modal-body">

                  <div className={loginStyles.container}>
                  
                  <form onSubmit={changePassword}  className={loginStyles.formclassName}>
                    
                    <input type="password" ref={password}  onFocus={focusHandler} name="psw" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />

                    <input type="password" ref={re_password}  onFocus={focusHandler} name="re-psw" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />

                    {notMatch ? (
                        <Alert type="error">
                          <span>Password did not match.</span>
                        </Alert>
                      ) : null}
                  
                      {passwordUpdate ? (
                        <Alert type="success">
                          <span>Password is updated.</span>
                        </Alert>
                      ) : null}
                      <span> </span><button type="submit"  className="bg-green-500 hover:bg-green-400 text-white font-bold py-2 px-4 border-b-4 border-green-700 hover:border-green-500 ">Save</button>
                      </form>

                  </div>

              </div>
              <div className="modal-footer">
                <span>
                  <button type="button" onClick={closeModal} className="bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 border-b-4 border-red-700 hover:border-red-500 ">Close</button>
                
                </span>
              </div>
            </div>
          </div>
        </div>
        :null}
        
{/* profile Picture dialog */}
        {picturedModel?
                <div className="flex items-center justify-center h-screen modal-backdrop" role="dialog">
                <div className="modal-dialog">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h4 className="modal-title">
                        <span >Update Profile Picture</span>
                      </h4>
                    </div>
                    <div className="modal-body">
      
                        <div className={loginStyles.container}>
                        
                        <FileUploader   />
      
                        </div>
      
                    </div>
                    <div className="modal-footer">
                      <span>
                        <button type="button" onClick={closeProfileModal} className="bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 border-b-4 border-red-700 hover:border-red-500 rounded">Close</button>
                       
                      </span>
                    </div>
                  </div>
                </div>
              </div>
        :null}

 
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
    
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className={loginStyles.imgcontainer}>
            {/* <Image
              src={"/images/user.png"}
              alt="Avatar"
              width={200}
              height={200}
              className={loginStyles.avatarclassName}
            /> */}
             {avatar?<Image
              src={`data:image/jpeg;base64, ${avatar}`}
              alt=""
              width={200}
              height={200}
            />:null}
          </div>
    

            <div className="flex flex-row justify-between">
              
              <button className="w-49 bg-green-500 hover:bg-green-400 text-white font-bold py-2 px-4 border-b-4 border-green-700 hover:border-green-500 rounded" onClick={showPassChange} type='button'>Change Password</button>
              <button className="w-49 bg-green-500 hover:bg-green-400 text-white font-bold py-2 px-4 border-b-4 border-green-700 hover:border-green-500 rounded" onClick={showProfilePicture} type='button'>Update Profile Picture </button>
            
            </div>
          </div>
        </div>
          

      </section>

    </Layout>
  );
};
export default Profile;
