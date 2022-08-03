import React, { useState } from 'react'
import { useContract, useSigner, useContractRead } from 'wagmi'
import { Flex, Text, Button, Warning } from '../../../../styles/elements'
import { Form, FormElement, Label, Input } from '../../../../styles/form-elements'
import { Select } from '../../../../styles/form-elements/Select'
import FileUploader from '../../../tools/FileUpload'
import KALIDAO_ABI from '../../../../abi/KaliDAO.json'
import { useRouter } from 'next/router'
import { uploadIpfs } from '../../../tools/ipfsHelpers'
import { AddressZero } from '@ethersproject/constants'
import { votingPeriodToSeconds, formatVotingPeriod } from '../../../../utils'
import Spinner from '../../../elements/Spinner'
import Back from '../../../../styles/proposal/Back'
import { useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import styles from '../../../editor'
import Editor from '../../../editor'
import { createProposal } from '../../../tools/createProposal'

export default function UpdateVotingPeriod({ setView }) {
  const router = useRouter()
  const daoAddress = router.query.dao
  const daoChain = router.query.chainId
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
  const { data: signer } = useSigner()
  const kalidao = useContract({
    addressOrName: daoAddress,
    contractInterface: KALIDAO_ABI,
    signerOrProvider: signer,
  })
  const { data: votingPeriod, isWaitingVotingPeriod } = useContractRead(
    {
      addressOrName: daoAddress,
      contractInterface: KALIDAO_ABI,
    },
    'votingPeriod',
    {
      chainId: Number(daoChain),
    },
  )

  // form
  const [unit, setUnit] = useState('min')
  const [duration, setDuration] = useState(null)
  const [warning, setWarning] = useState(null)

  // TODO: Popup to change network if on different network from DAO
  const submit = async (e) => {
    e.preventDefault()

    const seconds = votingPeriodToSeconds(duration, unit)

    let docs
    try {
      docs = await createProposal(daoAddress, daoChain, 3, title, editor.getJSON())
    } catch (e) {
      console.error(e)
      setWarning('There was an error in submitting this proposal.')
      return
    }

    // console.log('Proposal Params - ', 2, docs, [AddressZero], [seconds], [Array(0)])
    if (seconds) {
      try {
        const tx = await kalidao.propose(
          3, // VPERIOD prop
          docs,
          [AddressZero],
          [seconds],
          [Array(0)],
        )
        console.log('tx', tx)
      } catch (e) {
        console.log('error', e)
      }
    } else {
      setWarning('Please set a duration.')
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
      <Text>Update proposal voting period</Text>
      <Form>
        <FormElement>
          <Label htmlFor="recipient">Current Voting Period</Label>
          <Text>{isWaitingVotingPeriod ? <Spinner /> : formatVotingPeriod(votingPeriod)}</Text>
        </FormElement>
        <FormElement>
          <Label htmlFor="recipient">Duration</Label>
          <Input
            name="recipient"
            type="number"
            min="0"
            placeholder="30"
            defaultValue={duration}
            onChange={(e) => setDuration(e.target.value)}
          />
        </FormElement>
        <FormElement>
          <Label htmlFor="type">Unit</Label>
          <Select name="type" onValueChange={(value) => setUnit(value)} defaultValue={unit}>
            <Select.Item value="min">minute</Select.Item>
            <Select.Item value="hour">hour</Select.Item>
            <Select.Item value="day">day</Select.Item>
          </Select>
        </FormElement>
        {warning && <Warning warning={warning} />}
        <Button onClick={submit}>Submit</Button>
      </Form>
    </Flex>
  )
}
