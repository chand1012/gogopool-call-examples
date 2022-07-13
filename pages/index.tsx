import type { NextPage } from "next";
import useWallet from "../hooks/wallet";
import useBalance from "../hooks/balance";
import { formatEther } from "ethers/lib/utils";
import useDeposit from "../hooks/deposit";
import useCreateMinipool from "../hooks/minipool";
import { useEffect } from "react";
import { BigNumber } from "ethers";
import useExchangeRate from "../hooks/ggexchange";

const Home: NextPage = () => {
  const { account, activate, deactivate, provider } = useWallet();

  const balance = useBalance(account);

  const exchangeRate = useExchangeRate(provider);

  const {
    send,
    error: depositError,
    response: depositResponse,
    success: depositSuccess,
  } = useDeposit(provider);

  const {
    createMinipool,
    approve,
    error: minipoolError,
    response: minipoolResponse,
    success: minipoolSuccess,
    approveResponse: minipoolApproveResponse,
  } = useCreateMinipool(provider);

  const depositAVAX = async () => {
    const amount = 1; // placeholder. Should be read from UI. Units in AVAX.
    await send(amount);
  };

  const approveGGP = async () => {
    if (!account) return;
    const amount = 1; // placeholder. Should be read from UI. Units in AVAX.
    await approve(account, BigNumber.from(amount));
  };

  const createMinipoolGGP = async () => {
    if (!account) return;
    const amount = BigNumber.from(1);
    // This is a placeholder. I have to talk to John about
    // how to properly format the Avalanche Node IDs as an
    // eth address - Chandler.
    const nodeID = "0x0000000000000000000000000000000000000000";
    // These are also placeholder values. They should be read from
    // the UI.
    const duration = BigNumber.from(60 * 60 * 24 * 7);
    const delegationFee = BigNumber.from(2000);
    await createMinipool(nodeID, duration, delegationFee, amount, amount);
  };

  useEffect(() => {
    if (depositResponse) {
      console.log(depositResponse);
    }
    if (depositError) {
      console.log(depositError);
    }
    if (depositSuccess) {
      console.log(depositSuccess);
    }
  }, [depositError, depositResponse, depositSuccess]);

  useEffect(() => {
    if (minipoolResponse) {
      console.log(minipoolResponse);
    }
    if (minipoolError) {
      console.log(minipoolError);
    }
    if (minipoolSuccess) {
      console.log(minipoolSuccess);
    }

    if (minipoolApproveResponse) {
      console.log(minipoolApproveResponse);
    }
  }, [
    minipoolError,
    minipoolResponse,
    minipoolSuccess,
    minipoolApproveResponse,
  ]);

  return (
    <div>
      {account && <p>Account: {account}</p>} <br />
      {balance && <p>Balance: {formatEther(balance)}</p>} <br />
      {exchangeRate && <p>Exchange Rate: {formatEther(exchangeRate)}</p>} <br />
      {!account && <button onClick={activate}>Connect</button>} <br />
      {account && <button onClick={deactivate}>Disconnect</button>} <br />
      {account && <button onClick={depositAVAX}>Deposit AVAX</button>} <br />
      {account && <button onClick={approveGGP}>Approve GGP</button>} <br />
      {account && (
        <button onClick={createMinipoolGGP}>Create Minipool</button>
      )}{" "}
      <br />
    </div>
  );
};

export default Home;
