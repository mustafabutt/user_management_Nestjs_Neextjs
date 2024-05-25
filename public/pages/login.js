import React, { useState, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic'
const Layout = dynamic(()=> import("@/components/account/Layout"));
import {UserService} from "@/services/user.service";
const Alert = dynamic(()=> import('@/components/alert'));
import { useRouter } from 'next/router';
import Head from 'next/head';
import { signIn, useSession,signOut, getSession } from 'next-auth/react';

const Login = () => {
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
      password: password.current.value
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

      <Head>
        <title>Candlik - Login</title>
      </Head>
        <section className="bg-gray-50 dark:bg-gray-900">
          <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
              
              <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                  <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                      <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                          Sign in to your account
                      </h1>
                      <form className="space-y-4 md:space-y-6" onSubmit={hitLogin}>
                          <div>
                              <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                              <input type="email" onFocus={focusHandler} ref={email} name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required />
                          </div>
                          <div>
                              <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                              <input type="password"  onFocus={focusHandler}  ref={password} name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                          </div>
                          <div className="flex items-center justify-between">
                              <div className="flex items-start">
                                  <div className="flex items-center h-5">
                                    <input id="remember" aria-describedby="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" />
                                  </div>
                                  <div className="ml-3 text-sm">
                                    <label htmlFor="remember" className="text-gray-500 dark:text-gray-300">Remember me</label>
                                  </div>
                              </div>
                              <a  href="/forget" className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Forgot password?</a>
                          </div>
                          <button type="submit" className="w-full bg-black rounded-lg p-2 mt-3 text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Sign in</button>

                          <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                              Don’t have an account yet? <a href="/signup" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign up</a>
                          </p>
                      </form>

                      {invalidCred ? (
                          <Alert type="error">
                            <span>Incorrect username or password.</span>
                          </Alert>
                        ) : null}
                  </div>
              </div>
          </div>
        </section>

      </Layout>
  );
};

export default Login;
