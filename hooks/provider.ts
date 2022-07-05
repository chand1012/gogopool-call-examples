import { useState, useEffect } from "react";
import { providers } from "ethers";

export const useProvider = () => {
  const [provider, setProvider] = useState<providers.Web3Provider | undefined>(
    undefined
  );

  useEffect(() => {
    // @ts-ignore
    if (window.ethereum) {
      // @ts-ignore
      setProvider(new providers.Web3Provider(window.ethereum));
    }
  }, []);

  return provider;
};

export default useProvider;
