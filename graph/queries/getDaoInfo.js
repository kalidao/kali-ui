import React from 'react'
import { GRAPH_URL } from '../url'

export const getDaoInfo = async (chainId, address) => {
  console.log('infoParms', chainId, address)
  try {
    const res = await fetch(GRAPH_URL[chainId], {
      method: 'POST',
      body: JSON.stringify({
        query: `query {
            daos(where: {
              id: "${address.toLowerCase()}"
            }) {
              id
              token {
                id
                name
                symbol
                paused
                totalSupply
              }
              docs
              votingPeriod
              gracePeriod
              quorum
              supermajority
              proposals {
                id
              }
              tribute {
                active
              }
              crowdsale {
                active
                saleEnds
              }
              redemption {
                active
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
