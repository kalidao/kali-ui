// functions to format data for display to user
import { scientificNotation } from '../constants/numbers'
import { supportedChains } from '../constants/supportedChains'
import { tokens } from '../constants/tokens'
import Big from 'big.js'
<<<<<<< HEAD
=======

export function convertVotingPeriod(seconds) {
  let time
  let text

  if (seconds < 3600) {
    time = seconds / 60
    if (time == 1) {
      text = 'minute'
    } else {
      text = 'minutes'
    }
  } else if (seconds < 86400) {
    time = seconds / 3600
    if (time == 1) {
      text = 'hour'
    } else {
      text = 'hours'
    }
  } else {
    time = seconds / 86400
    if (time == 1) {
      text = 'day'
    } else {
      text = 'days'
    }
  }
  return time + ' ' + text
}

export function votingPeriodToSeconds(period, type) {
  let amount
  if (type == 'min') {
    amount = period * 60
  }
  if (type == 'hour') {
    amount = period * 60 * 60
  }
  if (type == 'day') {
    amount = period * 60 * 60 * 24
  }
  return amount
}
>>>>>>> main

export function toDecimals(amount, decimals) {
  var number = ''

  let big = Big((amount * scientificNotation[decimals]).toString())
  console.log('big', big)

  // this methodology is necessary to avoid javascript autoconverting large numbers to scientific notation

  let coeff = big['c']
  var digits = big['e']
  var sign = 1
  if (digits < 1) {
    digits = digits * -1
    sign = -1
  }
  let remaining = digits - coeff.length + 1
  console.log('remaining', remaining)

  if (sign == 1) {
    for (let i = 0; i < coeff.length; i++) {
      number += coeff[i].toString()
    }
    for (let i = 0; i < remaining; i++) {
      number += '0'
    }
  } else if (sign == -1) {
    number += '0.'
    for (let i = 0; i < remaining.length; i++) {
      number += '0'
    }
    for (let i = 0; i < coeff.length; i++) {
      number += coeff[i].toString()
    }
  } else {
    alert('error')
  }

  console.log('bignum', number)
  return number // if between 0 and 1, will return 0
}

export function fromDecimals(amount, decimals) {
  var number = ''
  let numerator = Big(amount)
  let demoninator = Big(scientificNotation[decimals])

  let big = numerator.div(demoninator)
<<<<<<< HEAD
  console.log('big', big)
=======
  // console.log("big", big);
>>>>>>> main

  return big.toString() // if between 0 and 1, will return 0
}

export function unixToDate(unix) {
  var a = new Date(unix * 1000)
  var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  var year = a.getFullYear()
  var month = months[a.getMonth()]
  var date = a.getDate()
  var hour = a.getHours()
  var min = a.getMinutes()
  var sec = a.getSeconds()
  var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec
  return time
}

export function decodeBytes(type, p, web3, chainId) {
  let paramArray = {
    crowdsale: {
      decode: ['uint256', 'address', 'uint8', 'uint96', 'uint32'],
      labels: ['listId', 'purchaseToken', 'purchaseMultiplier', 'purchaseLimit', 'saleEnds'],
      types: ['uint', 'token', 'uint', 'decimals', 'date'],
    },
    redemption: {
      decode: ['address[]', 'uint256'],
      labels: ['tokenArray', 'redemptionStart'],
      types: ['token', 'date'],
    },
    tribute: {
      decode: null,
      labels: null,
      types: null,
    },
    erc20: {
      decode: ['address', 'uint256'],
      labels: ['to', 'amount'],
      types: ['address', 'decimals'],
    },
    erc721: {
      decode: ['address', 'address', 'uint256'],
      labels: ['from', 'to', 'tokenId'],
      types: ['address', 'address', 'uint256'],
    },
  }

  let array = []
  let contracts = p['accounts']
  let payloads = p['payloads']

  for (var k = 0; k < payloads.length; k++) {
    let decoded
    let decodeType
    let bytes = payloads[k]
    let bytecode
    var item = []

    if (bytes == '0x') {
      item = null
    } else {
      if (type == 9) {
        decodeType = null
        bytecode = bytes
      }
      if (type == 2) {
        if (bytes.includes('0xa9059cbb')) {
          decodeType = 'erc20'
          bytecode = '0x' + bytes.replace('0xa9059cbb', '')
        } else if (bytes.includes('0x23b872dd')) {
          decodeType = 'erc721'
          bytecode = '0x' + bytes.replace('0x23b872dd', '')
        } else {
          decodeType = null
          bytecode = bytes
        }
      }

      let params
      let labels
      let types

      if (decodeType != null) {
        params = paramArray[decodeType]['decode']
        labels = paramArray[decodeType]['labels']
        types = paramArray[decodeType]['types']
      }

      if (params != null) {
        decoded = web3.eth.abi.decodeParameters(params, bytecode)
        var i = 0
        for (const [k, v] of Object.entries(decoded)) {
          if (labels[i] != undefined) {
            var formatted = v
            if (types[i] == 'date') {
              formatted = unixToDate(v)
            }
            if (types[i] == 'decimals') {
              let token

              console.log('types', types)
              for (var j = 0; j < types.length; j++) {
                if (type == 9 && types[j] == 'token') {
                  token = decoded[j]
                  let decimals = getDecimals(token, chainId)
                  formatted = fromDecimals(parseInt(formatted), decimals)
                  console.log('decoded[i]', decoded[i])
                } else if (type == 2 && decodeType == 'erc20' && params[j] == 'uint256') {
                  token = contracts[k]
                  let decimals = getDecimals(token, chainId)
                  formatted = fromDecimals(parseInt(formatted), decimals)
                  console.log('formatted ' + [i])
                }
              }
            }
            item.push(labels[i] + ': ' + formatted)
          }
          i++
        }
      }
    }
    array.push(item)
  }
  console.log(array)
  return array
}

