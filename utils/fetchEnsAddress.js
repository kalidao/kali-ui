import { ethers } from 'ethers'

export async function fetchEnsAddress(ensName) {
  console.log('ensName', ensName)
  if (!ensName) return
  let address
  try {
    const provider = new ethers.providers.InfuraProvider(1, process.env.NEXT_PUBLIC_INFURA_ID)
    address = await await provider.resolveName(String(ensName))
    console.log('ensAddress', address)
    if (ethers.utils.isAddress(address)) return address
  } catch (e) {
    console.log(`fetchEnsAddress ${ensName}`, e)
    return 'Error'
  }
}
