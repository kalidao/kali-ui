// import { ethers, Signer } from 'ethers'
// import { unixToDate } from '@utils/time'
// import { erc20ABI } from 'wagmi'
// import { getProvider } from '@utils/getProvider'

// // FIXME:
// export async function decodeSwap(payload: string, symbol: string, chainId: Signer) {
//   const decoded = ethers.utils.defaultAbiCoder.decode(extensionsHelper['crowdsale2']['types'], payload)

//   if (decoded) {
//     let values = []
//     let assetSymbol
//     let decimals

// // Sale Type
// if (decoded[0].toString() == '0')
//   values.push({
//     label: 'Sale Type',
//     value: 'Public',
//     display: 'saleType',
//   })
// else
//   values.push({
//     label: 'Sale Type',
//     value: 'Private',
//     display: 'saleType',
//   })

//     // Purchase Asset
//     const asset = decoded[2]
//     let multiplier = ethers.utils.formatEther(decoded[1])

//     if (asset === ethers.constants.AddressZero) {
//       values.push({
//         label: 'Purchase Asset',
//         value: 'ETH',
//         display: 'token',
//       })

//       // Purchase Multiplier
//       multiplier = (multiplier + '').split('.').toString()
//       values.push({
//         label: 'Purchase Ratio',
//         value: `1 ETH for ${multiplier} ${symbol.toUpperCase()}`,
//         display: 'BigNumber',
//       })
//     } else {
//       try {
//         // console.log(asset, signer)
//         const provider = getProvider(chainId)
//         const instance = new ethers.Contract(asset, erc20ABI, provider)
//         assetSymbol = await instance.symbol()
//         decimals = await instance.decimals()
//       } catch (e) {
//         console.log(e)
//       }
//       values.push({
//         label: 'Purchase Asset',
//         value: asset,
//         display: 'token',
//       })

//       // Purchase Multiplier
//       values.push({
//         label: 'Purchase Ratio',
//         value: `1 ${assetSymbol.toUpperCase()} for ${
//           decimals ? (Number(multiplier[1]) * 10 ** decimals).toFixed(2) : 'N/A'
//         } ${symbol.toUpperCase()}`,
//         display: 'BigNumber',
//       })
//     }

//     // Sale Ends
//     const deadline = unixToDate(decoded[3])
//     values.push({
//       label: 'Sale Ends',
//       value: deadline,
//       display: 'date',
//     })

//     // Purchase Limit
//     const purchaseLimit = ethers.utils.formatEther(decoded[4])
//     values.push({
//       label: 'Purchase Limit',
//       value: purchaseLimit,
//       display: 'BigNumber',
//     })

//     // Personal Limit
//     const personalLimit = ethers.utils.formatEther(decoded[5])
//     values.push({
//       label: 'Personal Limit',
//       value: personalLimit,
//       display: 'BigNumber',
//     })

//     // Details
//     values.push({
//       label: 'Details',
//       value: decoded[6],
//       display: 'string',
//     })

//     console.log(values, decimals)

//     return { values, decimals }
//   }
// }

// const extensionsHelper = {
//   crowdsale2: {
//     labels: [
//       'Sale Type',
//       'Purchase Multiplier',
//       'Purchase Asset',
//       'Sale Ends',
//       'Purchase Limit',
//       'Personal Limit',
//       'Details',
//     ],
//     types: ['uint256', 'uint256', 'address', 'uint32', 'uint96', 'uint96', 'string'],
//     display: ['saleType', 'BigNumber', 'token', 'date', 'BigNumber', 'BigNumber', 'string'],
//   },
//   redemption: {
//     labels: ['Redeemable Tokens', 'Starts From'],
//     types: ['address[]', 'uint256'],
//     display: ['array', 'date'],
//   },
// }
