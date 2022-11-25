export const unixToDate = (timestamp: string) => {
  const date = new Date(Number(timestamp) * 1000)

  return date.toLocaleString()
}
