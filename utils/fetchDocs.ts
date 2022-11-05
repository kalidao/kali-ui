import { ethers } from 'ethers'
import KALIDAO_ABI from '@abi/KaliDAO.json'
import { getProvider } from '@utils/getProvider'

export async function fetchDocs(chainId: number, dao: string) {
  if (!chainId || !dao) return

  console.log(chainId, dao)
  try {
    const provider = getProvider(chainId)
    const contract = new ethers.Contract(dao, KALIDAO_ABI, provider)
    const docs = await contract.docs()
    if (docs) return docs
    else return false
  } catch (e) {
    console.log(e)
  }
}
