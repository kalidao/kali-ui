import { useMemo } from 'react'
import { useContractRead } from 'wagmi'
import ERC20_ABI from '../abi/ERC20.json'

export const getTokenName = (chainId, address) => {
  const { data, error, isLoading } = useContractRead(
    {
      addressOrName: address,
      contractInterface: ERC20_ABI,
    },
    'name',
    {
      chainId: chainId,
    },
  )

  return useMemo(() => {
    if (error || isLoading || !data || !chainId || !address) return undefined
    return data
  }, [data, error, isLoading, chainId, address])
}
