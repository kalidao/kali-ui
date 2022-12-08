export const copy = async (toCopy: string) => {
  await navigator.clipboard.writeText(toCopy)
}
