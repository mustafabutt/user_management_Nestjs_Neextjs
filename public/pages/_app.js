import '../styles/global.css'
import {useRouter} from "next/router";
import {useEffect} from "react";
import {UserService} from "../services/user.service";

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
            if(UserService().isAdmin){
                if(publicPaths.includes("/admin/dashboard"))
                    router.push("/admin/dashboard");
                if(publicPaths.includes("/admin/dashboard"))
                    router.push("/admin/rates");
            }
               
            else
                router.push("/")
        }
    }

  return <Component {...pageProps} />

}
