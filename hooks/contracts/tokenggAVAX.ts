import { useState, useEffect } from "react";
import { providers, utils, Contract } from "ethers";
import { useStorageAddress } from "../storage";
import TokenggAVAX from "../../contracts/TokenggAVAX.json";

const useTokenContract = (provider: providers.Web3Provider | undefined) => {
  const [contract, setContract] = useState<Contract | undefined>(undefined);

  const tokenContractAddress = useStorageAddress("TokenggAVAX");

  useEffect(() => {
    if (!provider || !tokenContractAddress) return;
    const i = new utils.Interface(TokenggAVAX.abi);
    const c = new Contract(tokenContractAddress, i, provider.getSigner());
    setContract(c);
  }, [provider, tokenContractAddress]);

  return contract;
};

export default useTokenContract;
