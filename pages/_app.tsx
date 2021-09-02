import "../styles/globals.css";
import "react-toastify/dist/ReactToastify.css";

import type { AppProps } from "next/app";
import React from "react";
import Headers from "next/head";

function MyApp({ Component, pageProps }: AppProps) {
  const handleLog = () => {
    console.log("test", window.OmiseCard);
    window.OmiseCard.configure({
      publicKey: "pkey_test_5p0iwr7cmlx3rzzlzjw",
      currency: "thb",
      frameLabel: "MERCIL",
      submitLabel: "PAY NOW",
      buttonLabel: "Pay with Omise",
    });
  };

  return (
    <div>
      <Headers>
        <script src="https://cdn.omise.co/omise.js" onLoad={handleLog}></script>
      </Headers>
      <Component {...pageProps} />
    </div>
  );
}
export default MyApp;
