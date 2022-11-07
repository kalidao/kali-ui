import { ethers } from 'ethers'
import { getProvider } from './getProvider'

// fetch from mainnet
export async function fetchEnsAddress(ensName: string) {
  if (!ensName) return
  let address
  try {
    const provider = getProvider(1)
    address = await provider.resolveName(String(ensName))
    if (address && ethers.utils.isAddress(address)) return address
    else return `Invalid address - ${ensName}`
  } catch (e) {
    console.log(`fetchEnsAddress ${ensName}`, e)
    return 'Error'
  }
}
