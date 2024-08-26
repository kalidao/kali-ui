import React, { useState } from 'react'
import { useReadContract, useWriteContract } from 'wagmi'
import { KALIDAO_ABI } from '@abi/KaliDAO'
import { useParams, useRouter } from 'next/navigation'
import Editor from '@components/editor'
import { createProposal } from '@components/dao-dashboard/newproposal/utils/createProposal'
import ChainGuard from '@components/dao-dashboard/ChainGuard'
import { Input } from '@components/ui/input'
import { Button } from '@components/ui/button'
import { Alert, AlertDescription, AlertTitle } from '@components/ui/alert'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@components/ui/card'
import { Label } from '@components/ui/label'
import { AlertCircle } from 'lucide-react'
import { JSONContent } from '@tiptap/react'
import { Address, zeroAddress } from 'viem'

export function UpdateSupermajority() {
  const router = useRouter()
  const params = useParams<{ chainId: string; dao: Address }>()
  const chainId = params ? Number(params.chainId) : 1
  const dao = params?.dao as Address

  const [content, setContent] = useState<JSONContent>()
  const [title, setTitle] = useState<string>()
  const [warning, setWarning] = useState<string>()

  const { data: currentSupermajority } = useReadContract({
    address: dao ? (dao as `0xstring`) : zeroAddress,
    abi: KALIDAO_ABI,
    functionName: 'supermajority',
    chainId: Number(chainId),
  })

  const { writeContractAsync } = useWriteContract()

  // form
  const [supermajority, setSupermajority] = useState(51)
  const [isProposePending, setIsProposePending] = useState(false)
  const [isProposeSuccess, setIsProposeSuccess] = useState(false)
  const [isProposeError, setIsProposeError] = useState(false)

  // TODO: Popup to change network if on different network from DAO
  const submit = async () => {
    if (!dao || !chainId || !supermajority || !title) return
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

    if (supermajority) {
      try {
        setIsProposePending(true)
        const tx = await writeContractAsync({
          address: dao as `0xstring`,
          abi: KALIDAO_ABI,
          functionName: 'propose',
          args: [
            6, // SUPERMAJORITY prop
            docs,
            [zeroAddress],
            [BigInt(supermajority)],
            [],
          ],
          chainId: Number(chainId),
        })
        console.log('tx', tx)
        setIsProposePending(false)
        setIsProposeSuccess(true)
        setTimeout(() => {
          router.push(`/daos/${chainId}/${dao}/`)
        }, 30000)
      } catch (e) {
        setWarning('Something went wrong')
        console.log('error', e)
        setIsProposePending(false)
        setIsProposeError(true)
      }
    } else {
      setWarning('Please set an approval %')
    }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Update Approval Percentage</CardTitle>
        <CardDescription>This will create a proposal to update approval percentage</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input id="title" placeholder="Proposal for..." maxLength={30} onChange={(e) => setTitle(e.target.value)} />
          </div>
          <Editor setContent={setContent} />
          <div className="space-y-2">
            <Label htmlFor="approval">Approval</Label>
            <Input
              id="approval"
              type="number"
              inputMode="decimal"
              placeholder="52"
              min={52}
              max={100}
              value={supermajority}
              onChange={(e) => setSupermajority(Number(e.target.value))}
            />
            <p className="text-sm text-gray-500">
              {`Current approval percentage: ${currentSupermajority ? currentSupermajority : 'Fetching...'}%`}
            </p>
          </div>
          {warning && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Warning</AlertTitle>
              <AlertDescription>{warning}</AlertDescription>
            </Alert>
          )}
          <div className="flex justify-between items-center">
            <ChainGuard fallback={<Button>Submit</Button>}>
              <Button onClick={submit} disabled={isProposePending || isProposeSuccess}>
                {isProposePending ? 'Submitting...' : 'Submit'}
              </Button>
            </ChainGuard>
            <p className="text-sm text-gray-500">
              {isProposeSuccess ? 'Proposal submitted on chain!' : isProposeError && `Error submitting proposal`}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
