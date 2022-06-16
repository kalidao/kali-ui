export const copy = async (toCopy) => {
  await navigator.clipboard.writeText(toCopy)
}
