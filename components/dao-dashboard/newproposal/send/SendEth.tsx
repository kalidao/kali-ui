import React, { useState } from 'react'
import { ethers } from 'ethers'
import { useContractRead, useContractWrite } from 'wagmi'
import { Input } from '@components/ui/input'
import { Button } from '@components/ui/button'
import { ArrowLeft } from 'lucide-react'
import KALIDAO_ABI from '../../../../abi/KaliDAO.json'
import { useRouter } from 'next/router'
import { createProposal } from '@components/dao-dashboard/newproposal/utils/createProposal'
import { ProposalProps } from '../utils/types'
import ChainGuard from '@components/dao-dashboard/ChainGuard'
import { AddressZero } from '@ethersproject/constants'

export default function SendEth({ setProposal, title, content }: ProposalProps) {
  const router = useRouter()
  const { dao, chainId } = router.query
  const { data: daoName } = useContractRead({
    address: dao ? (dao as `0xstring`) : AddressZero,
    abi: KALIDAO_ABI,
    functionName: 'name',
    chainId: Number(chainId),
  })

  const {
    isSuccess: isProposeSuccess,
    isError: isProposeError,
    error: proposeError,
    isLoading: isProposePending,
    write: propose,
  } = useContractWrite({
    mode: 'recklesslyUnprepared',
    address: dao as `0xstring`,
    abi: KALIDAO_ABI,
    functionName: 'propose',
  })

  const [recipient, setRecipient] = useState<string>()
  const [amount, setAmount] = useState<string>()

  const submit = async () => {
    if (!amount) return
    let amt = amount && ethers.utils.parseEther(amount.toString())

    let docs
    try {
      docs = await createProposal(dao as string, Number(chainId), 2, title, content)
    } catch (e) {
      console.error(e)
      return
    }

    console.log('Proposal Params - ', 2, docs, [recipient], [amt], [Array(0)])

    try {
      const tx = propose?.({
        recklesslySetUnpreparedArgs: [2, docs, [recipient], [amt], [Array(0)]],
      })
      console.log('tx', tx)
    } catch (e) {
      console.log('error', e)
    }
  }

  return (
    <div className="space-y-6">
      <fieldset className="space-y-4">
        <legend className="text-lg font-semibold">Send Ether</legend>
        <p className="text-sm text-gray-500">Send Ether from {daoName} treasury</p>
        <Input
          placeholder={AddressZero}
          value={recipient}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setRecipient(e.target.value)}
          className="w-full"
        />
        <Input
          type="number"
          inputMode="decimal"
          placeholder="0"
          min={0}
          value={amount}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAmount(e.target.value)}
          className="w-full"
        />
      </fieldset>
      <div className="flex justify-between items-center">
        <Button variant="outline" onClick={() => setProposal?.('sendMenu')}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>
        <ChainGuard>
          <Button onClick={submit} disabled={!propose || isProposePending || isProposeSuccess}>
            {isProposePending ? 'Submitting...' : 'Submit'}
          </Button>
        </ChainGuard>
        <p className="text-sm">
          {isProposeSuccess
            ? 'Proposal submitted on chain!'
            : isProposeError && `Error submitting proposal: ${proposeError}`}
        </p>
      </div>
    </div>
  )
}
