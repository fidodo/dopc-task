import React from 'react';
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
    <Head>
      <title>Ayokunle&apos;s delivery order price calculate</title>
      <meta name="description" content="This is the default description for My Website." />
    </Head>
    
  <Component {...pageProps} />
  </>
  );
}
