import React from 'react'
import { GRAPH_URL } from '../url'

export const getProposal = async (chainId, address, serial) => {
  console.log('infoParms', chainId, address)
  try {
    const res = await fetch(GRAPH_URL[chainId], {
      method: 'POST',
      body: JSON.stringify({
        query: `query {
            proposals(where: {
              id: "${address.toLowerCase()}",
              serial: ${serial}
            }) {
                id
                dao {
                    address
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
