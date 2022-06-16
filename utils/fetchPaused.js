import { ethers } from 'ethers'
import KALIERC20_ABI from '../abi/KaliERC20.json'

export async function fetchPaused(chainId, daoAddress) {
  if (!chainId || !daoAddress) return

  console.log(chainId, daoAddress)
  try {
    const provider = new ethers.providers.InfuraProvider(parseInt(chainId), process.env.NEXT_PUBLIC_INFURA_ID)
    const contract = new ethers.Contract(daoAddress, KALIERC20_ABI, provider)
    const paused = await contract.paused()

    if (paused) return paused
    else return undefined
  } catch (e) {
    console.log(e)
  }
}
