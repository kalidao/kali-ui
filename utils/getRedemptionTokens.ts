import { tokens } from '@constants/tokens'

export const getRedemptionTokens = (chainId: number) => {
  let tokenArray = []
  for (let i in tokens[chainId]) {
    tokenArray.push(tokens[chainId][i]['address'])
  }
  return tokenArray
}
