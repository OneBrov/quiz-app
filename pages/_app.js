import '../styles/globals.scss'
import 'bootstrap/dist/css/bootstrap.min.css'
import { NavBar } from '../components/NavBar'
import { Footer } from '../components/Footer'
import Head from 'next/head'
import { Container, Row } from 'react-bootstrap'
import {wrapper} from '../store';

function MyApp({ Component, pageProps }) {
  return (
      <Row className="m-0 d-flex flex-column" style={{minHeight:"100vh"}}>
        <Head> 
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        </Head>
        <NavBar />
        <main className="bgLight flex-1 ">
          

          <Component {...pageProps} />


        </main>
        <Footer />
        <style jsx> {`
          .flex-1 {
            flex: 1;
          }
        `}</style> 
      </Row>
  )
  
}

export default  wrapper.withRedux(MyApp);
