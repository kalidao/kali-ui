import { tokens } from '../constants/tokens'

export const fetchTokens = (chainId) => {
  let tokenArray = []
  for (let i in tokens[chainId]) {
    tokenArray.push(tokens[chainId][i]['address'])
  }
  return tokenArray
}
