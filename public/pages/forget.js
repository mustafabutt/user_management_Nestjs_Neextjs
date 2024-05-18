import React, {useRef, useState} from 'react';
import { useRouter } from 'next/router';
import {UserService} from "@/services/user.service";
import Head from 'next/head';
import dynamic from 'next/dynamic'
const Alert = dynamic(()=> import('@/components/alert'));
const Layout = dynamic(()=> import("@/components/account/Layout"));

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
    res.status == 409 ? setUserExists(true) : null;
    res.status == 401 ? setTokenExpired(true) : null;
  }



  return (
    <Layout>
      <Head>
        <title>Candlik - Password Reset</title>
      </Head>
      <section className="bg-gray-50 dark:bg-gray-900">
          <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
              
              <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                  <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                      <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                          Forget Password
                      </h1>
                      <form className="space-y-4 md:space-y-6" onSubmit={HitForget}>
                          <div>
                              <label for="email" ref={email} onFocus={focusHandler} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                              <input type="email" onFocus={focusHandler} ref={email} name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required />
                              <a  href="/login" className="text-sm float-end font-medium text-primary-600 hover:no-underline dark:text-primary-500">Return to login</a>
                          
                          </div>
                         
                          <button type="submit" className="w-full bg-black rounded-lg p-2 mt-3 text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Send code</button>
                          
                      </form>
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
                  </div>
              </div>
          </div>
        </section>

    </Layout>
  );
};
export default Forget;
