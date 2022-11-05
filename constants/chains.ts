import { Chain } from 'wagmi'

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
