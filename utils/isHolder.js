import { BigNumber, ethers } from 'ethers'
import { erc721ABI } from 'wagmi'

export async function isHolder(chainId, tokenContract, tokenId, owner) {
  if (!chainId || !tokenContract || !owner) return

  console.log(tokenContract, tokenId, owner)
  try {
    const provider = new ethers.providers.InfuraProvider(1, process.env.NEXT_PUBLIC_INFURA_ID)
    const contract = new ethers.Contract(tokenContract, erc721ABI, provider);
    const holder = await contract.ownerOf(tokenId)
    
    if (holder === owner) return true
    else return false
  } catch (e) {
    console.log(e);
  }
  
}