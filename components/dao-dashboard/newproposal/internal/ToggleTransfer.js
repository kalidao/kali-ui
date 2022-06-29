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

export default function ToggleTransfer({ setProposal }) {
  // Router
  const router = useRouter()
  const daoAddress = router.query.dao
  const daoChainId = router.query.chainId

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
    if (file) {
      docs = await uploadIpfs(daoAddress, 'Pause Proposal', file)
    } else {
      docs = description
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
    <Flex dir="col" gap="md">
      <Text>Submit proposal to pause or unpause DAO token transferability. </Text>
      <Form>
        <FormElement>
          <Label htmlFor="recipient">Is token transferable?</Label>
          {paused ? <Text>No</Text> : <Text>Yes</Text>}
        </FormElement>
        <FormElement variant="vertical">
          <Label htmlFor="description">Proposal Note</Label>
          <Input
            as="textarea"
            name="description"
            type="text"
            defaultValue={description}
            onChange={(e) => setDescription(e.target.value)}
            css={{ padding: '0.5rem', width: '97%', height: '10vh' }}
          />
        </FormElement>
        <Flex gap="sm" align="end" effect="glow">
          <FileUploader setFile={setFile} />
        </Flex>
        <Back onClick={() => setProposal('internalMenu')} />
        <Button onClick={submit}>Submit</Button>
      </Form>
    </Flex>
  )
}
