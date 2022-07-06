import { useState } from "react";
import { providers, utils, Contract } from "ethers";
import useAsyncEffect from "use-async-effect";
import { useStorageAddress } from "../storage";
import TokenGGP from "../../contracts/TokenGGP.json";

const useTokenGGPContract = (provider: providers.Web3Provider | undefined) => {
  const [contract, setContract] = useState<Contract | undefined>(undefined);

  const tokenContractAddress = useStorageAddress("TokenGGP");

  useAsyncEffect(() => {
    if (!provider || !tokenContractAddress) return;
    const i = new utils.Interface(TokenGGP.abi);
    const c = new Contract(tokenContractAddress, i, provider.getSigner());
    setContract(c);
  }, [provider, tokenContractAddress]);

  return contract;
};

export default useTokenGGPContract;
