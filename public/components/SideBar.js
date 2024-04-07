import Link from "next/link";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { UserService } from "@/services/user.service";

const SideBar = () => {

  const router = useRouter();
  let [showLogout, setLogout] = useState(false);

  useEffect(()=>{
    if (UserService().isUserLoggedIn())
    {
      setLogout(true);
    }
    const pathWithoutQuery = router.asPath.split("?")[0];
    let pathArray = pathWithoutQuery.split("/");
    pathArray.shift();

    pathArray = pathArray.filter((path) => path !== "");

  },[router.asPath]);

  return (

    <div>
      {showLogout ? <><button data-drawer-target="logo-sidebar" data-drawer-toggle="logo-sidebar" aria-controls="logo-sidebar" type="button" class="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
          <span class="sr-only">Open sidebar</span>
          <svg class="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path clip-rule="evenodd" fill-rule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
          </svg>
        </button>

        <aside id="logo-sidebar" class="fixed top-20 left-0 z-40 w-64 transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
          <div class="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
              <div class="flex items-center ps-2.5 mb-5">
              
                <span class="self-center text-xl font-semibold whitespace-nowrap dark:text-white">Candlik Clothing</span>
              </div>
              <ul class="space-y-2 font-medium">
                <li>
                    <Link href="/dashboard">
                      <div className="cursor-pointer no-style flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                        <img src={"/images/dashboard.png"}  width={25} height={25} />
                        <span class="ms-3">Dashboard</span>
                      </div>
                    </Link>
                </li>
                <li>
                    <Link href="/orders">
                      <div className="cursor-pointer no-style flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                        <img src={"/images/order.png"}  width={25} height={25} />
                        <span class="ms-3">Order Management</span>
                      </div>
                    </Link>
                </li>
                <li>
                    <Link href="/">
                      <div className="cursor-pointer no-style flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                        <img src={"/images/clients.png"}  width={25} height={25} />
                        <span class="ms-3">Price Calculator</span>
                      </div>
                    </Link>
                </li>
                <li>
                    <Link href="/rates">
                      <div className="cursor-pointer no-style flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                        <img src={"/images/rates.png"}  width={25} height={25} />
                        <span class="ms-3">Rates</span>
                      </div>
                    </Link>
                </li>
              </ul>
          </div>
        </aside></>:null }
        
    </div>
  );
};

export default SideBar;
