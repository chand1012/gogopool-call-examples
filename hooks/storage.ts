import { useAsyncEffect } from "use-async-effect";
import { storageAddress } from "../constants/fuji";
import Storage from "../contracts/Storage.json";
import { Contract, utils } from "ethers";
import useProvider from "./provider";
import { useState } from "react";

export const useStorageAddress = (
  key: string,
  storageAddr?: string
): string | undefined => {
  const [address, setAddress] = useState<string | undefined>(undefined);
  const addr = storageAddr || storageAddress;
  const provider = useProvider();
  useAsyncEffect(async () => {
    if (!provider) return;
    const contractInterface = new utils.Interface(Storage.abi);
    const contract = new Contract(addr, contractInterface, provider);
    setAddress(
      await contract.getAddress(
        utils.solidityKeccak256(["string", "string"], ["contract.address", key])
      )
    );
  }, [addr, provider, key]);

  return address;
};
