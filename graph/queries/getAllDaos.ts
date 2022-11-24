import { GRAPH_URL } from '../url'
import { useQuery } from '@tanstack/react-query'

export const getAllDaos = async () => {
  const chains = Object.keys(GRAPH_URL)
  try {
    const res = await Promise.all(
      chains.map((url) =>
        fetch(GRAPH_URL[Number(url)], {
          method: 'POST',
          body: JSON.stringify({
            query: `query {
                daos {
                    id
                    token {
                    name
                    }
                    members {
                    id
                    }
                }  
            }`,
          }),
        }),
      ),
    )
    const data = await Promise.all(res.map(async (r) => await r.json()))

    let daos = []
    for (let i = 0; i < data.length; i++) {
      console.log('data', data)
      for (let j = 0; j < data[i]?.data?.daos.length; j++) {
        daos.push({
          chainId: chains[i],
          ...data[i].data.daos[j],
        })
      }
    }
    console.log('daos', daos)
    return daos
  } catch (e) {
    console.error('Error fetching user daos.')
    return e
  }
}

export function useGetAllDaos() {
  return useQuery(['getAllDaos'], async () => {
    const data = await getAllDaos()
    return data
  })
}
