import { GRAPH_URL } from '../url'
import { useQuery } from '@tanstack/react-query'
import { getBuiltGraphSDK } from '../../.graphclient'
import { ExecutionResult } from 'graphql'
import React from 'react'

const sdk = getBuiltGraphSDK({
  chainName: 'mainnet', // We can provide a default value here
})

export const getUserDaos = async (chainId: number, address: string) => {
  try {
    const user = address.toLowerCase()
    const res = await fetch(GRAPH_URL[chainId], {
      method: 'POST',
      body: JSON.stringify({
        query: `query {
            members(where: {
              address: "${user}",
            }) {
              dao {
                id
                token {
                  name
                }
                members {
                  id
                }
                proposals {
                  id
                }
              }
              }
            }`,
      }),
    })

    const data = await res.json()
    return data?.data?.members
  } catch (e) {
    return e
  }
}

export function useUserDaos(chainId: number, address: string) {
  const { data, isLoading, error, refetch } = useQuery(['UserDAOs', chainId, address], () =>
    sdk.UserDAOs({
      address: address,
    }),
  )

  return { data, isLoading, error, refetch }
}
