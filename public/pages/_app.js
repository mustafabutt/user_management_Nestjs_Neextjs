
import '../styles/global.css'
import {useRouter} from "next/router";
import {useEffect} from "react";
import 'tailwindcss/tailwind.css';
import authMiddleware from './middleware';
import Footer from '@/components/Footer';
import Header from '@/components/Header'
export default function App({ Component, pageProps }) {

    const router = useRouter();
     useEffect(()=>{
        authMiddleware(router);
     },[]);

  return <>

     <div className="min-h-screen flex flex-col">
      <Header />

      <div className="flex-grow">
        <Component {...pageProps} />
      </div>
      
      <Footer />
    </div>
  </>


}
