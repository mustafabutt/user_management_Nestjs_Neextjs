import Alert from '../../components/alert';
import loginStyles from '../../styles/login.module.css';
import React, {useEffect, useRef, useState} from 'react';
import { useRouter } from 'next/router';
import {UserService} from "../../services";
import Head from 'next/head';
import Layout from "../../components/layout";
import utilStyles from '../../styles/utils.module.css';
import $ from 'jquery';
import Link from 'next/link';

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
    const res = await UserService().signup({
      email: email.current.value,
      password: password.current.value,
    });

    res.status == 201 ? $('#myModal').show() : null;
    
    res.status == 303 ? setUserExists(true) : null;
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
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/css/bootstrap.min.css"
          rel="stylesheet"
          integrity="sha384-giJF6kkoqNQ00vy+HMDP7azOuL0xtbfIcaT9wjKHr8RbDVddVHyTfAAsrekwKmP1"
          crossOrigin="anonymous"
        />
        <script
          src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/js/bootstrap.bundle.min.js"
          integrity="sha384-ygbV9kiqUc6oa4msXn9868pTtWMgiQaeYH7/t7LECLbyPA2x65Kgf80OJFdroafW"
          crossOrigin="anonymous"
        ></script>
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
                  </div>

              </div>
              <div className="modal-footer">
                <span>
                  <button type="button" onClick={closeModal} className="btn btn-danger">Close</button>
                  <span> </span><button type="button" onClick={changePassword}  className="btn btn-success">Save</button>
                </span>
              </div>
            </div>
          </div>
        </div>
 
          <div className={loginStyles.imgcontainer}>
            <img
              src="/images/user.png"
              alt="Avatar"
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
