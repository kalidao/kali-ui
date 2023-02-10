import { ethers } from 'ethers'
import { addresses } from '@constants/addresses'
import { unixToDate } from '@utils/time'
import { fetchSymbol } from '@utils/fetchSymbol'
import { extensionsHelper } from '@constants/extensions'
import { fetchTokenDecimals } from '@utils/fetchTokenDecimals'

const decodeExtensions = async (dao: string, address: string, payload: string, chainId: number) => {
  const extensions = addresses[chainId]['extensions']

  for (const key in extensions) {
    if (address.toLowerCase() == extensions[key].toLowerCase()) {
      try {
        const decoded = ethers.utils.defaultAbiCoder.decode(extensionsHelper[key]['types'], payload)
        let tokenAddress = decoded.length > 3 ? decoded[2] : decoded
        if (decoded) {
          let values = []
          let multiplier
          let decimals
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
              console.log(extensionsHelper[key]['display'][i], decoded[i])
              multiplier = decoded[i].toString()
              decimals = await fetchTokenDecimals(chainId, tokenAddress)
              console.log(decimals)
              value = ethers.utils.formatUnits(multiplier, 18 - decimals)
            }
            if (extensionsHelper[key]['display'][i] === 'BigNumber') {
              value = ethers.utils.formatEther(value)
              // console.log(extensionsHelper[key]['display'][i], value)
            }
            if (extensionsHelper[key]['display'][i] === 'id') {
              value = Number(ethers.utils.formatEther(value)).toFixed(0).toString()
            }
            if (extensionsHelper[key]['display'][i] === 'token') {
              if (value == ethers.constants.AddressZero) {
                value = 'ETH'
              } else {
                console.log('hello', value)
                // value = await fetchSymbol(chainId, value)
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

export default decodeExtensions
