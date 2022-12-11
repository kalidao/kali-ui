import { ethers } from 'ethers'
import DAO_ABI from '@abi/DAO'
import { getProvider } from '@utils/getProvider'

export async function fetchProposalCount(chainId: number, dao: string) {
  if (!chainId || !dao) return
  try {
    const provider = getProvider(chainId)
    const contract = new ethers.Contract(dao, DAO_ABI, provider)
    const count = await contract.proposalCount()

    return count
  } catch (e) {
    console.log(e)
  }
}
