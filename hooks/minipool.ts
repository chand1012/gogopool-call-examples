import { useEffect, useState } from "react";
import { BigNumber, providers } from "ethers";
import useMinipoolManagerContract from "./contracts/minipoolManager";
import useTokenGGPContract from "./contracts/tokenGGP";
import { overrides } from "../utils";

export interface UseCreateMinipool {
  createMinipool: (
    nodeID: string,
    duration: BigNumber,
    delegationFee: BigNumber,
    ggpBondAmt: BigNumber,
    depositAmount: BigNumber
  ) => Promise<void>;
  approve: (address: string, ggpBondAmt: BigNumber) => Promise<void>;
  error?: string | undefined;
  response?: any;
  approveResponse?: any;
  success?: boolean;
}

const useCreateMinipool = (
  provider: providers.Web3Provider | undefined
): UseCreateMinipool => {
  const contract = useMinipoolManagerContract(provider);
  const token = useTokenGGPContract(provider);
  const [error, setError] = useState<string | undefined>(undefined);
  const [response, setResponse] = useState<any>(undefined);
  const [approveResponse, setApproveResponse] = useState<any>(undefined);
  const [success, setSuccess] = useState<boolean>(false);
  const [approveSuccess, setApproveSuccess] = useState<boolean>(false);

  const approve = async (address: string, ggpBondAmt: BigNumber) => {
    if (!token) return;
    if (!provider) {
      setError("Please install MetaMask");
      return;
    }
    if (!address) {
      setError("Please enter a valid address");
      return;
    }

    try {
      const tx = await token.approve(address, ggpBondAmt);
      const resp = await tx.wait();
      setApproveResponse(resp);
    } catch (e) {
      setError(e as string);
    }
  };

  useEffect(() => {
    if (approveResponse?.status === 1) {
      setApproveSuccess(true);
    }
  }, [approveResponse]);

  const createMinipool = async (
    nodeID: string,
    duration: BigNumber,
    delegationFee: BigNumber,
    ggpBondAmt: BigNumber,
    depositAmount: BigNumber
  ) => {
    if (!contract) return;
    if (!provider) {
      setError("Please install MetaMask");
      return;
    }
    if (!nodeID) {
      setError("Please enter a valid node ID");
      return;
    }
    if (!duration) {
      setError("Please enter a valid duration");
      return;
    }
    if (!delegationFee) {
      setError("Please enter a valid delegation fee");
      return;
    }
    if (!ggpBondAmt) {
      setError("Please enter a valid GGP bond amount");
      return;
    }

    if (!approveSuccess) {
      setError("Please approve GGP bond amount");
      return;
    }

    try {
      console.log("This is a test transaction.");
      const testTx = await contract.callStatic.createMinipool(
        nodeID,
        duration,
        delegationFee,
        ggpBondAmt,
        {
          ...overrides,
          value: depositAmount,
        }
      );
      console.log(testTx);
      // console.log("This is a test wait.");
      // const testResp = await testTx.wait();
      // console.log(testResp);

      console.log("This is a real transaction.");
      const tx = await contract.createMinipool(
        nodeID,
        duration,
        delegationFee,
        ggpBondAmt,
        {
          ...overrides,
          value: depositAmount,
        }
      );
      console.log("This is a real wait.");
      const resp = await tx.wait();
      setResponse(resp);
    } catch (e) {
      setError(e as string);
      console.error(e);
    }
  };

  useEffect(() => {
    if (response?.status === 1) {
      setSuccess(true);
    }
  }, [response]);

  return {
    createMinipool,
    approve,
    approveResponse,
    error,
    response,
    success,
  };
};

export default useCreateMinipool;
