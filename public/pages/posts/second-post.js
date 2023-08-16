
import Head from 'next/head'
import Layout from '../../components/layout';
import Alert from '../../components/alert';
const SecondPost = () => {
  return (
    <Layout>
      <Head>
        <title>second Post</title>
      </Head>
      <h1>Second Post</h1>

      <Alert type="success">
        <p>hello second post </p>
      </Alert>
    </Layout>
  )
}
export default SecondPost;
