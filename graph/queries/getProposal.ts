import { GRAPH_URL } from '../url'
import { useQuery } from '@tanstack/react-query'

export const getProposal = async (chainId: number, address: string, serial: number) => {
  try {
    const res = await fetch(GRAPH_URL[chainId], {
      method: 'POST',
      body: JSON.stringify({
        query: `query {
            proposals(where: {
              dao: "${address.toLowerCase()}",
              serial: ${serial}
            }) {
                id
                dao {
                    votingPeriod
                    quorum
                    token {
                      symbol
                      totalSupply
                    }
                }
                serial
                proposer
                proposalType
                description
                sponsor
                sponsored
                cancelled
                status
                votes {
                    id
                    voter
                    vote
                    weight
                }
                creationTime
                votingStarts
                accounts
                amounts
                payloads
            }
          }`,
      }),
    })

    const data = await res.json()
    return data.data?.proposals[0]
  } catch (e) {
    return e
  }
}

export function useGetProposal(chainId: number, daoAddress: string, serial: number) {
  return useQuery(
    ['getProposal', chainId, daoAddress, serial],
    async () => {
      const data = await getProposal(chainId, daoAddress, serial)
      return data
    },
    {
      enabled: !!serial || !!chainId || !!daoAddress,
      refetchInterval: 10000,
    },
  )
}
