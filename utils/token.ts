import { erc20ABI } from 'wagmi'
import { ethers } from 'ethers'
import { getProvider } from './getProvider'

export const fetchDecimals = async (tokenAddress: string, chainId: number) => {
  try {
    const provider = getProvider(chainId)
    const contract = new ethers.Contract(tokenAddress, erc20ABI, provider)
    const decimals = await contract.decimals()
    return decimals
  } catch (e) {
    return new Error('Error fetching decimals')
  }
}
