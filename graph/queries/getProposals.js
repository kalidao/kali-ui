import React from 'react'
import { GRAPH_URL } from '../url'

export const getProposals = async (chainId, address) => {
  console.log('infoParms', chainId, address)
  try {
    const res = await fetch(GRAPH_URL[chainId], {
      method: 'POST',
      body: JSON.stringify({
        query: `query {
            daos(where: {
              id: "${address.toLowerCase()}"
            }) {
                proposals {
                    serial
                    proposer
                    proposalType
                    description
                    sponsor
                    sponsored
                    status
                    votes {
                      voter
                      vote
                    }
                    creationTime
                    dao {
                      votingPeriod
                    }
                  }
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
