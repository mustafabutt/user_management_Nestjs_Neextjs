import dynamic from 'next/dynamic'
const Alert = dynamic(()=> import('@/components/alert'));
import loginStyles from '@/styles/login.module.css';
import React, {useEffect, useRef, useState} from 'react';
import {UserService} from "@/services/user.service";
import Head from 'next/head';
const Layout = dynamic(()=> import("@/components/layout"));
import utilStyles from '@/styles/utils.module.css';
import $ from 'jquery';
import Image from 'next/image'
import {FileUploader} from "@/components/FileUploader"

const Profile = () => {

  const password = useRef(null);
  const re_password = useRef(null);
  const [notMatch, setNotMatch] = useState(null);
  const [passwordUpdate, setPasswordUpdate] = useState(null);

  const closeModal = () => {
    $('#myModal').hide();
  };
  const showPassChange = () => {
    $('#myModal').show()
  }
  const closeProfileModal = () => {
    $('#profilePicModal').hide();
  };
  const showProfilePicture = () => {
    $('#profilePicModal').show()
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
  
  useEffect(()=>{
    // if (typeof window !== 'undefined' && localStorage.getItem('accessToken')) {
    //   router.push('/');
    // }
  })

  return (
    <Layout profile>
      <Head>
        <title>User Profile</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <div className="modal modal-backdrop" id="myModal" role="dialog">
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
{/* profile Picture dialog */}
        <div className="modal modal-backdrop" id="profilePicModal" role="dialog">
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
 
          <div className={loginStyles.imgcontainer}>
            <Image
              src={"/images/user.png"}
              alt="Avatar"
              width={200}
              height={200}
              className={loginStyles.avatarclassName}
            />
          </div>
    

          <div className="flex flex-row justify-between">
            
            <button className="w-49 bg-green-500 hover:bg-green-400 text-white font-bold py-2 px-4 border-b-4 border-green-700 hover:border-green-500 rounded" onClick={showPassChange} type='button'>Change Password</button>
            <button className="w-49 bg-green-500 hover:bg-green-400 text-white font-bold py-2 px-4 border-b-4 border-green-700 hover:border-green-500 rounded" onClick={showProfilePicture} type='button'>Update Profile Picture </button>
           
          </div>

      </section>

    </Layout>
  );
};
export default Profile;
