import { useQuery } from "@tanstack/react-query"

// TODO: Add Options
export const useFetch = (URL: string) => {
  return useQuery(['result'], async () => await fetch(URL))
}
