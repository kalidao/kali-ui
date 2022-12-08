import { GRAPH_URL } from '../url'

export const getNames = async (chainId: number) => {
  try {
    const res = await fetch(GRAPH_URL[chainId], {
      method: 'POST',
      body: JSON.stringify({
        query: `query {
            daos(first: 1000) {
              token {
                name
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
