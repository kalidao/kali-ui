import { ethers } from 'ethers'
import { gnosis } from 'wagmi/chains'

export const getProvider = (chainId: number) => {
  if (chainId == gnosis.id) return new ethers.providers.JsonRpcProvider(process.env.NEXT_PUBLIC_QUICKNODE_GNOSIS)
  return new ethers.providers.InfuraProvider(chainId, process.env.NEXT_PUBLIC_INFURA_ID)
}
