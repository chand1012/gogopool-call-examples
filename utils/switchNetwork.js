const networks = {
  fuji: {
    chainId: "0xa869",
    rpcUrls: ["https://api.avax-test.network/"],
    chainName: "Fuji",
    nativeCurrency: {
      name: "AVAX",
      symbol: "AVAX",
      decimals: 18,
    },
    blockExplorerUrls: ["https://testnet.snowtrace.io/"],
  },
  mainnet: {
    chainId: "0xA86A",
    rpcUrls: ["https://api.avax.network/"],
    chainName: "Mainnet",
    nativeCurrency: {
      name: "AVAX",
      symbol: "AVAX",
      decimals: 18,
    },
    blockExplorerUrls: ["https://snowtrace.io/"],
  },
};

export default function switchNetwork(network, params = undefined) {
  const p = params || networks[network];
  if (!p) {
    return undefined;
  }
  return window.ethereum.request({
    method: "wallet_addEthereumChain",
    params: [p],
  });
}
