import React, { useState } from 'react'
import { useContractRead, useContractWrite } from 'wagmi'
import { Warning } from '@design/elements'
import { Stack, Text, Button, Input, Spinner, FieldSet } from '@kalidao/reality'
import { Select } from '@design/Select'
import KALIDAO_ABI from '@abi/KaliDAO.json'
import { useRouter } from 'next/router'
import { AddressZero } from '@ethersproject/constants'
import { votingPeriodToSeconds, formatVotingPeriod } from '@utils/index'
import Editor from '@components/editor'
import { createProposal } from '../utils'
import { ethers } from 'ethers'
import ChainGuard from '@components/dao-dashboard/ChainGuard'
import { JSONContent } from '@tiptap/react'

export default function UpdateVotingPeriod() {
  const router = useRouter()

  const { dao, chainId } = router.query
  const [title, setTitle] = useState<string>()
  const [content, setContent] = useState<JSONContent>()

  // form
  const [unit, setUnit] = useState('min')
  const [duration, setDuration] = useState(0)
  const [warning, setWarning] = useState<string>()
  const [loading, setLoading] = useState(false)
  const { writeAsync, isSuccess } = useContractWrite({
    mode: 'recklesslyUnprepared',
    addressOrName: dao ? (dao as string) : ethers.constants.AddressZero,
    contractInterface: KALIDAO_ABI,
    functionName: 'propose',
    chainId: Number(chainId),
    onSuccess: () => {
      setTimeout(() => {
        router.push(`/daos/${chainId}/${dao}/`)
        setLoading(false)
      }, 30000)
    },
  })

  const { data: votingPeriod, isLoading: isWaitingVotingPeriod } = useContractRead({
    addressOrName: dao ? (dao as string) : ethers.constants.AddressZero,
    contractInterface: KALIDAO_ABI,
    functionName: 'votingPeriod',
    chainId: Number(chainId),
  })

  // TODO: Popup to change network if on different network from DAO
  const submit = async () => {
    setLoading(true)
    const seconds = votingPeriodToSeconds(duration, unit)

    let docs
    try {
      docs = await createProposal(dao as string, Number(chainId), 3, title as string, content)
    } catch (e) {
      console.error(e)
      setWarning('There was an error in submitting this proposal.')
      return
    }

    console.log('Proposal Params - ', 2, docs, [AddressZero], [seconds], [Array(0)])
    if (seconds) {
      try {
        const tx = await writeAsync({
          recklesslySetUnpreparedArgs: [
            3, // UPDATE_VOTING_PERIOD prop
            docs,
            [AddressZero],
            [seconds],
            [Array(0)],
          ],
        })
        setWarning('')
      } catch (e) {
        console.error(e)
      }
    } else {
      setWarning('Please set a duration.')
    }
  }

  return (
    <FieldSet
      legend="Update Voting Period"
      description={`This will create a proposal to update the voting period for your DAO. The voting period is the amount of time that members have to vote on a proposal. The current voting period is ${
        votingPeriod && formatVotingPeriod(Number(votingPeriod))
      }`}
    >
      <Input
        label="Title"
        name="id"
        maxLength={30}
        required
        placeholder={'Proposal for...'}
        onChange={(e) => setTitle(e.currentTarget.value)}
      />

      <Editor
        setContent={setContent}
        placeholder="Hello"
        label="Description"
        description="Why should we change the voting period?"
      />
      <Stack direction={'horizontal'}>
        <Input
          label="Duration"
          name="recipient"
          type="number"
          min="0"
          placeholder="30"
          defaultValue={duration}
          onChange={(e) => setDuration(Number(e.currentTarget.value))}
        />
        <Select
          label={'Unit'}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setUnit(e.currentTarget.value)}
          defaultValue={unit}
          options={[
            {
              label: 'Minutes',
              value: 'min',
            },
            {
              label: 'Hours',
              value: 'hour',
            },
            {
              label: 'Days',
              value: 'day',
            },
          ]}
        />
      </Stack>
      {isSuccess ? (
        <Stack direction={'horizontal'} align="center">
          <Text variant="label">Success! Your proposal has been submitted. </Text>
          <Spinner />
        </Stack>
      ) : null}
      {warning && <Warning warning={warning} />}
      <ChainGuard fallback={<Button>Submit</Button>}>
        <Button  center onClick={submit} disabled={isSuccess} loading={loading}>
          Submit
        </Button>
      </ChainGuard>
    </FieldSet>
  )
}
