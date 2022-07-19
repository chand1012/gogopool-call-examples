import { ethers } from "ethers";
import { BinTools } from "avalanche";
import ms from "ms";

const bintools = BinTools.getInstance();

// Take 0xF29Bce5F34a74301eB0dE716d5194E4a4aEA5d7A and return NodeID-P7oB2McjBGgW2NXXWVYjV8JEDFoW9xDE5
const nodeIDToHex = (pk: string) => {
  if (!pk.startsWith("NodeID-")) {
    throw new Error("Error: nodeID must start with 'NodeID-'");
  }
  const pksplit = pk.split("-");
  const buff = bintools.cb58Decode(pksplit[pksplit.length - 1]);
  return ethers.utils.getAddress(ethers.utils.hexlify(buff));
};

const randomBytes = (
  seed: string,
  lower: number,
  upper: number | undefined = undefined
) => {
  if (!upper) {
    upper = lower;
  }

  if (upper === 0 && upper === lower) {
    return new Uint8Array(0);
  }

  let result = ethers.utils.arrayify(
    ethers.utils.keccak256(ethers.utils.toUtf8Bytes(seed))
  );
  while (result.length < upper) {
    result = ethers.utils.concat([result, ethers.utils.keccak256(result)]);
  }

  const top = ethers.utils.arrayify(ethers.utils.keccak256(result));
  const percent = ((top[0] << 16) | (top[1] << 8) | top[2]) / 0x01000000;

  return result.slice(0, lower + Math.floor((upper - lower) * percent));
};

const emptyWallet = (seed: string) => {
  const pk = randomBytes(seed, 32);
  const w = new ethers.Wallet(pk);
  return w;
};

// Actual nodeID or random addresses to use for nodeIDs
export const nodeID = (seed: string) => {
  if (seed.startsWith("NodeID-")) {
    return nodeIDToHex(seed);
  } else if (seed.startsWith("0x")) {
    return ethers.utils.getAddress(seed);
  } else {
    return emptyWallet(seed).address;
  }
};

export const parseDelta = (delta: string) => {
  const deltaInSeconds = Number.isNaN(Number(delta))
    ? ms(delta) / 1000
    : Number(delta);
  if (!Number.isInteger(deltaInSeconds))
    throw new Error("cannot be called with a non integer value");
  if (deltaInSeconds < 0)
    throw new Error("cannot be called with a negative value");
  return deltaInSeconds;
};

export const randomHexString = (
  seed: string,
  lower: number,
  upper: number | undefined = undefined
) => {
  return ethers.utils.hexlify(randomBytes(seed, lower, upper));
};

// ANR fails lots of txs with gaslimit estimation errors, so override here
export const overrides = {
  gasLimit: 8000000,
};
