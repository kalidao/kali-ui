import { useState } from 'react'
import Layout from '@components/dao-dashboard/layout'
import { NewProposalModal } from '@components/dao-dashboard/newproposal'
import Editor from '@components/editor'
import { useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { Box, FieldSet, Input, Text } from '@kalidao/reality'

export default function ProposePage() {
  const [title, setTitle] = useState('')
  const editor = useEditor({
    extensions: [StarterKit as any],
    content: `
      <p>
        Provide a detailed description of your proposal here!
      </p>
    `,
  })
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
          <Editor editor={editor} />
          <Text>Instruction</Text>
          <NewProposalModal proposalProp="menu" editor={editor} title={title} />
        </FieldSet>
      </Box>
    </Layout>
  )
}
