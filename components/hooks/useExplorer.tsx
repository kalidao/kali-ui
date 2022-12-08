import getExplorerLink from '@utils/getExplorerLink'

import { ExplorerType } from '@utils/getExplorerLink'
type Props = {
  chainId: number
  type: ExplorerType
  id?: string
}

// TODO
export const useExplorer = ({ chainId, type, id }: Props) => {
  return getExplorerLink(chainId, type, id)
}
