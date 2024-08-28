import { tokens } from '@constants/tokens'
import { Address } from 'viem'

export const getRedemptionTokens = (chainId: number) => {
  let tokenArray: bigint[] = []
  for (let i in tokens[chainId]) {
    if (tokens[chainId].hasOwnProperty(i)) {
      tokenArray.push(BigInt(tokens[chainId][i]['address']))
    }
  }
  return tokenArray
}
