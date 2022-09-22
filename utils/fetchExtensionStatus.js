import { ethers } from 'ethers'
import KALIDAO_ABI from '../abi/KaliDAO.json'

export async function fetchExtensionStatus(chainId, daoAddress, extensionAddress) {
  if (!chainId || !daoAddress) return

  try {
    const provider = new ethers.providers.InfuraProvider(parseInt(chainId), process.env.NEXT_PUBLIC_INFURA_ID)
    const contract = new ethers.Contract(daoAddress, KALIDAO_ABI, provider)
    const status = await contract.extensions(extensionAddress)

    if (status) return status
    else return false
  } catch (e) {
    console.log(e)
  }
}
