import '../styles/global.css'
import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import {UserService} from "../services";

export default function App({ Component, pageProps }) {
    const [users, setUsers] = useState({});
    const [showLogin, setLogin] = useState(false);
    const router = useRouter();


     useEffect(()=>{
         checkAuth(router.asPath);
     },[]);

    const checkAuth = (url) => {
        const publicPaths = ['/account/login', '/account/signup','/account/forget'];
        const path = url.split('?')[0];
        if (!UserService().isUserLoggedIn() && !publicPaths.includes(path)) {
            router.push({
                pathname: "/account/login"
            })
        }else if(UserService().isUserLoggedIn()){
            router.push("/")
        }
    }
  return <Component {...pageProps} />

}
