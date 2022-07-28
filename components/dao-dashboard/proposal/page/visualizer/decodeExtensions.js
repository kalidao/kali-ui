import { ethers } from 'ethers'
import CROWDSALE_ABI from '../../../../../abi/KaliDAOcrowdsaleV2.json'
import REDEMPTION_ABI from '../../../../../abi/KaliDAOredemption.json'
import TRIBUTE_ABI from '../../../../../abi/KaliDAOtribute.json'
import { addresses } from '../../../../../constants/addresses'

// TODO: issue with parsing payload for func sig
const decodeExtensions = (address, payload, chainId) => {
  console.log(
    'payload {} value {}',
    ethers.utils.hexStripZeros(payload),
    chainId,
    address,
    addresses[chainId]['extensions'],
  )
  const extensions = addresses[chainId]['extensions']
  for (const key in extensions) {
    if (address.toLowerCase() == extensions[key].toLowerCase()) {
      console.log(`${key}: ${extensions[key]}`)
      try {
        const iface = new ethers.utils.Interface(extensionsABI[key])
        const tx = iface.parseTransaction({ data: payload, value: ethers.utils.parseEther('0') })
        if (tx) return { type: key, tx: tx }
      } catch (e) {
        console.error(e)
      }
    }
  }
}

const extensionsABI = {
  crowdsale2: CROWDSALE_ABI,
  tribute: TRIBUTE_ABI,
  redemption: REDEMPTION_ABI,
}

export default decodeExtensions
