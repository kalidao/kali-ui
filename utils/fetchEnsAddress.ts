import { ethers } from 'ethers'
import { getProvider } from './getProvider'

// fetch from mainnet
export async function fetchEnsAddress(ensName: string) {
  if (!ensName) return
  try {
    const provider = getProvider(1)
    console.log('minting ensName', ensName)
    const address = await provider.resolveName(ensName)
    console.log('minting address', address)
    if (address && ethers.utils.isAddress(address)) return address
    else return `Invalid address - ${ensName}`
  } catch (e) {
    console.log(`fetchEnsAddress ${ensName}`, e)
    return 'Error'
  }
}
