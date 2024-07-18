import React, { useEffect, useState } from 'react'
import Layout from '@components/dao-dashboard/layout'
import { Escape } from '@components/dao-dashboard/newproposal/internal'
import { useRouter } from 'next/router'
import Editor from '@components/editor'
import { NextPage } from 'next'
import { Input } from '@components/ui/input'
import { Label } from '@components/ui/label'
import { Card } from '@components/ui/card'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@components/ui/button'
import { JSONContent } from '@tiptap/react'

const DeleteProposalPage: NextPage = () => {
  const router = useRouter()
  const { chainId, dao, proposalId } = router.query
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
