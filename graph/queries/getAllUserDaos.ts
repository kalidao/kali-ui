import { GRAPH_URL } from '../url'
import { useQuery } from '@tanstack/react-query'

export const getAllUserDaos = async (address: string) => {
  const query = address.toLowerCase()
  try {
    const daos = []
    for (const chainId in GRAPH_URL) {
        console.log('dao', chainId, GRAPH_URL, GRAPH_URL[chainId], address)
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
            daos.push({
                chainId,
                daos: data?.data?.members
            })
        }
    }
    return daos
  } catch (e) {
    console.error('Error fetching user daos.')
    return e
  }
}

export function useGetAllUserDaos(address: string) {
  return useQuery(['getAllUserDaos', address], async () => {
    const data = await getAllUserDaos(address)
    return data
  })
}
