import Head from "next/head";
import dynamic from 'next/dynamic'
const Layout = dynamic(()=> import("../components/layout"));

const Project = () => {
  return (
    <Layout Project>
    <div>
      <Head>
        <title>Dynamic Route | NextJS Breadcrumb Example</title>
        <meta
          name="description"
          content="A simple example application for a NextJS Breadcrumb tutorial"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="mx-8 md:mx-16 lg:mx-32 mt-32 text-2xl md:text-3xl lg:text-4xl">
          Breadcrumb Navigation Example with NextJS - Dynamic Route Page
        </h1>
      </main>
    </div>
    </Layout>
  );

};

export default Project;