import "../styles/globals.css";
import type { AppProps } from "next/app";
import { DAppProvider } from "@usedapp/core";
import type { Config } from "@usedapp/core";
import { multicallAddress } from "../constants/fuji";

const config: Config = {
  // readOnlyChainId: 43113,
  multicallAddresses: {
    [43113]: multicallAddress,
  },
  // readOnlyUrls: {
  //   [43113]: "https://api.avax-test.network/ext/bc/C/rpc",
  // },
};

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <DAppProvider config={config}>
      <Component {...pageProps} />
    </DAppProvider>
  );
}

export default MyApp;
