import dynamic from 'next/dynamic'
const Alert = dynamic(()=> import('@/components/alert'));
import React, {useEffect, useRef, useState} from 'react';
import { useRouter } from 'next/router';
import {UserService} from "@/services/user.service";
import Head from 'next/head';
const Layout = dynamic(()=> import("@/components/account/Layout"));
import utilStyles from '@/styles/utils.module.css';
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

  const handleChange = (e) => {
    const { value } = e.target;
    userGender = value;
  };

  return (
    <Layout signUp>
      <Head>
        <title>Candlik - Signup</title>
      </Head>
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
                <Link href="/login">
                  <button type="button" className="bg-green-500 hover:bg-green-400 text-white font-bold py-2 px-4 border-b-4 border-green-700 hover:border-green-500 rounded">
                    <span>Sign in</span>
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      <section className="bg-gray-50 dark:bg-gray-900">
          <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
              
              <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                  <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                      <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                          Sign up
                      </h1>
                      <form className="space-y-4 md:space-y-6" onSubmit={hitSignup}>
                          <div>
                              <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                              <input type="email" onFocus={focusHandler} ref={email} name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required />
                              {userExists ? (
                                <Alert type="error">
                                  <span>user already exists</span>
                                </Alert>
                              ) : null}
                          </div>
                          <div>
                              <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                              <input type="password"  onFocus={focusHandler}  ref={password} name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                          </div>
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
                          <button type="submit" className="w-full bg-black rounded-lg p-2 mt-3 text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Sign up</button>
                          <p className="text-sm justify-center">Already registered? <a  href="/login" className="font-medium text-primary-600 hover:no-underline dark:text-primary-500">Log in</a></p>
                          
                      </form>
                      
                  </div>
              </div>
          </div>
        </section>

    </Layout>
  );
};
export default Signup;
