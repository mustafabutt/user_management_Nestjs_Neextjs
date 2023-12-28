import Head from 'next/head';
import styles from './layout.module.css';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import {UserService} from "../services/user.service";
import Breadcrumb from './BreadCrumbs';
import BreadcrumbItem from "./BreadcrumbItem"

export const siteTitle = 'Next.js Sample Website';

const Layout = ({ children, home }) => {
  let [showLogout, setLogout] = useState(false);
  const [breadcrumbs, setBreadcrumbs] = useState();
  const router = useRouter();

  const logout  = async () => {
      let user = JSON.parse(localStorage.getItem('user'));
      let response = await UserService().callLogout(UserService().getAccessToken());
      if(response.status !== 201){
      }else router.push("/login");
  }

  const userProfile  = async () => {
    router.push("/profile");
  }
  const adminDashboard  = async () => {
    router.push("/dashboard");
  }
  // useEffect(() => {
  //   if (UserService().isUserLoggedIn())
  //   {
  //     setLogout(true);
  //   }
  // },[]);

  useEffect(()=>{
    if (UserService().isUserLoggedIn())
    {
      setLogout(true);
    }
    const pathWithoutQuery = router.asPath.split("?")[0];
    let pathArray = pathWithoutQuery.split("/");
    pathArray.shift();

    pathArray = pathArray.filter((path) => path !== "");

    const breadcrumbs = pathArray.map((path, index) => {
      const href = "/" + pathArray.slice(0, index + 1).join("/");
      return {
        href,
        label: path.charAt(0).toUpperCase() + path.slice(1),
      };
    });

    setBreadcrumbs(breadcrumbs);
 },[router.asPath]);


  return (
    <div>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content="Mustafa practice" />
        <meta name="og:title" content={siteTitle} />
      </Head>
      <header className="flex justify-center">
        {showLogout ? <span>
          <button type="button" className="w-49 bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 border-b-4 border-red-700 hover:border-red-500 rounded" onClick={logout}>Log out</button>
          <button type="button" className="w-49 bg-green-500 hover:bg-green-400 text-white font-bold py-2 px-4 border-b-4 border-green-700 hover:border-green-500 rounded" onClick={userProfile}>User profile</button>
          {UserService().isAdmin()? <button type="button" className ="w-49 bg-yellow-500 hover:bg-yellow-400 text-white font-bold py-2 px-4 border-b-4 border-yellow-700 hover:border-yellow-500 rounded" onClick={adminDashboard}>Admin Dashboard</button>:null }
            </span>: null}
 
      </header>

      <main>

      <Breadcrumb>
        <BreadcrumbItem href="/">Home</BreadcrumbItem>
        {breadcrumbs &&
          breadcrumbs.map((breadcrumb) => (
            <BreadcrumbItem key={breadcrumb.href} href={breadcrumb.href}>
              {breadcrumb.label}
            </BreadcrumbItem>
          ))}
      </Breadcrumb>
        {children}</main>

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
