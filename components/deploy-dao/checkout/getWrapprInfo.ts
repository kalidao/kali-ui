import { wrapprAddresses } from './wrapprAddresses'

export const getWrapprInfo = async (address: string, chainId: number) => {
  try {
    const res = await fetch(wrapprAddresses[chainId]['subgraph'], {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `query {
              collections(where: {
                  wrappr: "${address.toLowerCase()}"
                }) {
                  id
                  wrappr {
                    id
                    name
                  }
                  collectionId
                  owner
                }
            }`,
      }),
    })

    const data = await res.json()

    return data?.data?.collections
  } catch (e) {
    console.error(e)
    return
  }
}
