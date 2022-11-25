import React, { useCallback } from 'react'
import { useRouter } from 'next/router'
import { useAccount, useContractWrite } from 'wagmi'
import DAO_ABI from '../../../../abi/KaliDAO.json'
import { AddressZero } from '@ethersproject/constants'
import { Button, IconCheck, IconClose, Stack } from '@kalidao/reality'
import ChainGuard from '@components/dao-dashboard/ChainGuard'

// TODO: add actual types
type VoteProps = {
  proposal: any
}

export default function Vote({ proposal }: VoteProps) {
  const router = useRouter()
  const { chainId, dao } = router.query
  const { isConnected } = useAccount()

  const { write: vote } = useContractWrite({
    mode: 'recklesslyUnprepared',
    addressOrName: dao ? (dao as string) : AddressZero,
    contractInterface: DAO_ABI,
    functionName: 'vote',
  })

  const left =
    new Date().getTime() - new Date(proposal?.dao?.votingPeriod * 1000 + proposal?.votingStarts * 1000).getTime()

  const disabled = proposal['sponsored'] === null || left > 0 || !vote ? true : false

  const submitVote = useCallback(
    async (approval: Boolean) => {
      console.log(1)
      if (!vote || !proposal || !isConnected) return
      console.log(2)
      try {
        const data = vote({
          recklesslySetUnpreparedArgs: [proposal['serial'], approval],
        })
      } catch (e) {
        console.log('error', e)
      }
      console.log(3)
    },
    [isConnected, proposal],
  )

  return (
    <Stack direction={'horizontal'}>
      <ChainGuard
        fallback={
          <Button shape="circle" tone="green" size="small" disabled={disabled}>
            <IconCheck />
          </Button>
        }
      >
        <Button shape="circle" tone="green" size="small" disabled={disabled} onClick={() => submitVote(true)}>
          <IconCheck />
        </Button>
      </ChainGuard>
      <ChainGuard
        fallback={
          <Button shape="circle" tone="red" size="small" disabled={disabled}>
            <IconClose />
          </Button>
        }
      >
        <Button shape="circle" tone="red" size="small" disabled={disabled} onClick={() => submitVote(false)}>
          <IconClose />
        </Button>
      </ChainGuard>
    </Stack>
  )
}
