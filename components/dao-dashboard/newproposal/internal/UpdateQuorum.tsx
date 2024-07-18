import React, { useState } from 'react'
import { useContractRead, useContractWrite } from 'wagmi'
import DAO_ABI from '@abi/KaliDAO.json'
import { useRouter } from 'next/router'
import { AddressZero } from '@ethersproject/constants'
import Editor from '@components/editor'
import { createProposal } from '../utils'
import ChainGuard from '@components/dao-dashboard/ChainGuard'
import { Input } from '@components/ui/input'
import { Button } from '@components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@components/ui/card'
import { Alert, AlertDescription } from '@components/ui/alert'
import { AlertCircle } from 'lucide-react'
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

    console.log('Proposal Params - ', 5, docs, [AddressZero], [quorum], [Array(0)])

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
        console.log('tx', tx)
      } catch (e) {
        console.log('error', e)
      }
    } else {
      setWarning('Please set a quorum.')
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Update Participation Percentage</CardTitle>
        <CardDescription>This will create a proposal to update participation percentage</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Input
            label="Title"
            name="id"
            required
            maxLength={30}
            placeholder={'Proposal for...'}
            onChange={(e) => setTitle(e.currentTarget.value)}
          />

          <Editor setContent={setContent} />

          <div>
            <Input
              label="Participation"
              name="amount"
              type="number"
              inputMode="decimal"
              placeholder="51"
              min={0}
              max={100}
              onChange={(e) => setQuorum(Number(e.currentTarget.value))}
            />
            <p className="text-sm text-gray-500 mt-1">
              Current participation percentage: {currentQuorum ? currentQuorum : 'Fetching...'}%
            </p>
          </div>

          {warning && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{warning}</AlertDescription>
            </Alert>
          )}

          <div className="flex justify-between items-center">
            <ChainGuard fallback={<Button>Submit</Button>}>
              <Button onClick={submit} disabled={!propose || isProposePending || isProposeSuccess}>
                {isProposePending ? 'Submitting...' : 'Submit'}
              </Button>
              <p className="text-sm">
                {isProposeSuccess ? 'Proposal submitted on chain!' : isProposeError && `Error submitting proposal`}
              </p>
            </ChainGuard>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
