export const GRAPH_URL: { [key: number]: string } = {
  1: 'https://api.goldsky.com/api/public/project_clge2hwmi0ia04au579q1eh70/subgraphs/kali-mainnet/1.0.1/gn',
  42161: 'https://api.goldsky.com/api/public/project_clge2hwmi0ia04au579q1eh70/subgraphs/kali-arbitrum/1.0.1/gn',
  137: 'https://api.goldsky.com/api/public/project_clge2hwmi0ia04au579q1eh70/subgraphs/kali-matic/1.0.2/gn',
  10: 'https://api.goldsky.com/api/public/project_clge2hwmi0ia04au579q1eh70/subgraphs/kali-optimism/1.0.2/gn',
  // 100: 'https://api.thegraph.com/subgraphs/name/nerderlyne/kali-gnosis',
}

// @todo update wrappr subgraphs
export const WRAPPR_GRAPH_URL: { [key: number]: string } = {
  1: 'https://api.thegraph.com/subgraphs/name/nerderlyne/wrappr-mainnet',
  42161: 'https://api.thegraph.com/subgraphs/name/nerderlyne/wrappr-arbitrum',
  137: 'https://api.thegraph.com/subgraphs/name/nerderlyne/wrappr-matic',
  10: 'https://api.thegraph.com/subgraphs/name/nerderlyne/wrappr-optimism',
}

export const GRAPH_NAME: { [key: number]: string } = {
  1: 'kali-mainnet',
  42161: 'kali-arbitrum',
  137: 'kali-matic',
  10: 'kali-optimism',
}
