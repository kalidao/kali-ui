import { ethers } from 'ethers'
import { addresses } from '@constants/addresses'
import { unixToDate } from '@utils/time'
import { fetchSymbol } from '@utils/fetchSymbol'

const decodeExtensions = async (dao: string, address: string, payload: string, chainId: number) => {
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
            if (extensionsHelper[key]['display'][i] === 'swapRatio') {
              console.log('decoded[i]', decoded[i])
              let multiplier = decoded[i].toString()
              const symbol = await fetchSymbol(chainId, dao)
              value = `1 ETH for ${multiplier} ${symbol.toUpperCase()}`
            }
            if (extensionsHelper[key]['display'][i] === 'BigNumber') {
              value = ethers.utils.formatEther(value)
            }
            if (extensionsHelper[key]['display'][i] === 'id') {
              value = Number(ethers.utils.formatEther(value)).toFixed(0).toString()
            }
            if (extensionsHelper[key]['display'][i] === 'token') {
              if (value == ethers.constants.AddressZero) {
                value = 'ETH'
              }
            }
            if (extensionsHelper[key]['display'][i] === 'json' && extensionsHelper[key]['types'][i] === 'string') {
              value = JSON.parse(value)
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

interface Extension {
  label: string
  labels: string[]
  types: string[]
  display: string[]
}

const extensionsHelper: { [key: string]: Extension } = {
  crowdsale2: {
    label: 'Swap',
    labels: [
      'Sale Type',
      'Purchase Ratio',
      'Purchase Asset',
      'Sale Ends',
      'Purchase Limit',
      'Personal Limit',
      'Details',
    ],
    types: ['uint256', 'uint256', 'address', 'uint32', 'uint96', 'uint96', 'string'],
    display: ['saleType', 'swapRatio', 'token', 'date', 'BigNumber', 'BigNumber', 'link'],
  },
  redemption: {
    label: 'Redemption',
    labels: ['Redeemable Tokens', 'Starts From'],
    types: ['address[]', 'uint256'],
    display: ['array', 'date'],
  },
  projectManagement: {
    label: 'Project Management',
    labels: ['ID', 'Manager', 'Budget', 'Deadline', 'Goals'],
    types: ['uint256', 'address', 'uint256', 'uint256', 'string'],
    display: ['id', 'address', 'BigNumber', 'date', 'json'],
  },
}

export const getExtensionLabel = (type: string): string => {
  return extensionsHelper[type].label
}

export default decodeExtensions
