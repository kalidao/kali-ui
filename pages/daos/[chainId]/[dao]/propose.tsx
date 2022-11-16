import { useState } from 'react'
import Layout from '@components/dao-dashboard/layout'
import { NewProposalModal } from '@components/dao-dashboard/newproposal'
import Editor from '@components/editor'
import { Card, Box, FieldSet, Input, Stack, Text } from '@kalidao/reality'

export default function ProposePage() {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState()

  return (
    <Layout title={'Propose'} content="Create a proposal.">
      <Card padding="6">
        <Stack align="center" space="10">
          <FieldSet legend="Make a Proposal">
            <Input
              label="Title"
              type="text"
              inputMode="text"
              name="id"
              placeholder={'Proposal for...'}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            <Box color="foreground" fontWeight="bold" marginLeft="1.5">
              Description
            </Box>
            <Editor setContent={setContent} />
            <NewProposalModal proposalProp="menu" content={content} title={title} />
          </FieldSet>
        </Stack>
      </Card>
    </Layout>
  )
}
