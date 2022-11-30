import { GRAPH_URL } from '../url'

export const getProposal = async (chainId: number, address: string, serial: string) => {
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
                    token {
                      symbol
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
    return data
  } catch (e) {
    return e
  }
}
