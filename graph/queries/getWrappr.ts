import { WRAPPR_GRAPH_URL } from '@graph/url'
import { useQuery } from '@tanstack/react-query'

export const getWrappr = async (chainId: number, address: string) => {
  const dao = address.toLowerCase()
  try {
    const res = await fetch(WRAPPR_GRAPH_URL[chainId], {
      method: 'POST',
      body: JSON.stringify({
        query: `query {
          collections (
            where: {owner: "${dao}"}) {
                collectionId
                permissioned
                transferability
                uri
                wrappr {
                    id
                    baseURI
                    name
                }
          }
          }`,
      }),
    })

    const data = await res.json()
    return data?.data?.collections?.[0]
  } catch (e) {
    return e
  }
}

export function useGetWrappr(chainId: number, address: string) {
  return useQuery(['getWrappr', chainId, address], async () => {
    const data = await getWrappr(chainId, address)
    return data
  })
}
