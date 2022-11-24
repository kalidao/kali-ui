import { Chain } from 'wagmi'
import ALL_CHAINS from './chains.json'

interface Icon {
  iconUrl: string
}

export const xdai: Chain & Icon = {
  id: 100,
  name: 'Gnosis Chain',
  network: 'Gnosis Chain',
  nativeCurrency: {
    decimals: 18,
    name: 'xDai',
    symbol: 'xDai',
  },
  rpcUrls: {
    default: 'https://rpc.gnosischain.com',
  },
  blockExplorers: {
    default: { name: 'Blockscout', url: 'https://blockscout.com/xdai/mainnet' },
  },
  testnet: false,
  iconUrl: '/chains/xdai.png',
}

interface ChainType {
  name: string
  chain: string
  rpc: string[]
  faucets: []
  nativeCurrency: {
    name: string
    symbol: string
    decimals: number
  }
  infoURL: string
  shortName: string
  chainId: number
  networkId: number
  icon: string
  explorers: [
    {
      name: string
      url: string
      icon: string
      standard: string
    },
  ]
}

export const chains = ALL_CHAINS
