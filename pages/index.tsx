import type { NextPage } from "next";
import { useEthers } from "@usedapp/core";
import { useState } from "react";
import { useStorageAddress } from "../hooks/storage";

const Home: NextPage = () => {
  const { activateBrowserWallet, account, deactivate } = useEthers();

  const oracleAddress = useStorageAddress("Oracle");

  return (
    <div>
      {!account && <button onClick={activateBrowserWallet}> Connect </button>}
      {account && <button onClick={deactivate}> Disconnect </button>}
      {account && <p>Account: {account}</p>}
      {oracleAddress && <p>Oracle: {oracleAddress}</p>}
    </div>
  );
};

export default Home;
