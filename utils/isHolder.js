import { BigNumber, ethers } from 'ethers'
import { erc721ABI } from 'wagmi'

export async function isHolder(chainId, contract, owner) {
  if (!chainId || !contract || !owner) return

  try {
    const provider = new ethers.providers.InfuraProvider(1, process.env.NEXT_PUBLIC_INFURA_ID)
    const contract = new ethers.Contract(contract, erc721ABI, provider);
    const isHolder = await contract.balanceOf(owner)
    
    console.log('isHolder', isHolder.isZero())
    if (!isHolder.isZero()) return true  
    else return false
  } catch (e) {
    console.log(e);
  }
  
}