import React from 'react'
import { useContractEvent, useNetwork } from 'wagmi'
import { Box } from '../../../styles/elements'

import { addresses } from '../../../constants/addresses'
import FACTORY_ABI from '../../../abi/KaliDAOfactory.json'
import { useRouter } from 'next/router'

export default function Success() {
  const { activeChain } = useNetwork()
  const router = useRouter()
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
