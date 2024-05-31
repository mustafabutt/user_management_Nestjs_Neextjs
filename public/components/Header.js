import { UserService } from "@/services/user.service";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image'

import { FaBars, FaTimes } from "react-icons/fa";
import SideBar from "./SideBar";
import eventBus from "./eventBus";
import { signOut,getSession } from "next-auth/react"

const Header = () => {

  const [nav, setNav] = useState(false);
  let [showLogout, setLogout] = useState(false);
  const [breadcrumbs, setBreadcrumbs] = useState();
  const [avatar, setAvatar] = useState(null);
  const router = useRouter();

  const userProfile  = async () => {
    router.push("/profile");
  }
  
  const adminDashboard  = async () => {
    router.push("/dashboard");
  }
  const goHome  = async () => {
    router.push("/");
  }
  const logout  = async () => {
    
    UserService().callLogout(UserService().getAccessToken())
    .then(async ()=>{
      if(await getSession())
        signOut();
        else {
        router.push("/login");
        setAvatar(null);
        setLogout(false);
        }
      
    });

  }

  useEffect(async ()=>{
    if (UserService().isUserLoggedIn())
    {
      setAvatar(await UserService().getAvatar()); 
      setLogout(true);
    }else  {
      setAvatar(null);
      setLogout(false);
    }
    eventBus.subscribe(async (event) => {
      if (event.data == 'Profile picture is changed') {
        setAvatar(await UserService().getAvatar()); 
      }
    });


    const pathWithoutQuery = router.asPath.split("?")[0];
    let pathArray = pathWithoutQuery.split("/");
    pathArray.shift();

    pathArray = pathArray.filter((path) => path !== "");

  },[router.asPath]);


  return (
<>  <div className="flex justify-between items-center w-full h-20 px-4 text-white bg-black fixed nav">
  <div>
    <h1 className="text-5xl font-signature ml-2">
      <a
        className="link-underline link-underline-black"
        href=""
        target="_blank"
        rel="noreferrer"
      >
        {avatar?<Image
          src={`data:image/jpeg;base64, ${avatar}`}
          alt=""
          width={80}
          height={80}
        />:null}
        
      </a>
    </h1>
  </div>


    {showLogout ?
      <ul className="hidden md:flex" >
        <li onClick={logout} className="nav-links px-4 cursor-pointer capitalize font-medium text-gray-500 hover:scale-105 hover:text-white duration-200 ">
          Logout
        </li>
        <li  onClick={userProfile} className="nav-links px-4 cursor-pointer capitalize font-medium text-gray-500 hover:scale-105 hover:text-white duration-200 ">
          Profile
        </li>
        <li onClick={goHome}  className=" nav-links px-4 cursor-pointer capitalize font-medium text-gray-500 hover:scale-105 hover:text-white duration-200 ">
          Home
        </li>
        {UserService().isAdmin()?<li onClick={adminDashboard} className=" nav-links px-4 cursor-pointer capitalize font-medium text-gray-500 hover:scale-105 hover:text-white duration-200 ">
          Admin
        </li>:null}
    </ul>
    :null}


  <div
    onClick={() => setNav(!nav)}
    className="cursor-pointer pr-4 z-10 text-gray-500 md:hidden"
  >
    {nav ? <FaTimes size={30} /> : <FaBars size={30} />}
  </div>

  {showLogout && nav && (
    <ul className="flex flex-col justify-center items-center absolute top-0 left-0 w-full h-screen bg-gradient-to-b from-black to-gray-800 text-gray-500">
        <li onClick={logout} className="nav-links px-4 cursor-pointer capitalize font-medium text-gray-500 hover:scale-105 hover:text-white duration-200 ">
          Logout
        </li>
        <li onClick={userProfile} className="nav-links px-4 cursor-pointer capitalize font-medium text-gray-500 hover:scale-105 hover:text-white duration-200 ">
          Profile
        </li>
        <li className=" nav-links px-4 cursor-pointer capitalize font-medium text-gray-500 hover:scale-105 hover:text-white duration-200 ">
          <p className="hell" href="/">Home</p>
        </li>
    </ul>
  )}
</div>
{showLogout ? <SideBar /> : null}
</>


  );
};

export default Header;
