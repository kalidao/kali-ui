import { ethers } from 'ethers'
import { KALIDAO_ABI } from '@abi/KaliDAO'
import { getProvider } from '@utils/getProvider'

export async function fetchProposalCount(chainId: number, dao: string) {
  if (!chainId || !dao) return
  try {
    const provider = getProvider(chainId)
    const contract = new ethers.Contract(dao, KALIDAO_ABI, provider)
    const count = await contract.proposalCount()

    return count
  } catch (e) {
    console.log(e)
  }
}
