import { ethers } from 'ethers'
import KALIDAO_ABI from '../abi/KaliDAO.json'

export async function fetchProposalCount(chainId, daoAddress) {
  if (!chainId || !daoAddress) return

  console.log(chainId, daoAddress)
  try {
    const provider = new ethers.providers.InfuraProvider(parseInt(chainId), process.env.NEXT_PUBLIC_INFURA_ID)
    const contract = new ethers.Contract(daoAddress, KALIDAO_ABI, provider);
    let count = await contract.proposalCount()
    count = ethers.utils.formatUnits(count, 0)
    if (count) return count
    else return undefined
  } catch (e) {
    console.log(e);
  }
}