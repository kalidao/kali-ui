import { ethers } from 'ethers'

export async function getTransaction(chainId, hash) {
  const provider = new ethers.providers.InfuraProvider(chainId, process.env.NEXT_PUBLIC_INFURA_ID)
  const transaction = await provider.getTransaction(hash)

  return transaction
}
