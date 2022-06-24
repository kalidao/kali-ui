import { GRAPH_URL } from '../url'

export const getCrowdsale = async (chainId, address, serial) => {
  try {
    const res = await fetch(GRAPH_URL[chainId], {
      method: 'POST',
      body: JSON.stringify({
        query: `query {
            crowdsales(where: {
              dao: "${address.toLowerCase()}",
            }) {
                active
                  version
                listId
                purchaseToken
                purchaseMultiplier
                purchaseLimit
                  personalLimit
                saleEnds
                details
                purchase {
                  purchaser
                  purchased
                }
                amountPurchased
                  dao {
                  votingPeriod
                  token {
                    name
                    symbol
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
