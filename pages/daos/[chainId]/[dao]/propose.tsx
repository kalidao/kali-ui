import { useState } from 'react'
import Layout from '@components/dao-dashboard/layout'
import { NewProposalModal } from '@components/dao-dashboard/newproposal'
import Editor from '@components/editor'
import { Box, FieldSet, Input, Text } from '@kalidao/reality'

export default function ProposePage() {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState()

  return (
    <Layout heading={'Propose'} content="Create a proposal.">
      <Box minHeight="96" width="320">
        <FieldSet legend="Create Proposals">
          <Input
            label="Title"
            type="text"
            inputMode="text"
            name="id"
            width="2/3"
            placeholder={'Proposal for...'}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <Text>Description</Text>
          <Editor setContent={setContent} />
          <Text>Instruction</Text>
          <NewProposalModal proposalProp="menu" content={content} title={title} />
        </FieldSet>
      </Box>
    </Layout>
  )
}
