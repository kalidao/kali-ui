import React, { useState } from 'react'
import { ethers } from 'ethers'
import { useContractWrite } from 'wagmi'
import { FieldSet, Input, Text, Button, Stack } from '@kalidao/reality'
import { useRouter } from 'next/router'
import Back from '@design/proposal/Back'
import { createProposal } from '@components/dao-dashboard/newproposal/utils/'
import { ProposalProps } from '../utils/types'
import KALIDAO_ABI from '@abi/KaliDAO.json'
import ChainGuard from '@components/dao-dashboard/ChainGuard'

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

  // form
  const [recipient, setRecipient] = useState(ethers.constants.AddressZero)
  const [amount, setAmount] = useState(1)

  // TODO: Popup to change network if on different network from DAO
  const submit = async () => {
    if (!dao || !chainId) return // wallet not ready to submit on chain

    let docs
    try {
      docs = await createProposal(dao as string, Number(chainId), 1, title, content)
    } catch (e) {
      console.error(e)
      return
    }

    if (docs) {
      try {
        const tx = await propose?.({
          recklesslySetUnpreparedArgs: [1, docs, [recipient], [ethers.utils.parseEther(amount.toString())], [Array(0)]],
        })
      } catch (e) {
        console.log('error', e)
      }
    }
  }

  return (
    <Stack>
      <FieldSet legend="Remove User" description="Kick or penalize a member by burning their tokens.">
        <Input
          name="recipient"
          label="Recipient"
          description="The address to burn tokens from"
          type="text"
          value={recipient}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setRecipient(e.target.value)}
        />
        <Input
          name="amount"
          label="Amount"
          description="The amount of tokens to burn"
          inputMode="decimal"
          type="number"
          value={amount}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAmount(Number(e.target.value))}
        />
      </FieldSet>
      <Stack direction={'horizontal'} justify="space-between">
        <Back onClick={() => setProposal?.('membersMenu')} />
        <ChainGuard fallback={<Button>Submit</Button>}>
          <Button
            onClick={submit}
            loading={isProposePending}
            disabled={isProposeSuccess || isProposePending || isProposeError}
          >
            Submit
          </Button>
        </ChainGuard>
      </Stack>
      <Text>
        {isProposeSuccess
          ? 'Proposal submitted on chain!'
          : isProposeError && `Error submitting proposal: ${proposeError}`}
      </Text>
    </Stack>
  )
}
