import { GRAPH_URL } from '../url'
import { useQuery } from '@tanstack/react-query'

export const getDaos = async (chainId: number) => {
    try {
        const res = await fetch(GRAPH_URL[chainId], {
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
        })

        const data = await res.json()
        return data
    } catch (e) {
        return e
    }
}

export function useGetDaos(chainId: number) {
    return useQuery(['getDaos', chainId], async () => {
        const data = await getDaos(chainId)
        return data
    })
}