import React, { useState } from 'react'
import { useContractWrite } from 'wagmi'
import KALIDAO_ABI from '@abi/KaliDAO.json'
import { useRouter } from 'next/router'
import { createProposal } from '@components/tools/createProposal'
import { AddressZero } from '@ethersproject/constants'
import ChainGuard from '@components/dao-dashboard/ChainGuard'
import { FieldSet, Text, Input, Button, Stack, IconArrowLeft } from '@kalidao/reality'
import { ethers } from 'ethers'

type Props = {
  setProposal: React.Dispatch<React.SetStateAction<string>>
  title: string
  content: { [key: string]: any } | undefined
}

export default function AddMember({ setProposal, content, title }: Props) {
  const router = useRouter()
  const { dao, chainId } = router.query

  // form
  const [recipient, setRecipient] = useState(ethers.constants.AddressZero)
  const [amount, setAmount] = useState(0)

  const useContractWriteResult = useContractWrite({
    mode: 'recklesslyUnprepared',
    addressOrName: dao as string,
    contractInterface: KALIDAO_ABI,
    functionName: 'propose',
    args: [0, '', [AddressZero], [0], [Array(0)]], // dummy params for gas estimate
  })

  const {
    isSuccess: isProposeSuccess,
    isError: isProposeError,
    error: proposeError,
    isLoading: isProposePending,
    write: propose,
  } = useContractWriteResult

  const submit = async () => {
    if (!propose) return // wallet not ready to submit on chain

    let docs
    try {
      docs = await createProposal(dao, chainId, 0, title, content)
    } catch (e) {
      console.error(e)
      return
    }

    console.log(amount, content)

    try {
      console.log('tx params', 0, docs, [recipient], [ethers.utils.parseEther(amount.toString())], [Array(0)])
      const tx = propose({
        recklesslySetUnpreparedArgs: [0, docs, [recipient], [ethers.utils.parseEther(amount.toString())], [Array(0)]]
      })
    } catch (e) {
      console.error('error', e)
    }
  }

  return (
    <Stack>
      <FieldSet legend="Mint Tokens" description="This will create a proposal to create and give tokens to the recipient.">
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
          inputMode='decimal'
          placeholder="1000"
          value={amount}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAmount(Number(e.target.value))}
        />
      </FieldSet>
      <Stack direction={"horizontal"} justify="space-between">
        <Button variant="transparent" shape="circle" onClick={() => setProposal('membersMenu')}><IconArrowLeft /></Button>
        <ChainGuard>
          <Button variant="primary" onClick={submit} disabled={!propose || isProposePending || isProposeSuccess}>
            {isProposePending ? 'Submitting...(check wallet)' : 'Submit'}
          </Button>
          <Text>
            {isProposeSuccess
              ? 'Proposal submitted on chain!'
              : isProposeError && `Error submitting proposal: ${proposeError}`}
          </Text>
        </ChainGuard>
      </Stack>
    </Stack >
  )
}
