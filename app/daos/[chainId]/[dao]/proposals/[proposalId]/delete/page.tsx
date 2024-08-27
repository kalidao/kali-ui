'use client'
import React, { useEffect, useState } from 'react'
import Layout from '@components/dao-dashboard/layout'
import { Escape } from '@components/dao-dashboard/newproposal/internal'
import { useParams, useRouter } from 'next/navigation'
import Editor from '@components/editor'
import { NextPage } from 'next'
import { Input } from '@components/ui/input'
import { Label } from '@components/ui/label'
import { Card } from '@components/ui/card'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@components/ui/button'
import { JSONContent } from '@tiptap/react'
import { Address } from 'viem'

const DeleteProposalPage: NextPage = () => {
  const router = useRouter()
  const params = useParams<{ chainId: string; dao: Address; proposalId: string }>()
  const chainId = params ? Number(params.chainId) : 1
  const dao = params?.dao as Address
  const proposalId = params ? Number(params.proposalId) : 0
  const [title, setTitle] = useState('')
  const [content, setContent] = useState<JSONContent>()

  useEffect(() => {
    router.prefetch(`/daos/${chainId}/${dao}/${proposalId}`)
  }, [chainId, dao, router, proposalId])

  const goBack = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    router.push(`/daos/${chainId}/${dao}/proposals/${proposalId}`)
  }

  return (
    <Layout title={`Delete Proposal #${proposalId} `} content="Delete the proposal to remove it from the queue.">
      <Card className="p-6">
        <div className="flex flex-col items-start justify-center space-y-4">
          <Button variant="ghost" onClick={goBack} className="mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back
          </Button>
          <div className="w-full space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                name="id"
                maxLength={30}
                placeholder={'Proposal for...'}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label>Description (Optional)</Label>
              <Editor setContent={setContent} />
            </div>
            <Escape
              dao={dao as string}
              chainId={Number(chainId)}
              title={title}
              content={content}
              kill={Number(proposalId)}
            />
          </div>
        </div>
      </Card>
    </Layout>
  )
}

export default DeleteProposalPage
