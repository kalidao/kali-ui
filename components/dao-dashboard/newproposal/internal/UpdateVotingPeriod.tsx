import React, { useState } from 'react'
import { useContractRead, useContractWrite } from 'wagmi'
import { useRouter } from 'next/router'
import { AddressZero } from '@ethersproject/constants'
import { ethers } from 'ethers'
import { AlertCircle, Loader2 } from 'lucide-react'
import { Button } from '@components/ui/button'
import { Input } from '@components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@components/ui/select'
import { Alert, AlertDescription, AlertTitle } from '@components/ui/alert'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@components/ui/card'
import KALIDAO_ABI from '@abi/KaliDAO.json'
import { votingPeriodToSeconds, formatVotingPeriod } from '@utils/index'
import Editor from '@components/editor'
import { createProposal } from '../utils'
import ChainGuard from '@components/dao-dashboard/ChainGuard'
import { JSONContent } from '@tiptap/react'
import { Label } from '@components/ui/label'

export default function UpdateVotingPeriod() {
  const router = useRouter()

  const { dao, chainId } = router.query
  const [title, setTitle] = useState<string>()
  const [content, setContent] = useState<JSONContent>()

  const [unit, setUnit] = useState('min')
  const [duration, setDuration] = useState(0)
  const [warning, setWarning] = useState<string>()
  const [loading, setLoading] = useState(false)
  const { writeAsync, isSuccess } = useContractWrite({
    mode: 'recklesslyUnprepared',
    address: dao ? (dao as `0xstring`) : ethers.constants.AddressZero,
    abi: KALIDAO_ABI,
    functionName: 'propose',
    chainId: Number(chainId),
    onSuccess: () => {
      setTimeout(() => {
        router.push(`/daos/${chainId}/${dao}/`)
        setLoading(false)
      }, 30000)
    },
  })

  const { data: votingPeriod } = useContractRead({
    address: dao ? (dao as `0xstring`) : ethers.constants.AddressZero,
    abi: KALIDAO_ABI,
    functionName: 'votingPeriod',
    chainId: Number(chainId),
  })

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
        const tx = await writeAsync?.({
          recklesslySetUnpreparedArgs: [3, docs, [AddressZero], [seconds], [Array(0)]],
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
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle>Update Voting Period</CardTitle>
        <CardDescription>
          This will create a proposal to update the voting period for your DAO. The voting period is the amount of time
          that members have to vote on a proposal. The current voting period is{' '}
          {votingPeriod && formatVotingPeriod(Number(votingPeriod))}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Label>Title</Label>
          <Input
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

          <div className="flex space-x-4">
            <Label>Duration</Label>
            <Input
              type="number"
              min="0"
              placeholder="30"
              defaultValue={duration}
              onChange={(e) => setDuration(Number(e.currentTarget.value))}
            />
            <Select onValueChange={setUnit} defaultValue={unit}>
              <SelectTrigger className="w-[180px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="min">Minutes</SelectItem>
                <SelectItem value="hour">Hours</SelectItem>
                <SelectItem value="day">Days</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {isSuccess && (
            <div className="flex items-center space-x-2">
              <p className="text-sm font-medium">Success! Your proposal has been submitted.</p>
              <Loader2 className="h-4 w-4 animate-spin" />
            </div>
          )}

          {warning && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{warning}</AlertDescription>
            </Alert>
          )}

          <ChainGuard fallback={<Button>Submit</Button>}>
            <Button onClick={submit} disabled={isSuccess || loading} className="w-full">
              {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
              Submit
            </Button>
          </ChainGuard>
        </div>
      </CardContent>
    </Card>
  )
}
