import React, { useState } from 'react'
import { useContractWrite, useContractRead } from 'wagmi'
import { Flex, Text, Button } from '../../../../styles/elements'
import { Form, FormElement, Label, Input } from '../../../../styles/form-elements'
import FileUploader from '../../../tools/FileUpload'
import KALIDAO_ABI from '../../../../abi/KaliDAO.json'
import { useRouter } from 'next/router'
import { uploadIpfs } from '../../../tools/ipfsHelpers'
import { AddressZero } from '@ethersproject/constants'
import Back from '../../../../styles/proposal/Back'
import { useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import styles from '../../../editor'
import Editor from '../../../editor'
import { createProposal } from '../../../tools/createProposal'

export default function ToggleTransfer({ setView }) {
  // Router
  const router = useRouter()
  const daoAddress = router.query.dao
  const daoChainId = router.query.chainId

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
  // Contract functions
  const { writeAsync } = useContractWrite(
    {
      addressOrName: daoAddress,
      contractInterface: KALIDAO_ABI,
    },
    'propose',
  )
  const { data: paused } = useContractRead(
    {
      addressOrName: daoAddress,
      contractInterface: KALIDAO_ABI,
    },
    'paused',
    {
      chainId: Number(daoChainId),
    },
  )
  console.log(paused)

  // form
  const [description, setDescription] = useState('')
  const [file, setFile] = useState(null)

  // TODO: Popup to change network if on different network from DAO
  const submit = async (e) => {
    e.preventDefault()

    let docs
    try {
      docs = await createProposal(daoAddress, daoChain, 8, title, editor.getJSON())
    } catch (e) {
      console.error(e)
      setWarning('There was an error in submitting this proposal.')
      return
    }

    // console.log('Proposal Params - ', 8, docs, [AddressZero], [0], [Array(0)])
    try {
      const tx = await writeAsync({
        args: [
          8, // PAUSE prop
          docs,
          [AddressZero],
          [0],
          [Array(0)],
        ],
        overrides: {
          gasLimit: 1050000,
        },
      })
      console.log('tx', tx)
    } catch (e) {
      console.log('error', e)
    }
  }

  return (
    <Flex
      dir="col"
      gap="md"
      css={{
        padding: '20px',
        width: '40vw',
        fontFamily: 'Regular',
      }}
    >
      <Back onClick={() => setView(0)} />
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
        <Label>Description (Optional)</Label>
        <Editor editor={editor} />
      </Flex>
      <Text
        css={{
          fontFamily: 'Regular',
        }}
      >
        Submit proposal to pause or unpause DAO token transferability.{' '}
      </Text>
      <Form>
        <FormElement>
          <Label htmlFor="recipient">Is token transferable?</Label>
          {paused ? <Text>No</Text> : <Text>Yes</Text>}
        </FormElement>
        <Button onClick={submit}>Submit</Button>
      </Form>
    </Flex>
  )
}
