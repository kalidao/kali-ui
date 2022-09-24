import { GRAPH_URL } from '../url'
import { useQuery } from '@tanstack/react-query'

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
  return useQuery(['getUserDaos', chainId, address], async () => {
    const data = await getUserDaos(chainId, address)
    return data
  }, {
    enabled: chainId !== undefined
  })
}