import React, { useState } from 'react'
import { ethers } from 'ethers'
import { useContractWrite } from 'wagmi'
import { useRouter } from 'next/router'
import { ArrowLeft } from 'lucide-react'
import { createProposal } from '@components/dao-dashboard/newproposal/utils/'
import { ProposalProps } from '../utils/types'
import KALIDAO_ABI from '@abi/KaliDAO.json'
import ChainGuard from '@components/dao-dashboard/ChainGuard'
import { Input } from '@components/ui/input'
import { Button } from '@components/ui/button'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@components/ui/card'

export default function RemoveMember({ setProposal, content, title }: ProposalProps) {
  const router = useRouter()
  const { dao, chainId } = router.query
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
    chainId: Number(chainId),
    onSuccess: async () => {
      await setTimeout(() => {
        router.push(`/daos/${chainId}/${dao}/`)
      }, 35000)
    },
  })

  const [recipient, setRecipient] = useState(ethers.constants.AddressZero)
  const [amount, setAmount] = useState(1)

  const submit = async () => {
    if (!dao || !chainId) return

    let docs
    try {
      docs = await createProposal(dao as string, Number(chainId), 1, title, content)
    } catch (e) {
      console.error(e)
      return
    }

    console.log('Proposal Params - ', 1, docs, [recipient], [ethers.utils.parseEther(amount.toString())], [Array(0)])

    if (docs) {
      try {
        const tx = await propose?.({
          recklesslySetUnpreparedArgs: [1, docs, [recipient], [ethers.utils.parseEther(amount.toString())], [Array(0)]],
        })

        console.log('tx', tx)
      } catch (e) {
        console.log('error', e)
      }
    }
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Remove User</CardTitle>
        <CardDescription>Kick or penalize a member by burning their tokens.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="recipient" className="text-sm font-medium">
            Recipient
          </label>
          <Input
            id="recipient"
            placeholder="Address to burn tokens from"
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="amount" className="text-sm font-medium">
            Amount
          </label>
          <Input
            id="amount"
            type="number"
            placeholder="Amount of tokens to burn"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
          />
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={() => setProposal?.('membersMenu')}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>
        <ChainGuard fallback={<Button disabled>Submit</Button>}>
          <Button onClick={submit} disabled={isProposeSuccess || isProposePending || isProposeError}>
            {isProposePending ? 'Submitting...' : 'Submit'}
          </Button>
        </ChainGuard>
      </CardFooter>
      {isProposeSuccess && <p className="text-green-500 text-center mt-4">Proposal submitted on chain!</p>}
      {isProposeError && (
        <p className="text-red-500 text-center mt-4">Error submitting proposal: {proposeError?.message}</p>
      )}
    </Card>
  )
}
