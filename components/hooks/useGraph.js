import { useState, useEffect } from 'react'
import { request } from 'graphql-request'
import { GRAPH_URL } from '../../graph'

export const useGraph = (chainId, query, variables) => {
  const [data, setData] = useState()
  const isLoading = data ? false : true

  useEffect(() => {
    if (!chainId || !query || !variables) return

    const fetch = async () => {
      const data = await request(GRAPH_URL[chainId], query, variables)
      setData(data)
    }

    fetch()
  }, [])

  return { data, isLoading }
}
