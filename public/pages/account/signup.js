import dynamic from 'next/dynamic'
const Alert = dynamic(()=> import('../../components/alert'));
import loginStyles from '../../styles/login.module.css';
import React, {useEffect, useRef, useState} from 'react';
import { useRouter } from 'next/router';
import {UserService} from "../../services";
import Head from 'next/head';
const Layout = dynamic(()=> import("../../components/account/Layout"));
import utilStyles from '../../styles/utils.module.css';
import $ from 'jquery';
import Link from 'next/link';

const Signup = () => {

  const router = useRouter();
  const email = useRef(null);
  const password = useRef(null);
  let userGender = '';
  const [userExists, setUserExists] = useState(null);

  const focusHandler = () => {
    setUserExists(false);
  };
  async function hitSignup(e) {
    e.preventDefault();
    const res = await UserService().signUp({
      email: email.current.value,
      password: password.current.value,
      gender: userGender,
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
    <Layout signUp>
      <Head>
        <title>Sign up</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <div className="modal modal-backdrop" id="myModal" role="dialog">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h4 className="modal-title">
                  <span className={utilStyles.modalHadingColor}>Success</span>
                </h4>
              </div>
              <div className="modal-body">Signed up successfully</div>
              <div className="modal-footer">
                <Link href="/account/login">
                  <button type="button" className="btn btn-success">
                    <span>Sign in</span>
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <form onSubmit={hitSignup} className={loginStyles.formClass}>
          <div className={loginStyles.imgcontainer}>
            <img
              src="/images/user.png"
              alt="Avatar"
              className={loginStyles.avatarClass}
            />
          </div>

          <div className={loginStyles.container}>
            <label htmlFor="uname">
              <b>Email Address</b>
            </label>
            <input
              ref={email}
              minLength="5"
              className={loginStyles.inputClass}
              type="text"
              placeholder="Enter email"
              name="uname"
              onFocus={focusHandler}
              required
            />
            {userExists ? (
              <Alert type="error">
                <span>user already exists</span>
              </Alert>
            ) : null}
            <label htmlFor="psw">
              <b>Password</b>
            </label>
            <input
              ref={password}
              minLength="5"
              className={loginStyles.inputClass}
              type="password"
              placeholder="Enter Password"
              name="psw"
              onFocus={focusHandler}
              required
            />
            
            <div className="radio-buttons">
              <b>Male</b>{' '}
              <input
                required
                onFocus={focusHandler}
                id="male"
                value="male"
                name="gender"
                type="radio"
                onChange={handleChange}
              />{' '}
              <b>Female</b>{' '}
              <input
                required
                onFocus={focusHandler}
                id="female"
                value="female"
                name="gender"
                type="radio"
                onChange={handleChange}
              />
            </div>
            <button className={loginStyles.buttonClass} type='submit'>
              Sign up
            </button>
            <Link href="/account/login"><button className={loginStyles.buttonClass} type='submit'>
              Back
            </button></Link>
          </div>
        </form>
      </section>

    </Layout>
  );
};
export default Signup;
