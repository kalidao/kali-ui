import { addresses } from '../constants/addresses'

export enum ExplorerType {
  'ADDRESS',
  'TX',
  'NONE',
}

const getExplorerLink = (chainId: number, type: ExplorerType, id?: string) => {
  const explorer = addresses[chainId]['blockExplorer']
  switch (type as ExplorerType) {
    case ExplorerType.ADDRESS:
      return explorer + '/address/' + id
    case ExplorerType.TX:
      return explorer + '/tx/' + id
    case ExplorerType.NONE:
      return explorer
  }
}

export default getExplorerLink
