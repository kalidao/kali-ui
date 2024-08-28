import { GRAPH_URL } from '../url'
import { useQuery } from '@tanstack/react-query'

export const getAllUserDaos = async (address: string) => {
  const user = address.toLowerCase()
  const chains = Object.keys(GRAPH_URL)

  const res = await Promise.all(
    chains.map((url) =>
      fetch(GRAPH_URL[Number(url)], {
        method: 'POST',
        body: JSON.stringify({
          query: `query {
                members(where: { address: "${user}" }) {
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
      }),
    ),
  )
  const data = await Promise.all(res.map(async (r) => await r.json()))

  let daos: Array<{
    chainId: string
    id: string
    token: {
      name: string
      symbol: string
    }
    members: Array<{
      id: string
    }>
  }> = []
  for (let i = 0; i < data.length; i++) {
    for (let j = 0; j < data[i]?.data?.members.length; j++) {
      daos.push({
        chainId: chains[i],
        ...data[i].data.members[j].dao,
      })
    }
  }

  return daos
}

export function useGetAllUserDaos(address: string) {
  return useQuery(['getUserDaos', address], async () => {
    const data = await getAllUserDaos(address)
    return data
  })
}
