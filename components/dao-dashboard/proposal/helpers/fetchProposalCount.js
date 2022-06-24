import { ethers } from 'ethers'
import DAO_ABI from '../../../../abi/KaliDAO.json'

export async function fetchProposalCount(chainId, dao) {
  if (!chainId || !dao) return
  try {
    const provider = new ethers.providers.InfuraProvider(Number(chainId), process.env.NEXT_PUBLIC_INFURA_ID)
    const contract = new ethers.Contract(dao, DAO_ABI, provider)
    const count = await contract.proposalCount()

    return count
  } catch (e) {
    console.log(e)
  }
}
