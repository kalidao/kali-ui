import React, { useState } from 'react'
import { useContractRead, useContractWrite } from 'wagmi'
import { Warning } from '@design/elements'
import DAO_ABI from '@abi/KaliDAO.json'
import { useRouter } from 'next/router'
import { AddressZero } from '@ethersproject/constants'
import Editor from '@components/editor'
import { createProposal } from '../utils'
import ChainGuard from '@components/dao-dashboard/ChainGuard'
import { FieldSet, Text, Input, Button, Stack } from '@kalidao/reality'
import { JSONContent } from '@tiptap/react'

export default function UpdateQuorum() {
  const router = useRouter()
  const { dao, chainId } = router.query

  const [content, setContent] = useState<JSONContent>()
  const [title, setTitle] = useState<string>()

  const { data: currentQuorum } = useContractRead({
    address: dao ? (dao as `0xstring`) : AddressZero,
    abi: DAO_ABI,
    functionName: 'quorum',
    chainId: Number(chainId),
  })
  const {
    isSuccess: isProposeSuccess,
    isError: isProposeError,
    isLoading: isProposePending,
    write: propose,
  } = useContractWrite({
    mode: 'recklesslyUnprepared',
    address: dao ? (dao as `0xstring`) : AddressZero,
    abi: DAO_ABI,
    functionName: 'propose',
  })

  // form
  const [quorum, setQuorum] = useState<number>()
  const [warning, setWarning] = useState<string>()

  // TODO: Popup to change network if on different network from DAO
  const submit = async () => {
    if (!propose || !dao || !chainId || !title) return
    if (quorum === 0) {
      setWarning('Participation must be greater than 0')
      return
    }

    let docs
    try {
      docs = await createProposal(dao as string, Number(chainId), 5, title, content)
    } catch (e) {
      console.error(e)
      setWarning('There was an error in submitting this proposal.')
      return
    }

    if (quorum) {
      try {
        const tx = propose({
          recklesslySetUnpreparedArgs: [
            5, // QUORUM prop
            docs,
            [AddressZero],
            [quorum],
            [Array(0)],
          ],
        })
      } catch (e) {
        console.log('error', e)
      }
    } else {
      setWarning('Please set a quorum.')
    }
  }

  return (
    <FieldSet
      legend="Update Participation Percentage"
      description="This will create a proposal to update participation percentage"
    >
      <Input
        label="Title"
        name="id"
        required
        maxLength={30}
        placeholder={'Proposal for...'}
        onChange={(e) => setTitle(e.currentTarget.value)}
      />

      <Editor setContent={setContent} />

      <Input
        label="Participation"
        description={`Current participation percentage: ${currentQuorum ? currentQuorum : 'Fetching...'}%`}
        name="amount"
        type="number"
        inputMode="decimal"
        placeholder="51"
        suffix="%"
        min={0}
        max={100}
        onChange={(e) => setQuorum(Number(e.currentTarget.value))}
      />
      {warning && <Warning warning={warning} />}
      <Stack direction={'horizontal'} justify={'space-between'}>
        <ChainGuard fallback={<Button>Submit</Button>}>
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
            {isProposeSuccess ? 'Proposal submitted on chain!' : isProposeError && `Error submitting proposal`}
          </Text>
        </ChainGuard>
      </Stack>
    </FieldSet>
  )
}
