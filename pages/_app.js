import React from "react";
import Head from "next/head";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link
          rel="stylesheet"
          href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css"
          integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk"
          crossOrigin="anonymous"
        />
        <style>
          {/* Adds keyboard navigation focus state for each state image in map */}
          {`
            .rsm-geographies path:focus {
              fill: #274745;
              outline: none;
            }
          `}
        </style>
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
