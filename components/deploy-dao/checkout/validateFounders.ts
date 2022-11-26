import { ethers } from 'ethers'

export const validateFounders = (founders: { member: string; share: string }[]) => {
  let voters = []
  let shares = []

  for (let i = 0; i < founders.length; i++) {
    voters.push(founders[i]['member'])
    shares.push(ethers.utils.parseEther(founders[i]['share']))
  }

  return { voters, shares }
}
