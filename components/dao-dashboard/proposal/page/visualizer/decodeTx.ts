import { ethers } from 'ethers'
import { erc20ABI, erc721ABI } from 'wagmi'

const decodeTx = (payload: string, value: string) => {
  if (payload) {
    if (payload == '0x' || payload == ethers.constants.HashZero) {
      return 'none'
    } else {
      for (let i = 0; i < contracts.length; i++) {
        try {
          const iface = new ethers.utils.Interface(contracts[i]['abi'])
          const tx = iface.parseTransaction({ data: payload, value: ethers.utils.parseEther(value) })

          if (tx) return { type: contracts[i]['type'], tx: tx }
        } catch (e) {
          console.error(e)
        }
      }
    }
  }
}

const contracts = [
  { type: 'ERC20', abi: erc20ABI },
  { type: 'ERC721', abi: erc721ABI },
]

export default decodeTx
