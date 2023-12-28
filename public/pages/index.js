import Head from 'next/head';
import Layout, { siteTitle } from '@/components/layout';
import utilStyles from '@/styles/utils.module.css';

export async function getStaticProps(context) {

  return {
    props: {}
  };
}

const Home = ({}) => {

  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        
          <b>Home page</b>
      </section>
    </Layout>
  );
};

export default Home;
