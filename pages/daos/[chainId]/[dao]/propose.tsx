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
      <Stack>
        <FieldSet legend="Create Proposals">
          <Input
            label="Proposal Title"
            type="text"
            inputMode="text"
            name="id"
            width="2/3"
            placeholder={'Proposal for...'}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <Text>Proposal Description</Text>
          <Editor setContent={setContent} />
          <Text>Instruction</Text>
          <NewProposalModal proposalProp="menu" content={content} title={title} />
        </FieldSet>
      </Stack>
      </Card>
    </Layout>
  )
}
