import { storageAddress } from "../constants/fuji";
import Storage from "../contracts/Storage.json";
import { useCall } from "@usedapp/core";
import { Contract, utils } from "ethers";
import { Falsy } from "../types";

const encodeKey = (key: string) => {
  return utils.keccak256(
    utils.defaultAbiCoder.encode(
      ["string", "string"],
      ["contract.address", key]
    )
  );
};

export const useStorageAddress = (contractKey: string | Falsy) => {
  const contractInterface = new utils.Interface(Storage.abi);
  const { value, error } =
    useCall(
      contractKey && {
        contract: new Contract(storageAddress, contractInterface),
        method: "getAddress",
        args: [encodeKey(contractKey)],
      }
    ) ?? {};

  if (error) {
    console.error(error);
    return undefined;
  }

  return value?.[0];
};
