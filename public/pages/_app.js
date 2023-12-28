
import '../styles/global.css'
import {useRouter} from "next/router";
import {useEffect} from "react";
import 'tailwindcss/tailwind.css';
import authMiddleware from './middleware';

export default function App({ Component, pageProps }) {

    const router = useRouter();
     useEffect(()=>{
        authMiddleware(router);
     },[]);

  return <Component {...pageProps} />

}
