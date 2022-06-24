import { ethers } from 'ethers'
import DAO_ABI from '../../../../abi/KaliDAO.json'

export async function fetchProposal(chainId, dao, id) {
  if (!chainId || !dao || !id) return
  try {
    const provider = new ethers.providers.InfuraProvider(Number(chainId), process.env.NEXT_PUBLIC_INFURA_ID)
    const contract = new ethers.Contract(dao, DAO_ABI, provider)
    const proposal = await contract.proposals(id)

    return proposal
  } catch (e) {
    console.log(e)
  }
}
