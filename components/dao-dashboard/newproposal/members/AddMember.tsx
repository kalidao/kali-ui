import React, { useState } from 'react'
import { useContractWrite } from 'wagmi'
import KALIDAO_ABI from '@abi/KaliDAO.json'
import { useRouter } from 'next/router'
import { createProposal } from '@components/dao-dashboard/newproposal/utils/'
import { AddressZero } from '@ethersproject/constants'
import ChainGuard from '@components/dao-dashboard/ChainGuard'
import { FieldSet, Text, Input, Button, Stack } from '@kalidao/reality'
import { ethers } from 'ethers'
import Back from '@design/proposal/Back'
import { ProposalProps } from '../utils/types'

export default function AddMember({ setProposal, content, title }: ProposalProps) {
  const router = useRouter()
  const { dao, chainId } = router.query

  // form
  const [recipient, setRecipient] = useState(ethers.constants.AddressZero)
  const [amount, setAmount] = useState(0)

  const {
    isSuccess: isProposeSuccess,
    isError: isProposeError,
    error: proposeError,
    isLoading: isProposePending,
    write: propose,
  } = useContractWrite({
    mode: 'recklesslyUnprepared',
    addressOrName: dao as string,
    contractInterface: KALIDAO_ABI,
    functionName: 'propose',
  })

  const submit = async () => {
    if (!propose || !dao || !chainId) return // wallet not ready to submit on chain

    let docs
    try {
      console.log('content', title, content)
      docs = await createProposal(dao as string, Number(chainId), 0, title, content)
      try {
        console.log(
          'tx params',
          0,
          'docs:',
          docs,
          [recipient],
          [ethers.utils.parseEther(amount.toString())],
          [Array(0)],
        )
      } catch (e) {
        console.error('error', e)
      }
    } catch (e) {
      console.error(e)
      return
    }

    console.log('docs', docs)
    if (docs) {
      try {
        const tx = propose({
          recklesslySetUnpreparedArgs: [0, docs, [recipient], [ethers.utils.parseEther(amount.toString())], [Array(0)]],
        })
        console.log('tx', tx)
      } catch (e) {
        console.log('error', e)
      }
    }
  }

  return (
    <Stack>
      <FieldSet
        legend="Mint Tokens"
        description="This will create a proposal to create and give tokens to the recipient."
      >
        <Input
          label="Recipient"
          description="The user that will receive tokens."
          name="recipient"
          type="text"
          inputMode="text"
          placeholder={AddressZero}
          value={recipient}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setRecipient(e.target.value)}
        />
        <Input
          label="Amount"
          description="The amount of tokens to mint."
          name="amount"
          type="number"
          inputMode="decimal"
          placeholder="1000"
          min={0}
          value={amount}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAmount(Number(e.target.value))}
        />
      </FieldSet>
      <Stack direction={'horizontal'} justify="space-between">
        <Back onClick={() => setProposal?.('membersMenu')} />
        <ChainGuard>
          <Button
            center
            variant="primary"
            onClick={submit}
            loading={isProposePending}
            disabled={!propose || isProposePending || isProposeSuccess}
          >
            {isProposePending ? 'Submitting...' : 'Submit'}
          </Button>
          <Text>
            {isProposeSuccess
              ? 'Proposal submitted on chain!'
              : isProposeError && `Error submitting proposal: ${proposeError}`}
          </Text>
        </ChainGuard>
      </Stack>
    </Stack>
  )
}
