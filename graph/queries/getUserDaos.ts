import { GRAPH_URL } from '../url'
import { useQuery } from '@tanstack/react-query'

export const getUserDaos = async (address: string, chainId: number) => {
  const query = address.toLowerCase()
  console.log('graph', GRAPH_URL[chainId])
  try {
    const res = await fetch(GRAPH_URL[chainId], {
      method: 'POST',
      body: JSON.stringify({
        query: `query {
            members(where: { address: "${query}" }) {
                dao {
                  id
                  token {
                    name
                    symbol
                  }
                  members {
                    id
                  }
                }
              }
            }`,
      }),
    })

    const data = await res.json()
    if (res.ok) {
      return data?.data?.members
    }
  } catch (e) {
    console.error('Error fetching user daos.')
    return e
  }
}

export function useGetUserDaos(address: string, chainId: number) {
  return useQuery(['getUserDaos', address, chainId], async () => {
    const data = await getUserDaos(address, chainId)
    return data
  })
}
