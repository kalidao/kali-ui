import { ethers } from 'ethers'
import { KALIDAO_ABI } from '@abi/KaliDAO'
import { getProvider } from '@utils/getProvider'

export async function fetchProposal(chainId: number, dao: string, id: number) {
  if (!chainId || !dao || !id) return
  try {
    const provider = getProvider(chainId)
    const contract = new ethers.Contract(dao, KALIDAO_ABI, provider)
    const proposal = await contract.proposals(id)

    return proposal
  } catch (e) {
    console.log(e)
  }
}
