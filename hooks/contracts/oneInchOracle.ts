import { useState } from "react";
import { providers, utils, Contract } from "ethers";
import useAsyncEffect from "use-async-effect";
import { useStorageAddress } from "../storage";
// this will be changed to the real contract when its available
import OneInchOracle from "../../contracts/OneInchMock.json";

const useOneInchOracle = (provider: providers.Web3Provider | undefined) => {
  const [contract, setContract] = useState<Contract | undefined>(undefined);

  // this will be changed to the real contract when its available
  // const oneInchOracleAddress = useStorageAddress("OneInchOracle");
  // testnet address that isn't in storage for some reason
  const oneInchOracleAddress = "0x085E3a930E34D15E96b50e1E98FF77A9241B822e";

  useAsyncEffect(() => {
    if (!provider || !oneInchOracleAddress) return;
    const i = new utils.Interface(OneInchOracle.abi);
    const c = new Contract(oneInchOracleAddress, i, provider.getSigner());
    setContract(c);
  }, [provider, oneInchOracleAddress]);

  return contract;
};

export default useOneInchOracle;
