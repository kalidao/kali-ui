export const fetcher = async (url: string, methods?: any) => {
  const res = await fetch(url, methods)
  const data = await res.json()
  return data
}
