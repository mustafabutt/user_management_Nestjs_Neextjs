import Link from 'next/link';
import Image from 'next/image';
import Head from 'next/head';
import Layout from '../../components/layout';
import Alert from '../../components/alert';
const FirstPost = () => {
  return (
    <Layout>
      <Head>
        <title>First Post</title>
      </Head>
      <h1>First Post</h1>

      <Image
        src="/images/docker.png" // Route of the image file
        height={144}
        width={144}
        alt="Mustafa"
      />
      <Alert type="error">
        <p>hello Mustafa</p>
      </Alert>
    </Layout>
  );
};
export default FirstPost;
