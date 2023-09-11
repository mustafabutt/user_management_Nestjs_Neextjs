import React, { useState, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic'
const Layout = dynamic(()=> import("../../components/account/Layout")) ;
import loginStyles from '../../styles/login.module.css';
import {UserService} from "../../services";
const Alert = dynamic(()=> import('../../components/alert'));
import { useRouter } from 'next/router';
import Link from "next/link";

const Login = (props) => {
  const router = useRouter();
  const email = useRef(null);
  const password = useRef(null);
  const [invalidCred, setInvalidCred] = useState(null);

  const focusHandler = () => {
    setInvalidCred(false);
  };
    const hitLogin = async (event) => {
      event.preventDefault();
      const user = {
        email: email.current.value,
        password: password.current.value,
      };
    
      const userResponse = await UserService().login(user);
      userResponse.status == 401 ? setInvalidCred(true) : router.push('/');
  }

  useEffect(()=>{
    if (typeof window !== 'undefined' && JSON.parse(localStorage.getItem('user'))) 
      router.push('/');
  })

  return (
      <Layout login>

        <div className={loginStyles.formClass}>

          <form onSubmit={hitLogin} className={loginStyles.formClass}>
            <div className={loginStyles.imgcontainer}>
              <img
                  src="/images/user.png"
                  alt="Avatar"
                  className={loginStyles.avatarClass}
              />
            </div>

            <div className={loginStyles.container}>
              <label htmlFor="uname">
                <b>Email</b>
              </label>
              <input
                  ref={email}
                  className={loginStyles.inputClass}
                  type="text"
                  placeholder="Enter email"
                  name="uname"
                  onFocus={focusHandler}
                  required
              />

              <label htmlFor="psw">
                <b>Password</b>
              </label>
              <input
                  ref={password}
                  className={loginStyles.inputClass}
                  type="password"
                  placeholder="Enter Password"
                  name="psw"
                  onFocus={focusHandler}
                  required
              />
              
              <button className={loginStyles.buttonClass} type='submit'>
                Login
              </button>
              <button className={loginStyles.signupButtonClass}>
                <Link href="/account/signup">
                  <span className={loginStyles.signupButtonClass}>Sign up</span>
                </Link>
              </button>
            </div>
          </form>
          {invalidCred ? (
              <Alert type="error">
                <span>incorrect credentials</span>
              </Alert>
          ) : null}

          <a className={loginStyles.psw} href="/account/forget">
            Forgot password?
          </a>

        </div>
      </Layout>
  );
};

export default Login;
