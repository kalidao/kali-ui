import { ethers } from 'ethers'
import { addresses } from '../../../../../constants/addresses'
import { unixToDate } from '../../../../../utils/time'

const decodeExtensions = (address, payload, chainId) => {
  const extensions = addresses[chainId]['extensions']
  for (const key in extensions) {
    if (address.toLowerCase() == extensions[key].toLowerCase()) {
      try {
        const decoded = ethers.utils.defaultAbiCoder.decode(extensionsHelper[key]['types'], payload)
        if (decoded) {
          let values = []
          for (let i = 0; i < extensionsHelper[key]['types'].length; i++) {
            let value = decoded[i]
            if (extensionsHelper[key]['display'][i] === 'saleType') {
              if (decoded[i].toString() == '0') value = 'Public'
              else value = 'Private'
            }
            if (extensionsHelper[key]['display'][i] === 'date') {
              value = unixToDate(value)
            }
            if (extensionsHelper[key]['display'][i] === 'BigNumber') {
              value = ethers.utils.formatEther(value)
            }
            if (extensionsHelper[key]['display'][i] === 'token') {
              if (value == ethers.constants.AddressZero) {
                value = 'ETH'
              }
            }
            values.push({
              label: extensionsHelper[key]['labels'][i],
              value: value,
              display: extensionsHelper[key]['display'][i],
            })
          }
          return { type: key, values: values }
        }
      } catch (e) {
        console.error(e)
      }
    }
  }
}

const extensionsHelper = {
  crowdsale2: {
    labels: [
      'Sale Type',
      'Purchase Multiplier',
      'Purchase Asset',
      'Sale Ends',
      'Purchase Limit',
      'Personal Limit',
      'Details',
    ],
    types: ['uint256', 'uint8', 'address', 'uint32', 'uint96', 'uint96', 'string'],
    display: ['saleType', 'number', 'token', 'date', 'BigNumber', 'BigNumber', 'string'],
  },
  redemption: {
    labels: ['Redeemable Tokens', 'Starts From'],
    types: ['address[]', 'uint256'],
    display: ['array', 'date'],
  },
}

export default decodeExtensions
