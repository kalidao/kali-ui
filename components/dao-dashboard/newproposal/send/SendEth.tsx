import React, { useState } from 'react'
import { ethers } from 'ethers'
import { useContractRead, useContractWrite } from 'wagmi'
import { FieldSet, Text, Input, Button, Stack } from '@kalidao/reality'
import KALIDAO_ABI from '../../../../abi/KaliDAO.json'
import { useRouter } from 'next/router'
import Back from '../../../../styles/proposal/Back'
import { createProposal } from '../utils/'
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

  // form
  const [recipient, setRecipient] = useState<string>()
  const [amount, setAmount] = useState<string>()

  // TODO: Popup to change network if on different network from DAO
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

    try {
      const tx = propose?.({
        recklesslySetUnpreparedArgs: [
          2, // CALL prop
          docs,
          [recipient],
          [amt],
          [Array(0)],
        ],
      })
    } catch (e) {
      console.log('error', e)
    }
  }

  return (
    <Stack>
      <FieldSet legend="Send Ether" description={`Send Ether from ${daoName} treasury`}>
        <Input
          label="Recipient"
          name="recipient"
          type="text"
          inputMode="text"
          placeholder={AddressZero}
          value={recipient}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setRecipient(e.target.value)}
        />
        <Input
          label="Amount"
          name="amount"
          type="number"
          inputMode="decimal"
          placeholder="0"
          min={0}
          value={amount}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAmount(e.target.value)}
        />
      </FieldSet>
      <Stack direction={'horizontal'} justify="space-between">
        <Back onClick={() => setProposal?.('sendMenu')} />
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
        </ChainGuard>
        <Text>
          {isProposeSuccess
            ? 'Proposal submitted on chain!'
            : isProposeError && `Error submitting proposal: ${proposeError}`}
        </Text>
      </Stack>
    </Stack>
  )
}
