import Head from 'next/head';
import Layout, { siteTitle } from '@/components/layout';
import utilStyles from '@/styles/utils.module.css';
import { PriceGenerator } from '@/components/PriceGenerator';

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
          <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <div className="w-full bg-white shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
              <div className="flex flex-row justify-between">
                <PriceGenerator  parent={"index"} />
              </div>
            </div>
        </div>
      </section>
    </Layout>
  );
};

export default Home;
