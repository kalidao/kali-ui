import { ethers } from 'ethers'

export const getSwapRatio = (purchaseMultiplier: string, decimals: number) => {
  if (!purchaseMultiplier || !decimals) return
  return decimals < 18
    ? Number(ethers.utils.formatUnits(purchaseMultiplier, 18 - decimals))
    : Number(ethers.utils.formatUnits(purchaseMultiplier, 'wei'))
}
