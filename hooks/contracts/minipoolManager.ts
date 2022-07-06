import { useState } from "react";
import { providers, utils, Contract } from "ethers";
import useAsyncEffect from "use-async-effect";
import { useStorageAddress } from "../storage";
import MinipoolManager from "../../contracts/MinipoolManager.json";

const useMinipoolManagerContract = (
  provider: providers.Web3Provider | undefined
) => {
  const [contract, setContract] = useState<Contract | undefined>(undefined);

  const minipoolManagerAddress = useStorageAddress("MinipoolManager");

  useAsyncEffect(() => {
    if (!provider || !minipoolManagerAddress) return;
    const i = new utils.Interface(MinipoolManager.abi);
    const c = new Contract(minipoolManagerAddress, i, provider);
    setContract(c);
  }, [provider, minipoolManagerAddress]);

  return contract;
};

export default useMinipoolManagerContract;
