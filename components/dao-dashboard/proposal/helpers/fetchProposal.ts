import { ethers } from 'ethers'
import DAO_ABI from '@abi/KaliDAO.json'
import { getProvider } from '@utils/getProvider'

export async function fetchProposal(chainId: number, dao: string, id: number) {
  if (!chainId || !dao || !id) return
  try {
    const provider = getProvider(chainId)
    const contract = new ethers.Contract(dao, DAO_ABI, provider)
    const proposal = await contract.proposals(id)

    return proposal
  } catch (e) {
    console.log(e)
  }
}
