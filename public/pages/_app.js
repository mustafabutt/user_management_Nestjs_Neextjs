
import '../styles/global.css'
import {useRouter} from "next/router";
import {useEffect} from "react";
import 'tailwindcss/tailwind.css';
import authMiddleware from './middleware';
import Footer from '@/components/Footer';
import Header from '@/components/Header'
import { SessionProvider } from "next-auth/react";

export default function App({ Component, pageProps }) {

    const router = useRouter();
     useEffect(()=>{
        authMiddleware(router);
     },[]);

  return <>

     <div className="flex flex-col h-screen justify-between">
      <SessionProvider session={pageProps.session}>
        <Header />
          <Component {...pageProps} />
        <Footer />
      </SessionProvider>
    </div>
  </>


}
