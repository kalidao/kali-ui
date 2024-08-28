import { ethers } from 'ethers'
import { getProvider } from '@utils/getProvider'
import { erc20Abi } from 'viem'

export async function fetchTokenDecimals(chainId: number, tokenAddress: string) {
  if (!chainId || !tokenAddress) return

  try {
    const provider = getProvider(chainId)
    const contract = new ethers.Contract(tokenAddress, erc20Abi, provider)
    const decimals = await contract.decimals()
    if (decimals) return decimals
    else return false
  } catch (e) {
    console.log(e)
  }
}
