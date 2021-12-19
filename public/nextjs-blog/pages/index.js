import Head from 'next/head';
import Layout, { siteTitle } from '../components/layout';
import utilStyles from '../styles/utils.module.css';
import Link from 'next/link';
import UserList from '../components/users/usserList';
import { getUsers } from '../lib/posts';
import Login from '../components/users/login';
import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export async function getStaticProps(context) {

  const data = await getUsers('');
  if (!data) {
    return {
      notFound: true,
    };
  }
  return {
    props: { data },
  };

}

const Home = ({ data }) => {
  let [showLogin, setLogin] = useState(false);
  const router = useRouter();
  const getMyUsers = useCallback(async () => {
    const res = await fetch('http://localhost:3001/users', {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
      },
    });
    const data = await res.json();
    return data;
  }, []);
  useEffect(() => {
    console.log("effect busy")
    if (typeof window !== 'undefined' && localStorage.getItem('accessToken')) {
      setLogin(true);
    }
    if (showLogin) {
      console.log('lp');
      getMyUsers().then((ressp) => {
        console.log('oefic');
        console.log(ressp);
        if (ressp.statusCode == 401) {
          localStorage.clear();
          router.reload();
        }
      });
    }
  });

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
        {showLogin ? <UserList userdata={data}> </UserList> : <Login></Login>}
      </section>
    </Layout>
  );
};

export default Home;
