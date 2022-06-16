import React from 'react'
import { useContractEvent } from 'wagmi'
import { Box } from '../../../styles/elements'

import { addresses } from '../../../constants/addresses'
import FACTORY_ABI from '../../../abi/KaliDAOfactory.json'

export default function Success() {
  const { activeChain } = useNetwork()
  useContractEvent(
    {
      addressOrName: activeChain?.id ? addresses[activeChain.id]['factory'] : AddressZero,
      contractInterface: FACTORY_ABI,
    },
    'DAOdeployed',
    (event) =>
      setTimeout(
        router.push(`/daos/${encodeURIComponent(activeChain?.id)}/${encodeURIComponent(event[0])}/info`),
        10000,
      ),
    {
      chainId: activeChain?.id,
    },
  )

  return <div>Processing...</div>
}
