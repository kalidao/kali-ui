import { BigNumber, ethers } from 'ethers'
import { erc721Abi } from 'viem'
import { getProvider } from '@utils/getProvider'

export async function isHolder(chainId: number, tokenContract: string, tokenId: number, owner: string) {
  if (!chainId || !tokenContract || !owner) return

  console.log(tokenContract, tokenId, owner)
  try {
    const provider = getProvider(chainId)
    const contract = new ethers.Contract(tokenContract, erc721Abi, provider)
    const holder = await contract.ownerOf(tokenId)

    if (holder === owner) return true
    else return false
  } catch (e) {
    console.log(e)
  }
}
