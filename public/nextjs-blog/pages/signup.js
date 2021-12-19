import Alert from '../components/alert';
import loginStyles from '../styles/login.module.css';
import React, { useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { signup } from '../lib/user';
import Head from 'next/head';
import Layout from '../components/layout';
import utilStyles from '../styles/utils.module.css';
import $ from 'jquery';
import Link from 'next/link';
const Signup = () => {
  const username = useRef(null);
  const password = useRef(null);
  let userGender = '';
  const [userExists, setUserExists] = useState(null);
  const focusHandler = () => {
    setUserExists(false);
  };
  async function hitSignup(e) {
    e.preventDefault();
    const res = await signup({
      username: username.current.value,
      password: password.current.value,
      gender: userGender,
    });

    console.log(res.status);
    res.status == 201 ? $('#myModal').show() : null;
    res.status == 303 ? setUserExists(true) : null;
  }
  const handleChange = (e) => {
    const { value } = e.target;
    userGender = value;
  };

  return (
    <Layout>
      <Head>
        <title>sign up</title>
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
                  <span className={utilStyles.modalHadingColor}>Success</span>
                </h4>
              </div>
              <div className="modal-body">Signed up successfully</div>
              <div className="modal-footer">
                <Link href="/">
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
            <label htmlFor="psw">
              <b>Gender</b>
            </label>
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
          </div>
        </form>
      </section>
    </Layout>
  );
};
export default Signup;
