import { ethers } from 'ethers'
import KALIDAO_ABI from '../abi/KaliDAO.json'
import { getProvider } from './getProvider'

export async function fetchExtensionStatus(chainId: number, dao: string, extension: string) {
  if (!chainId || !dao) return

  try {
    const provider = getProvider(chainId)
    const contract = new ethers.Contract(dao, KALIDAO_ABI, provider)
    const status = await contract.extensions(extension)

    if (status) return status
    else return false
  } catch (e) {
    console.log(e)
  }
}
