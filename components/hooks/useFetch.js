import useSWR from 'swr'

const fetcher = (...args) => fetch(...args).then((res) => res.json())

export const useFetch = (URL) => {
  const { data, isLoading, error } = useSWR(URL, fetcher)

  return { data, isLoading, error }
}
