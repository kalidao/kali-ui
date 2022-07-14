import React from 'react'
import { useContractEvent, useContractRead, useNetwork } from 'wagmi'
import { useStateMachine } from 'little-state-machine'
import { Box } from '../../../styles/elements'
import { Spinner } from '../../elements'

import { addresses } from '../../../constants/addresses'
import FACTORY_ABI from '../../../abi/KaliClubFactory.json'
import { useRouter } from 'next/router'
import { ethers } from 'ethers'

export default function Success() {
  const { state } = useStateMachine()
  const { activeChain } = useNetwork()
  const router = useRouter()
  const { data: clubAddress } = useContractRead(
    {
      addressOrName: activeChain?.id ? addresses[activeChain.id]['clubFactory'] : AddressZero,
      contractInterface: FACTORY_ABI,
    },
    'determineClub',
    {
      args: [ethers.utils.formatBytes32String(state.name)],
    },
  )
  useContractEvent(
    {
      addressOrName: activeChain?.id ? addresses[activeChain.id]['clubFactory'] : AddressZero,
      contractInterface: FACTORY_ABI,
    },
    'ClubDeployed',
    (event) => {
      if (clubAddress) {
        setTimeout(
          router.push(`/clubs/${encodeURIComponent(activeChain?.id)}/${encodeURIComponent(clubAddress)}`),
          100000,
        )
      }
    },
    {
      chainId: activeChain?.id,
    },
  )

  console.log('address', clubAddress)
  return <Spinner />
}
