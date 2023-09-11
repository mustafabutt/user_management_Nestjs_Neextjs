import '../styles/global.css'
import {useRouter} from "next/router";
import {useEffect} from "react";
import {UserService} from "../services";

export default function App({ Component, pageProps }) {

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
            if(UserService().isAdmin)
                router.push("/admin/home")
            else
                router.push("/")
        }
    }

  return <Component {...pageProps} />

}
