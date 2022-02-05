export const supportedChains = [
  {
    chainId: 4,
    hexChain: '0x4',
    name: "rinkeby",
    infura: "rinkeby.infura.io",
    nativeCurrency: {
      name: 'Rinkeby Ether',
      symbol: 'rETH',
      decimals: 18
    },
    rpcUrls: ['https://rinkeby-light.eth.linkpool.io'],
    blockExplorerUrls: ['https://rinkeby.etherscan.io']
  },
  {
    chainId: 1,
    hexChain: '0x1',
    name: "mainnet (Soon)",
    infura: "mainnet.infura.io",
    nativeCurrency: {
      name: 'Ether',
      symbol: 'ETH',
      decimals: 18
    },
    rpcUrls: ['https://main-light.eth.linkpool.io'],
    blockExplorerUrls: ['https://etherscan.io']
  },
  {
    chainId: 42161,
    hexChain: '0xa4b1',
    name: "arbitrum",
    infura: "arbitrum-mainnet.infura.io",
    nativeCurrency: {
      name: "Arbitrum Ether",
      symbol: "AETH",
      decimals: 18
    },
    rpcUrls: ['https://arb1.arbitrum.io/rpc'],
    blockExplorerUrls: ['https://arbiscan.io']
  }
]
