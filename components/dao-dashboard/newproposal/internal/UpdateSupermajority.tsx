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

export default function UpdateSupermajority() {
  const router = useRouter()
  const { dao, chainId } = router.query
  const [content, setContent] = useState<JSONContent>()
  const [title, setTitle] = useState<string>()
  const [warning, setWarning] = useState<string>()

  const { data: currentSupermajority } = useContractRead({
    addressOrName: dao ? (dao as string) : AddressZero,
    contractInterface: DAO_ABI,
    functionName: 'supermajority',
    chainId: Number(chainId),
  })

  const {
    isSuccess: isProposeSuccess,
    isError: isProposeError,
    isLoading: isProposePending,
    write: propose,
  } = useContractWrite({
    mode: 'recklesslyUnprepared',
    addressOrName: dao ? (dao as string) : AddressZero,
    contractInterface: DAO_ABI,
    functionName: 'propose',
    chainId: Number(chainId),
    onSuccess: () => {
      setTimeout(() => {
        router.push(`/daos/${chainId}/${dao}/`)
      }, 30000)
    },
  })

  // form
  const [supermajority, setSupermajority] = useState(51)

  // TODO: Popup to change network if on different network from DAO
  const submit = async () => {
    if (!propose || !dao || !chainId || !supermajority || !title) return
    if (supermajority < 51) {
      setWarning('Approval must be greater than 51%')
      return
    }

    let docs
    try {
      docs = await createProposal(dao as string, Number(chainId), 6, title, content)
    } catch (e) {
      console.error(e)
      setWarning('There was an error in submitting this proposal.')
      return
    }

    console.log('Proposal Params - ', 6, docs, [AddressZero], [supermajority], [Array(0)])

    if (supermajority) {
      try {
        const tx = propose({
          recklesslySetUnpreparedArgs: [
            6, // SUPERMAJORITY prop
            docs,
            [AddressZero],
            [supermajority],
            [Array(0)],
          ],
        })
        console.log('tx', tx)
      } catch (e) {
        setWarning('Something went wrong')
        console.log('error', e)
      }
    } else {
      setWarning('Please set an approval %')
    }
  }

  return (
    <FieldSet
      legend="Update Approval Percentage"
      description="This will create a proposal to update approval percentage"
    >
      <Input
        label="Title"
        name="id"
        maxLength={30}
        placeholder={'Proposal for...'}
        onChange={(e) => setTitle(e.target.value)}
      />
      <Editor setContent={setContent} />
      <Input
        label="Approval"
        description={`Current approval percentage: ${currentSupermajority ? currentSupermajority : 'Fetching...'}%`}
        name="amount"
        type="number"
        inputMode="decimal"
        placeholder="52"
        suffix="%"
        min={52}
        max={100}
        value={supermajority}
        onChange={(e) => setSupermajority(Number(e.target.value))}
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
        </ChainGuard>
        <Text>{isProposeSuccess ? 'Proposal submitted on chain!' : isProposeError && `Error submitting proposal`}</Text>
      </Stack>
    </FieldSet>
  )
}
