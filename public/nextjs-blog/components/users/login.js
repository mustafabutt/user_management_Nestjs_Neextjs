import React, { useState, useEffect, useRef } from 'react';
import loginStyles from '../../styles/login.module.css';
import { login } from '../../lib/user';
import Alert from '../alert';
import { useRouter } from 'next/router';
import Layout from '../layout';
import Link from "next/link";

const Login = () => {
  const router = useRouter();
  const username = useRef(null);
  const password = useRef(null);
  const [invalidCred, setInvalidCred] = useState(null);
  const focusHandler = () => {
    setInvalidCred(false);
  };
  async function hitLogin() {
    const res = await login({
      username: username.current.value,
      password: password.current.value,
    });
    localStorage.setItem('accessToken', res.access_token);
    res.statusCode == 401 ? setInvalidCred(true) : router.push('/');
  }

  return (
    <div className={loginStyles.formClass}>
      <div className={loginStyles.imgcontainer}>
        <img
          src="/images/user.png"
          alt="Avatar"
          className={loginStyles.avatarClass}
        />
      </div>

      <div className={loginStyles.container}>
        <label htmlFor="uname">
          <b>Username</b>
        </label>
        <input
          ref={username}
          className={loginStyles.inputClass}
          type="text"
          placeholder="Enter Username"
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

        <button className={loginStyles.buttonClass} onClick={hitLogin}>
          Sign in
        </button>
        <button className={loginStyles.signupButtonClass}>
          <Link href="/signup">
            <span className={loginStyles.signupButtonClass}>Sign up</span>
          </Link>
        </button>
        {invalidCred ? (
          <Alert type="error">
            <span>incorrect credentials</span>
          </Alert>
        ) : null}
      </div>

      <div className={loginStyles.container}>
        <a className={loginStyles.psw} href="#">
          Forgot password?
        </a>
      </div>
    </div>
  );
};

export default Login;
