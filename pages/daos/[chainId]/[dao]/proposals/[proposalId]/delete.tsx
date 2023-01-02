import React, { useEffect, useState } from 'react'
import Layout from '@components/dao-dashboard/layout'
import { Escape } from '@components/dao-dashboard/newproposal/internal'
import { Input, Text, Stack, Card } from '@kalidao/reality'
import { useRouter } from 'next/router'
import Editor from '@components/editor'
import { NextPage } from 'next'
import Back from '@design/proposal/Back'
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
      <Card padding="6">
        <Stack direction={'horizontal'} align="flex-start" justify={'center'}>
          <Back onClick={goBack} />
          <Stack>
            <Input
              label="Title"
              name="id"
              maxLength={30}
              placeholder={'Proposal for...'}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
              required
            />
            <Text variant="label">Description (Optional)</Text>
            <Editor setContent={setContent} />
            <Escape
              dao={dao as string}
              chainId={Number(chainId)}
              title={title}
              content={content}
              kill={Number(proposalId)}
            />
          </Stack>
        </Stack>
      </Card>
    </Layout>
  )
}

export default DeleteProposalPage
