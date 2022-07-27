import { addresses } from '../constants/addresses'

const getExplorerLink = (chainId, type, id) => {
  const explorer = addresses[chainId]['blockExplorer']
  switch (type) {
    case 'ADDRESS':
      return explorer + '/address/' + id
  }
}

export default getExplorerLink
