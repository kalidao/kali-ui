import { addresses } from '../../constants/addresses'

/*
type Props = {
    chainId: number
    type: string
}
*/

// TODO
export const useExplorer = ({ chainId, type }) => {
  return `${addresses[chainId]['blockExplorer']}/${type === 'address' ? 'address' : 'tx'}/`
}
