import React, { useState, useEffect } from 'react'
import { useContract, useSigner } from 'wagmi'
import { Flex, Text, Button, Warning } from '../../../../styles/elements'
import { Form, FormElement, Label, Input } from '../../../../styles/form-elements'
import FileUploader from '../../../tools/FileUpload'
import KALIDAO_ABI from '../../../../abi/KaliDAO.json'
import { useRouter } from 'next/router'
import { uploadIpfs } from '../../../tools/ipfsHelpers'
import { AddressZero } from '@ethersproject/constants'
import Back from '../../../../styles/proposal/Back'

export default function UpdateQuorum({ setProposal }) {
  const router = useRouter()
  const daoAddress = router.query.dao
  const daoChain = router.query.chainId
  const { data: signer } = useSigner()

  const kalidao = useContract({
    addressOrName: daoAddress,
    contractInterface: KALIDAO_ABI,
    signerOrProvider: signer,
  })

  // form
  const [quorum, setQuorum] = useState(null)
  const [warning, setWarning] = useState(null)
  const [description, setDescription] = useState('')
  const [file, setFile] = useState(null)

  // TODO: Popup to change network if on different network from DAO
  const submit = async (e) => {
    e.preventDefault()

    let docs
    if (file) {
      docs = await uploadIpfs(daoAddress, 'Quorum Proposal', file)
    } else {
      docs = description
    }

    console.log('Proposal Params - ', 2, docs, [AddressZero], [quorum], [Array(0)])

    if (quorum) {
      try {
        const tx = await kalidao.propose(
          5, // QUORUM prop
          docs,
          [AddressZero],
          [quorum],
          [Array(0)],
        )
        console.log('tx', tx)
      } catch (e) {
        console.log('error', e)
      }
    } else {
      setWarning('Please set a quorum.')
    }
  }

  return (
    <Flex dir="col" gap="md">
      {/* <Text>Update proposal voting period</Text> */}
      <Form>
        <FormElement>
          <Label htmlFor="recipient">Current Quorum</Label>
          <Text>50%</Text>
        </FormElement>
        <FormElement>
          <Label htmlFor="recipient">New quorum</Label>
          <Input name="recipient" type="number" defaultValue={quorum} onChange={(e) => setQuorum(e.target.value)} />
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
        {warning && <Warning warning={warning} />}
        <Back onClick={() => setProposal('internalMenu')} />
        <Button onClick={submit}>Submit</Button>
      </Form>
    </Flex>
  )
}
