import React, { useState } from 'react'
import { useWriteContract, useReadContract } from 'wagmi'
import { KALIDAO_ABI } from '@abi/KaliDAO'

import { useParams } from 'next/navigation'
import Editor from '@components/editor'
import { createProposal } from '@components/dao-dashboard/newproposal/utils/createProposal'
import ChainGuard from '@components/dao-dashboard/ChainGuard'
import { JSONContent } from '@tiptap/react'
import { Button } from '@components/ui/button'
import { Input } from '@components/ui/input'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@components/ui/card'
import { Loader2 } from 'lucide-react'
import { Address, zeroAddress } from 'viem'

export function ToggleTransfer() {
  // Router
  const params = useParams<{ chainId: string; dao: Address }>()
  const chainId = params ? Number(params.chainId) : 1
  const dao = params?.dao as Address

  const [title, setTitle] = useState<string>()
  const [content, setContent] = useState<JSONContent>()
  const [warning, setWarning] = useState<string>()
  const [loading, setLoading] = useState(false)
  // Contract functions
  const { writeContractAsync } = useWriteContract()
  const { data: paused } = useReadContract({
    address: dao ? dao : zeroAddress,
    abi: KALIDAO_ABI,
    functionName: 'paused',
    chainId: Number(chainId),
  })

  // TODO: Popup to change network if on different network from DAO
  const submit = async () => {
    setLoading(true)
    if (!dao || !chainId || !title) return
    let docs
    try {
      docs = await createProposal(dao as string, Number(chainId), 8, title, content)
    } catch (e) {
      console.error(e)
      setWarning('There was an error in submitting this proposal.')
      return
    }

    try {
      const tx = await writeContractAsync({
        address: dao as `0xstring`,
        abi: KALIDAO_ABI,
        functionName: 'propose',
        args: [
          8, // PAUSE prop
          docs,
          [zeroAddress],
          [0n],
          [],
        ],
      })
    } catch (e) {
      console.log('error', e)
      setWarning('There was an error in submitting this proposal.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="w-full ">
      <CardHeader>
        <CardTitle>Toggle Transfer</CardTitle>
        <CardDescription>
          Submit proposal to pause or unpause DAO token transferability.
          {paused ? 'The token is currently not transferable' : 'The token is currently transferable'}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="title" className="text-sm font-medium">
            Title
          </label>
          <Input id="title" placeholder="Proposal for..." maxLength={30} onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div className="space-y-2">
          <Editor
            setContent={setContent}
            placeholder="You can describe your proposal here."
            label="Details"
            description="Why should the token transferability be flipped?"
          />
        </div>
        {warning && <p className="text-red-500 text-sm">{warning}</p>}
      </CardContent>
      <CardFooter>
        <ChainGuard fallback={<Button className="w-full">Submit</Button>}>
          <Button className="w-full" onClick={submit} disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Submitting...
              </>
            ) : (
              'Submit'
            )}
          </Button>
        </ChainGuard>
      </CardFooter>
    </Card>
  )
}
