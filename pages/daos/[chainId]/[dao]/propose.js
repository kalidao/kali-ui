import { useState } from 'react'
import Layout from '../../../../components/dao-dashboard/layout/'
import { Flex, Button } from '../../../../styles/elements'
import { Label, Input } from '../../../../styles/form-elements'
import Editor from '../../../../components/editor'
import { useEditor } from '@tiptap/react'
import { NewProposalModal } from '../../../../components/dao-dashboard/newproposal'
import StarterKit from '@tiptap/starter-kit'
import styles from '../../../../components/editor/editor.module.css'

export default function ProposePage() {
  const [title, setTitle] = useState(null)
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        HTMLAttributes: {
          class: styles.editor,
        },
      }),
    ],
    content: '',
    injectCSS: false,
  })
  return (
    <Layout heading={'Propose'} content="Create a proposal.">
      <Flex
        dir="col"
        gap="md"
        css={{
          width: '100%',
          padding: '20px',
          // height: '100%',
          // minWidth: '80vw',
          // color: '$gray12',
          // borderLeft: '1px solid hsla(0, 0%, 90%, 0.1)',
          // gap: '10px',
          justifyContent: 'flex-start',
          alignItems: 'center',
        }}
      >
        <Flex dir="col" gap="sm">
          <Label>Title</Label>
          <Input
            name="id"
            maxLength={30}
            placeholder={'Proposal for...'}
            onChange={(e) => setTitle(e.target.value)}
            css={{
              minWidth: '39vw',
            }}
          />
        </Flex>
        <Flex dir="col" gap="sm">
          <Label>Description</Label>
          <Editor editor={editor} />
        </Flex>
        <Flex dir="col" gap="sm">
          <Label>Instruction</Label>
          <NewProposalModal proposalProp="menu" editor={editor} title={title} />
        </Flex>
      </Flex>
    </Layout>
  )
}
