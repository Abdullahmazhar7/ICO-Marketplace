import Head from "next/head";
import toast, { Toaster } from "react-hot-toast";
import "../styles/globals.css";

// INTERNAL IMPORT 
import { StateContextProvider } from "../Context";
import Web3ModalProvider from "../Context/indexW3";

export default function App({ Component, pageProps }) {
  return (
    <>
    <Web3ModalProvider>
      <StateContextProvider>
        <Component {...pageProps} />
        <Toaster />
      </StateContextProvider>
      </Web3ModalProvider>
      
    </>
  );
}











