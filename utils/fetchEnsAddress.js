import { ethers } from 'ethers'

export async function fetchEnsAddress(chainId, ensName) {
  if (!ensName) return
  let address
  try {
    const provider = new ethers.providers.InfuraProvider(parseInt(chainId), process.env.NEXT_PUBLIC_INFURA_ID)
    address = await provider.resolveName(String(ensName))
    if (ethers.utils.isAddress(address)) return address
    else return `Invalid address - ${ensName}`
  } catch (e) {
    console.log(`fetchEnsAddress ${ensName}`, e)
    return 'Error'
  }
}
