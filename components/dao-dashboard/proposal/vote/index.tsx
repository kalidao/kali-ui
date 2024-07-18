import React, { useCallback } from 'react'
import { useRouter } from 'next/router'
import { useAccount, useContractWrite } from 'wagmi'
import DAO_ABI from '../../../../abi/KaliDAO.json'
import { AddressZero } from '@ethersproject/constants'
import { Button } from '@components/ui/button'
import { Check, X } from 'lucide-react'
import ChainGuard from '@components/dao-dashboard/ChainGuard'

// TODO: add actual types
type VoteProps = {
  proposal: any
}

export default function Vote({ proposal }: VoteProps) {
  const router = useRouter()
  const { dao } = router.query
  const { isConnected } = useAccount()

  const { write: vote } = useContractWrite({
    mode: 'recklesslyUnprepared',
    address: dao ? (dao as `0xstring`) : AddressZero,
    abi: DAO_ABI,
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
        const data = await vote({
          recklesslySetUnpreparedArgs: [proposal['serial'], approval],
        })
      } catch (e) {
        console.log('error', e)
      }
      console.log(3)
    },
    [isConnected, proposal, vote],
  )

  return (
    <div className="flex space-x-2">
      <ChainGuard
        fallback={
          <Button variant="outline" size="icon" className="bg-green-500 text-white" disabled={disabled}>
            <Check className="h-4 w-4" />
          </Button>
        }
      >
        <Button
          variant="outline"
          size="icon"
          className="bg-green-500 text-white"
          disabled={disabled}
          onClick={() => submitVote(true)}
        >
          <Check className="h-4 w-4" />
        </Button>
      </ChainGuard>
      <ChainGuard
        fallback={
          <Button variant="outline" size="icon" className="bg-red-500 text-white" disabled={disabled}>
            <X className="h-4 w-4" />
          </Button>
        }
      >
        <Button
          variant="outline"
          size="icon"
          className="bg-red-500 text-white"
          disabled={disabled}
          onClick={() => submitVote(false)}
        >
          <X className="h-4 w-4" />
        </Button>
      </ChainGuard>
    </div>
  )
}
