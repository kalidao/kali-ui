import { useCallback } from 'react'
import { ethers } from 'ethers'
import { useStateMachine } from 'little-state-machine'
import { AddressZero } from '@ethersproject/constants'
import { useAccount, useContractEvent, useContractWrite, useNetwork } from 'wagmi'

import { Button, Flex, Text, Warning } from '../../../styles/elements'
import { Error } from '../../../styles/form-elements'
import Confirmation from './Confirmation'
import Success from './Success'

import { addresses } from '../../../constants/addresses'
import FACTORY_ABI from '../../../abi/KaliClubFactory.json'
import { useRouter } from 'next/router'

export default function Checkout({ setStep }) {
  const router = useRouter()
  const { state } = useStateMachine()
  const { data: account } = useAccount()
  const { activeChain } = useNetwork()
  const {
    data,
    writeAsync,
    isLoading: isWritePending,
    isSuccess: isWriteSuccess,
    isError,
    error,
  } = useContractWrite(
    {
      addressOrName: activeChain?.id ? addresses[activeChain.id]['clubFactory'] : AddressZero,
      contractInterface: FACTORY_ABI,
    },
    'deployClub',
    {
      onSuccess(data) {
        console.log('success!', data)
      },
    },
  )

  const orderSigners = (signers) => {
    return signers.map((signer) => signer.address).sort((a, b) => a - b)
  }
  // remove ricardian as default
  const deployClub = useCallback(async () => {
    if (!account || !activeChain) return

    let { name, quorum, signers } = state
    name = ethers.utils.formatBytes32String(name)
    signers = orderSigners(signers)
    let calls = new Array()

    console.log('deploy params', calls, signers, quorum, name)
    const tx = await writeAsync({
      args: [calls, signers, quorum, name],
      overrides: {
        gasLimit: 1050000,
      },
    }).catch((e) => {
      console.log('error', e.code, e.reason)
    })
  }, [account, activeChain, state, writeAsync])

  const prev = () => {
    setStep(1)
  }

  return (
    <Flex dir="col" gap="sm">
      {isError && <Error message={error.message} />}
      {data ? <Success /> : <Confirmation />}
      <Flex>
        <Button variant="transparent" onClick={prev}>
          Previous
        </Button>
      </Flex>
      {!account ? (
        <Warning warning="Your wallet is not connected. Please connect." />
      ) : (
        <Button variant="cta" css={{ width: '100%' }} onClick={deployClub} disabled={isWritePending || isWriteSuccess}>
          {isWritePending ? <div>Confirm Deployment</div> : <div>Deploy</div>}
        </Button>
      )}
    </Flex>
  )
}
