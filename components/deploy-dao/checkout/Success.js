import React from 'react'
import { useContractEvent, useNetwork } from 'wagmi'
import { useStateMachine } from 'little-state-machine'
import { Spinner } from '../../elements'

import { addresses } from '../../../constants/addresses'
import FACTORY_ABI from '../../../abi/KaliDAOfactory.json'
import { useRouter } from 'next/router'
import { init, send } from 'emailjs-com'
import { ethers } from 'ethers'

init(process.env.NEXT_PUBLIC_EMAIL_ID)

export default function Success() {
  const { state } = useStateMachine()
  const { chain: activeChain } = useNetwork()
  const router = useRouter()

  useContractEvent({
    addressOrName: activeChain?.id ? addresses[activeChain.id]['factory'] : ethers.constants.AddressZero,
    contractInterface: FACTORY_ABI,
    eventName: 'DAOdeployed',
    chainId: Number(activeChain?.id),
    listener: (event) => {
      handleEmail(event)
      setTimeout(() => {
        router.push(`/daos/${encodeURIComponent(activeChain?.id)}/${encodeURIComponent(event[0])}/`)
      }, 30000)
    },
    once: true,
  })

  const handleEmail = (data) => {
    if (state.email && state.docType != 'none') {
      const params = {
        dao: data[0],
        network: activeChain?.id,
        email: state.email,
        entity_type: state.docType,
      }

      send('default_service', 'template_c37vmuw', params).then(
        function (response) {
          console.log('EMAIL SUCCESS!', response.status, response.text)
        },
        function (error) {
          console.log('EMAIL FAILED!', error)
        },
      )
    }
  }

  return <Spinner />
}