export function getTokenName(address, chainId) {
  let token
  if (address == '0x0000000000000000000000000000000000000000') {
    token = 'ETH'
  } else {
    for (const [key, value] of Object.entries(tokens[chainId])) {
      if (tokens[chainId][key]['address'].toLowerCase() == address.toLowerCase()) {
        token = key
      }
    }
  }
  return token
}

export function formatContract(type, p, chainId) {
  const formatted = []

  let amounts = p['amounts']
  let accounts = p['accounts']
  let payloads = p['payloads']

  for (var i = 0; i < accounts.length; i++) {
    let contract
    if (type == 2 && payloads[i] != '0x') {
      contract = getTokenName(accounts[i], chainId)
    } else {
      contract = null
    }
    formatted.push(contract)
  }
  return formatted
}

export function formatAmounts(type, p) {
  const formattedAmounts = []

  let amounts = p['amounts']
  let accounts = p['accounts']
  let payloads = p['payloads']

  for (var i = 0; i < amounts.length; i++) {
    let amount = amounts[i]
    let formattedAmount

    if (type == 0 || type == 1) {
      // mint/burn shares
      formattedAmount = fromDecimals(amount, 18)
    }
    if (type == 2) {
      // contract integration
      formattedAmount = fromDecimals(amount, 18) + ' ETH' // this will always be ETH value
    }
    if (type == 3) {
      // voting period
      formattedAmount = convertVotingPeriod(amount)
    }
    if (type == 4 || type == 5) {
      // quorum, supermajority
      formattedAmount = amount + '%'
    }
    if (type == 6) {
      // proposalVoteTypes
      formattedAmount = amount
    }
    if (type == 7) {
      // pause
      formattedAmount = amount
    }
    if (type == 8) {
      // extension
      formattedAmount = fromDecimals(amount, 18)
    }
    if (type == 9) {
      // escape
      formattedAmount = amount
    }
    if (type == 10) {
      // docs
      formattedAmount = amount
    }
    formattedAmounts.push(formattedAmount)
  }
  return formattedAmounts
<<<<<<< HEAD
=======
}

export function truncateAddress(account) {
  return account.substr(0, 5) + '...' + account.substr(account.length - 4, account.length)
>>>>>>> main
}

export function getNetworkName(chainId) {
  var networkName = 'unsupported'
  for (var i = 0; i < supportedChains.length; i++) {
    if (supportedChains[i]['chainId'] == chainId) {
      networkName = supportedChains[i]['name']
    }
  }
  return networkName
}

export function getDecimals(token, chainId) {
  let decimals
  for (const [key, value] of Object.entries(tokens[chainId])) {
    if (tokens[chainId][key]['address'].toLowerCase() == token.toLowerCase()) {
      decimals = tokens[chainId][key]['decimals']
    }
  }
  return decimals
}

export function convertRedeemables(redeemables) {
  const converted = []
  for (var i = 0; i < redeemables.length; i++) {
    for (var j = 0; j < tokens.length; j++) {
      if (tokens[j]['address'].toLowerCase() == redeemables[i].toLowerCase()) {
        converted.push(tokens[j]['token'])
      }
    }
  }
  return converted
}

export function getChainInfo(chain) {
  let chainInfo
  for (let i = 0; i < supportedChains.length; i++) {
    if (chain == supportedChains[i].chainId) {
      chainInfo = supportedChains[i]
    }
  }
  return chainInfo
}
