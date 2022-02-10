import Head from 'next/head'
import Layout from '../components/layout'
import '../styles/globals.css'

// add bootstrap css 
import 'bootstrap/dist/css/bootstrap.css'
// own css files here
import "../styles/customcss.css";


function MyApp({ Component, pageProps }) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout || ((page) => page)
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Layout>
       <Component {...pageProps} />
      </Layout>
    </>
 
  )
}

export default MyApp
