import { ethers } from 'ethers'
import { erc721ABI } from 'wagmi'
import { getProvider } from '@utils/getProvider'

export async function isHolder(chainId: number, tokenContract: string, tokenId: number, owner: string) {
  if (!chainId || !tokenContract || !owner) return

  try {
    const provider = getProvider(chainId)
    const contract = new ethers.Contract(tokenContract, erc721ABI, provider)
    const holder = await contract.ownerOf(tokenId)

    if (holder === owner) return true
    else return false
  } catch (e) {
    console.log(e)
  }
}
