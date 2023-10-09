import dynamic from 'next/dynamic'
const Alert = dynamic(()=> import('../../components/alert'));
import loginStyles from '../../styles/login.module.css';
import React, {useEffect, useRef, useState} from 'react';
import { useRouter } from 'next/router';
import {UserService} from "../../services/user.service";
import Head from 'next/head';
const Layout = dynamic(()=> import("../../components/layout"));
import utilStyles from '../../styles/utils.module.css';
import $ from 'jquery';
import Image from 'next/image'

const Profile = () => {

  const router = useRouter();
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
  
  async function uploadPicture(e) {
    e.preventDefault();
    // const res = await UserService().signup({
    //   email: email.current.value,
    //   password: password.current.value,
    // });

    // res.status == 201 ? $('#myModal').show() : null;
    
    // res.status == 303 ? setUserExists(true) : null;
  }
  useEffect(()=>{
    // if (typeof window !== 'undefined' && localStorage.getItem('accessToken')) {
    //   router.push('/');
    // }
  })

  const handleChange = (e) => {
    const { value } = e.target;
    userGender = value;
  };

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
                  <form onSubmit={changePassword}  className={loginStyles.formClass}>
                    <input
                        ref={password}
                        className={loginStyles.inputClass}
                        type="password"
                        placeholder="Enter new password"
                        name="psw"
                        onFocus={focusHandler}
                        required
                    />

                   
                    <input
                        ref={re_password}
                        className={loginStyles.inputClass}
                        type="password"
                        placeholder="Re-enter new assword"
                        name="re-psw"
                        onFocus={focusHandler}
                        required
                    />
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
                       <span> </span><button type="submit"  className="btn btn-success">Save</button>
                       </form>

                  </div>

              </div>
              <div className="modal-footer">
                <span>
                  <button type="button" onClick={closeModal} className="btn btn-danger">Close</button>
                 
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
              className={loginStyles.avatarClass}
            />
          </div>

          <div className={loginStyles.container}>
            
            <button className={loginStyles.buttonClass} onClick={showPassChange} type='button'>Change Password</button>
            <button className={loginStyles.buttonClass} onClick={uploadPicture} type='button'>Update Profile Picture</button>
            
           
          </div>

      </section>

    </Layout>
  );
};
export default Profile;
