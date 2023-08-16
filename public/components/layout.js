import Head from 'next/head';
import styles from './layout.module.css';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import {UserService} from "../services";

export const siteTitle = 'Next.js Sample Website';

const Layout = ({ children, home }) => {
  let [showLogout, setLogout] = useState(false);
  const router = useRouter();

  const logout  = async () => {
      let user = JSON.parse(localStorage.getItem('user'));
      let response = await UserService().callLogout(user.access_token);
      if(response.status !== 201){
          alert("error")
      }else router.push("/account/login");
  }

  useEffect(() => {
    if (UserService().isUserLoggedIn())
    {
      setLogout(true);
    }
  },[]);

  return (
    <div className={styles.container}>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content="Mustafa practice" />
        <meta name="og:title" content={siteTitle} />
      </Head>
      <header className={styles.header}>
        {showLogout ? <button onClick={logout}>log out</button> : null}
      </header>

      <main>{children}</main>

      {!home && (
        <div>
          <Link href="/">
            <a className={styles.backToHome}>← Back to home</a>
          </Link>
        </div>
      )}
    </div>
  );
};
export default Layout;
