import { GRAPH_URL } from '../url'
import { useQuery } from '@tanstack/react-query'

export const getProposals = async (chainId: number, address: string) => {
  const dao = address.toLowerCase()
  try {
    const res = await fetch(GRAPH_URL[chainId], {
      method: 'POST',
      body: JSON.stringify({
        query: `query {
          proposals(
            first: 1000, 
            orderBy: serial, 
            orderDirection: desc
            where: {dao: "${dao}"}) {
              id
              serial
              proposer
              proposalType
              description
              sponsor
              sponsored
              cancelled
              status
              votes {
                voter
                vote
                weight
              }
              creationTime
              votingStarts
              dao {
                votingPeriod
              }
          }
          }`,
      }),
    })

    const data = await res.json()
    return data?.data?.proposals
  } catch (e) {
    return e
  }
}

export function useGetProposals(chainId: number, daoAddress: string) {
  return useQuery(['getProposals', chainId, daoAddress], async () => {
    const data = await getProposals(chainId, daoAddress)
    return data
  })
}
