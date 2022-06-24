import { GRAPH_URL } from '../url'

export const getProposal = async (chainId, address, serial) => {
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
                }
                serial
                proposer
                proposalType
                description
                sponsor
                sponsored
                status
                votes {
                    id
                    voter
                    vote
                }
                creationTime
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
