import "../styles/globals.css";
import type { AppProps } from "next/app";
import { multicallAddress } from "../constants/fuji";

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
