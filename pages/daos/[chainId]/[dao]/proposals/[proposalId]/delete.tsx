import React, { useEffect, useState } from 'react'
import Layout from '@components/dao-dashboard/layout'
import { Escape } from '@components/dao-dashboard/newproposal/internal'
import { Button, Flex } from '@design/elements'
import { Label, Input } from '@design/form-elements'
import { ArrowLeftIcon } from '@radix-ui/react-icons'
import { useRouter } from 'next/router'
import { useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import styles from '@components/editor/editor.module.css'
import Editor from '@components/editor'
import { NextPage } from 'next'

const DeleteProposalPage: NextPage = () => {
  const router = useRouter()
  const { chainId, dao, proposalId } = router.query
  const [title, setTitle] = useState('')
  const editor = useEditor({
    editorProps: {
      attributes: {
        class: styles.editor,
      },
    },
    extensions: [
      StarterKit.configure(),
    ],
    content: '',
    injectCSS: false,
  })

  useEffect(() => {
    router.prefetch(`/daos/${chainId}/${dao}/${proposalId}`)
  }, [chainId, dao, router])

  const goBack = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()

    router.push(`/daos/${chainId}/${dao}/${proposalId}`)
  }

  return (
    <Layout heading={`Delete Proposal #${proposalId} `} content="Delete the proposal to remove it from the queue.">
      <Flex
        dir="col"
        gap="md"
        css={{
          padding: '20px',
          flexDirection: 'column',
          height: '100%',
          minWidth: '80vw',
          color: '$gray12',
          borderLeft: '1px solid hsla(0, 0%, 90%, 0.1)',
          gap: '10px',
          justifyContent: 'flex-start',
          alignItems: 'center',
          fontFamily: 'Regular',
        }}
      >
        <Button
          variant="transparent"
          effect="film"
          css={{
            position: 'absolute',
            left: '2rem',
            color: '$gray100',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '0.2em',
            maxWidth: '5em',
            fontWeight: '500',
          }}
          onClick={goBack}
        >
          <ArrowLeftIcon />
          Back
        </Button>
        <Flex dir="col" gap="sm">
          <Label>Title</Label>
          <Input
            name="id"
            maxLength={30}
            placeholder={'Proposal for...'}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
            css={{
              minWidth: '39vw',
            }}
          />
        </Flex>
        <Flex dir="col" gap="sm">
          <Label>Description (Optional)</Label>
          <Editor editor={editor} />
        </Flex>
        <Escape dao={dao as string} chainId={Number(chainId)} title={title} editor={editor} kill={Number(proposalId)} />
      </Flex>
    </Layout>
  )
}

export default DeleteProposalPage