import { GRAPH_URL } from "graph/url"

const getCrowdsaleStatus = async (chainId: number, address: string) => {
    try {
        const res = await fetch(GRAPH_URL[chainId], {
            method: 'POST',
            body: JSON.stringify({
              query: `query {
                  crowdsales(where: {
                    dao: "${address.toLowerCase()}",
                  }) {
                      active
                    }
                  }
                }`,
            }),
          })
      
          const data = await res.json()
          return data
    } catch (e) {
        console.error('Error fetching crowdsale status', e)
    }
}

export { getCrowdsaleStatus }