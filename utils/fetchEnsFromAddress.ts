import { ethers } from 'ethers'
import { getProvider } from './getProvider'

// fetch from mainnet
export async function fetchEnsFromAddress(address: string, chainId: number) {
  if (!address) return
  try {
    const provider = getProvider(chainId)
    console.log('minting address', address)
    const ens = await provider.lookupAddress(address)
    console.log('minting address', address)
    if (ens) return ens
    else return address
  } catch (e) {
    console.log(`fetchEnsAddress ${address}`, e)
    return 'Error'
  }
}
