import type { NextPage } from "next";
import useWallet from "../hooks/wallet";
import useBalance from "../hooks/balance";
import { formatEther } from "ethers/lib/utils";
import { useStorageAddress } from "../hooks/storage";

const Home: NextPage = () => {
  const { account, activate, deactivate } = useWallet();

  const oracleAddress = useStorageAddress("Oracle");

  const balance = useBalance(account);

  return (
    <div>
      {account && <p>Account: {account}</p>}
      {balance && <p>Balance: {formatEther(balance)}</p>}
      {!account && <button onClick={activate}>Connect</button>}
      {account && <button onClick={deactivate}>Disconnect</button>}
      {oracleAddress && <p>Oracle: {oracleAddress}</p>}
    </div>
  );
};

export default Home;
