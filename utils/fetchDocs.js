import { ethers } from 'ethers'
import KALIDAO_ABI from '../abi/KaliDAO.json'

export async function fetchDocs(chainId, daoAddress) {
  if (!chainId || !daoAddress) return

  console.log(chainId, daoAddress)
  try {
    const provider = new ethers.providers.InfuraProvider(parseInt(chainId), process.env.NEXT_PUBLIC_INFURA_ID)
    const contract = new ethers.Contract(daoAddress, KALIDAO_ABI, provider);
    const docs = await contract.docs()

    if (docs) return docs
    else return false
  } catch (e) {
    console.log(e);
  }
}