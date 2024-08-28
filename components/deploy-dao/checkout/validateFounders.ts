import { Address, parseEther } from 'viem'

export const validateFounders = (founders: { member: string; share: string }[]) => {
  let voters: Address[] = []
  let shares: bigint[] = []

  for (let i = 0; i < founders.length; i++) {
    voters.push(founders[i]['member'] as Address)
    shares.push(parseEther(founders[i]['share']))
  }

  return { voters, shares }
}
