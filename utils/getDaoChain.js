import { ethers } from 'ethers'
import { supportedChains } from '../constants/supportedChains'

// TODO:
// Very unlikely there is non-kali contract at address from router
export async function getDaoChain(address) {
  if (address != null) {
    for (let i = 0; i < supportedChains.length; i++) {
      const chainId = supportedChains[i]['chainId']
      const provider = new ethers.providers.InfuraProvider(chainId, process.env.NEXT_PUBLIC_INFURA_ID)
      const code = await provider.getCode(address)
      const voteHash = await provider.getStorageAt(address, 128)

      if (code != '0x') {
        return chainId
      }
    }
  }

  return 'error'
}
