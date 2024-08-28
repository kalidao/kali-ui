import React, { useState } from 'react'
import { useReadContract, useWriteContract } from 'wagmi'
import { KALIDAO_ABI } from '@abi/KaliDAO'
import { useParams } from 'next/navigation'
import Editor from '@components/editor'
import { createProposal } from '@components/dao-dashboard/newproposal/utils/createProposal'
import ChainGuard from '@components/dao-dashboard/ChainGuard'
import { Input } from '@components/ui/input'
import { Button } from '@components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@components/ui/card'
import { Alert, AlertDescription } from '@components/ui/alert'
import { AlertCircle } from 'lucide-react'
import { JSONContent } from '@tiptap/react'
import { Label } from '@components/ui/label'
import { Address, zeroAddress } from 'viem'

export function UpdateQuorum() {
  const params = useParams<{ chainId: string; dao: Address }>()
  const chainId = params ? Number(params.chainId) : 1
  const dao = params?.dao as Address

  const [content, setContent] = useState<JSONContent>()
  const [title, setTitle] = useState<string>()

  const { data: currentQuorum } = useReadContract({
    address: dao ? dao : zeroAddress,
    abi: KALIDAO_ABI,
    functionName: 'quorum',
    chainId: Number(chainId),
  })
  const { writeContractAsync } = useWriteContract()

  // form
  const [quorum, setQuorum] = useState<number>()
  const [warning, setWarning] = useState<string>()

  // TODO: Popup to change network if on different network from DAO
  const submit = async () => {
    if (!writeContractAsync || !dao || !chainId || !title) return
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

    console.log('Proposal Params - ', 5, docs, [zeroAddress], [quorum], [Array(0)])

    if (quorum) {
      try {
        const tx = await writeContractAsync({
          address: dao ? dao : zeroAddress,
          abi: KALIDAO_ABI,
          functionName: 'propose',
          args: [
            5, // QUORUM prop
            docs,
            [zeroAddress],
            [BigInt(quorum)],
            [],
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
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              name="id"
              required
              maxLength={30}
              placeholder={'Proposal for...'}
              onChange={(e) => setTitle(e.currentTarget.value)}
            />
          </div>

          <Editor setContent={setContent} />

          <div>
            <Input
              name="amount"
              type="number"
              inputMode="decimal"
              placeholder="51"
              min={0}
              max={100}
              onChange={(e) => setQuorum(Number(e.currentTarget.value))}
            />
            <p className="text-sm text-gray-500 mt-1">
              {`Current participation percentage: ${currentQuorum ? currentQuorum : 'Fetching...'}%`}
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
              <Button onClick={submit}>Submit</Button>
              <p className="text-sm"></p>
            </ChainGuard>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
