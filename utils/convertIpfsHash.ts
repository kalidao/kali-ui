export const convertIpfsHash = (source: string): string => {
  const desiredGatewayPrefix = 'https://content.wrappr.wtf/ipfs/'
  return desiredGatewayPrefix + source
}
