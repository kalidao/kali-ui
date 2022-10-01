import React, { useState } from 'react'
import { ethers } from 'ethers'
import { useContract, useSigner, useContractWrite } from 'wagmi'
import { FieldSet, Input, Text, Button, Stack } from '@kalidao/reality'
import { useRouter } from 'next/router'
import Back from '@design/proposal/Back'
import { createProposal } from '@components/dao-dashboard/newproposal/utils/'
import { ProposalProps } from '../utils/types'
import KALIDAO_ABI from '@abi/KaliDAO.json'

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
    addressOrName: dao as string,
    contractInterface: KALIDAO_ABI,
    functionName: 'propose',
  })

  const { data: signer } = useSigner()

  const kalidao = useContract({
    addressOrName: dao as string,
    contractInterface: KALIDAO_ABI,
    signerOrProvider: signer,
  })

  // form
  const [recipient, setRecipient] = useState(ethers.constants.AddressZero)
  const [amount, setAmount] = useState(1)

  // TODO: Popup to change network if on different network from DAO
  const submit = async () => {
    if (!kalidao || !dao || !chainId) return // wallet not ready to submit on chain

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
        const tx = propose({
          recklesslySetUnpreparedArgs: [1, docs, [recipient], [ethers.utils.parseEther(amount.toString())], [Array(0)]],
        })

        console.log('tx', tx)
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
        <Button onClick={submit}>Submit</Button>
      </Stack>
    </Stack>
  )
}
