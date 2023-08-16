import Alert from '../../components/alert';
import loginStyles from '../../styles/login.module.css';
import React, {useEffect, useRef, useState} from 'react';
import { useRouter } from 'next/router';
import {UserService} from "../../services";
import Head from 'next/head';
import {Layout} from "../../components/account";
import utilStyles from '../../styles/utils.module.css';
import $ from 'jquery';
import Link from 'next/link';



const Forget = () => {

  const router = useRouter();
  const email = useRef(null);
  const [userExists, setUserExists] = useState(null);
  const [tokenExpired, setTokenExpired] = useState(null);
 
  const focusHandler = () => {
    setUserExists(false);
    setTokenExpired(false);
  };

  async function HitForget(e) {
    e.preventDefault();
    var res = await UserService().SendEmail(
      email.current.value,
    );
    res.status == 201 ? $('#myModal').show() : null;
    res.status == 409 ? setUserExists(true) : null;
    res.status == 401 ? setTokenExpired(true) : null;
  }

  return (
    <Layout>
      <Head>
        <title>Password Reset</title>
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
              <div className="modal-body">Email sent!</div>
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
        <form onSubmit={HitForget} className={loginStyles.formClass}>
          <div className={loginStyles.imgcontainer}>
            <img
              src="/images/user.png"
              alt="Avatar"
              className={loginStyles.avatarClass}
            />
          </div>

          <div className={loginStyles.container}>
            <label htmlFor="email">
              <b>You will receive the password on your email address.</b>
            </label>
            <input
              ref={email}
              minLength="5"
              className={loginStyles.inputClass}
              type="email"
              placeholder="Enter email"
              name="email"
              onFocus={focusHandler}
              required
            />
            {userExists ? (
              <Alert type="error">
                <span>Email address is not registered.</span>
              </Alert>
            ) : null}
            {tokenExpired ? (
              <Alert type="error">
                <span>Code has been expired.</span>
              </Alert>
            ) : null}
           
            <button className={loginStyles.buttonClass} type='submit'>
              Send
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
export default Forget;
