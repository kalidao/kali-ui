import { BigNumber } from 'ethers'
import { ethers } from 'ethers'
export const getSwapRate = (tokenDecimal: number, purchaseMultiplier: any) => {
  if (purchaseMultiplier === 0) return
  const amountOut = BigNumber.from(10).pow(18)
  const amountIn = amountOut.div(purchaseMultiplier)

  return ethers.utils.formatUnits(amountIn.toString(), tokenDecimal)
}
