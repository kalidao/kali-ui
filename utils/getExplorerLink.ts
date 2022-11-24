import { addresses } from '../constants/addresses'

const getExplorerLink = (chainId: number, type: 'ADDRESS', id: string) => {
  const explorer = addresses[chainId]['blockExplorer']
  switch (type) {
    case 'ADDRESS':
      return explorer + '/address/' + id
  }
}

export default getExplorerLink
