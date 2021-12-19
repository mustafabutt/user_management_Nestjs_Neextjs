import Head from 'next/head';
import styles from './layout.module.css';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { callLogout } from '../lib/user';

const name = 'Mustafa!';
export const siteTitle = 'Next.js Sample Website';

const Layout = ({ children, home }) => {
  let [showLogout, setLogout] = useState(false);

  const router = useRouter();
  console.log('layout called');
  async function logout() {
    await callLogout(localStorage.getItem('accessToken'));
    localStorage.clear();
    router.reload();
  }
  useEffect(() => {
    if (typeof window !== 'undefined' && localStorage.getItem('accessToken')) {
      setLogout(true);
    }
  });

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
