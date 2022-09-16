interface GraphURL {
  [key: number]: string
}

export const GRAPH_URL: GraphURL = {
  1: 'https://api.thegraph.com/subgraphs/name/nerderlyne/kali-mainnet',
  42161: 'https://api.thegraph.com/subgraphs/name/nerderlyne/kali-arbitrum',
  4: 'https://api.thegraph.com/subgraphs/name/nerderlyne/kali-rinkeby',
  137: 'https://api.thegraph.com/subgraphs/name/nerderlyne/kali-matic',
  10: 'https://api.thegraph.com/subgraphs/name/nerderlyne/kali-optimism',
  5: 'https://api.thegraph.com/subgraphs/name/nerderlyne/kali-goerli',
}
