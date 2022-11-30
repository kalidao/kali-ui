import { GRAPH_URL } from '@graph/url'
import { useQuery } from '@tanstack/react-query'

export const getSwap = async (chainId: number, address: string) => {
  try {
    const res = await fetch(GRAPH_URL[Number(chainId)], {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `query {
          daos(where: {
            id: "${address}"
          }) {
            id
            token {
              name
              symbol
            }
            crowdsale {
              active
              version
              listId
              purchaseToken
              purchaseMultiplier
              purchaseLimit
              personalLimit
              saleEnds
              details
              amountPurchased
              purchase {
                purchaser
                purchased
              }
            }
          }
        }`,
      }),
    })

    const data = await res.json()

    return data?.data?.daos?.[0]
  } catch (e: any) {
    return e
  }
}

export function useGetSwap(chainId: number, address: string) {
  return useQuery(['getSwap', chainId, address], async () => {
    const data = await getSwap(chainId, address)
    return data
  })
}
