import '../styles/globals.scss'
import 'bootstrap/dist/css/bootstrap.min.css'
import Head from 'next/head'
import {AppProps} from 'next/app';
import {wrapper} from '../store';
import React from 'react'

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
          <Component {...pageProps} />
  )
}

export default  wrapper.withRedux(MyApp);
