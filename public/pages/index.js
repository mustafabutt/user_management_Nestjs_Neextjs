import Head from 'next/head';
import Layout, { siteTitle } from '../components/layout';
import utilStyles from '../styles/utils.module.css';
import {UserList} from "../components/users/UserList";
import {useEffect,} from "react";

export async function getStaticProps(context) {

  return {
    props: {}
  };
}

const Home = ({}) => {

    useEffect(()=>{
        
    },[])

  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/css/bootstrap.min.css"
          rel="stylesheet"
          integrity="sha384-giJF6kkoqNQ00vy+HMDP7azOuL0xtbfIcaT9wjKHr8RbDVddVHyTfAAsrekwKmP1"
          crossOrigin="anonymous"
        />
        <script
          src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/js/bootstrap.bundle.min.js"
          integrity="sha384-ygbV9kiqUc6oa4msXn9868pTtWMgiQaeYH7/t7LECLbyPA2x65Kgf80OJFdroafW"
          crossOrigin="anonymous"
        ></script>
      </Head>
      <section className={utilStyles.headingMd}>
          <UserList />
      </section>
    </Layout>
  );
};

export default Home;
