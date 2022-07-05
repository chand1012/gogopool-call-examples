import useProvider from "./provider";
import { useState } from "react";
import useAsyncEffect from "use-async-effect";
import { utils } from "ethers";

export interface UseWallet {
  account: string | undefined;
  activate: () => Promise<void>;
  deactivate: () => Promise<void>;
  chainId: number | undefined;
  chainName: string | undefined;
  error?: string | undefined;
}

const useWallet = (): UseWallet => {
  const provider = useProvider();

  const [account, setAccount] = useState<string | undefined>(undefined);
  const [chainId, setChainId] = useState<number | undefined>(undefined);
  const [chainName, setChainName] = useState<string | undefined>(undefined);

  useAsyncEffect(async () => {
    if (!account || !utils.isAddress(account)) return;
    if (!provider) return;
    const network = await provider.getNetwork();
    network?.chainId && setChainId(network.chainId);
    network?.name && setChainName(network.name);
  });

  const activate = async () => {
    if (!provider) {
      alert("Please install MetaMask");
      return;
    }
    if (account) return;
    const accounts = await provider.send("eth_requestAccounts", []);
    if (accounts.length > 0) {
      setAccount(accounts[0]);
    }
  };

  const deactivate = async () => {
    if (!provider) return;
    if (!account) return;

    setAccount(undefined);
  };

  if (!provider) return {} as UseWallet;

  return {
    account,
    activate,
    deactivate,
    chainId,
    chainName,
  };
};

export default useWallet;
