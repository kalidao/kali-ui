import React, { useState } from 'react'
import { ethers } from 'ethers'
import { useContract, useSigner } from 'wagmi'
import { Flex, Text, Button } from '../../../../styles/elements'
import { Form, FormElement, Label, Input } from '../../../../styles/form-elements'
import FileUploader from '../../../tools/FileUpload'
import KALIDAO_ABI from '../../../../abi/KaliDAO.json'
import { useRouter } from 'next/router'
import { uploadIpfs } from '../../../tools/ipfsHelpers'
import Back from '../../../../styles/proposal/Back'
import { AddressZero } from '@ethersproject/constants'

export default function AddMember({ setProposal }) {
  const router = useRouter()
  const daoAddress = router.query.dao
  const daoChainId = router.query.chainId
  const { data: signer } = useSigner()

  const kalidao = useContract({
    addressOrName: daoAddress,
    contractInterface: KALIDAO_ABI,
    signerOrProvider: signer,
  })

  // form
  const [recipient, setRecipient] = useState(null)
  const [amount, setAmount] = useState(null)
  const [description, setDescription] = useState('')
  const [file, setFile] = useState(null)

  // TODO: Popup to change network if on different network from DAO
  const submit = async (e) => {
    e.preventDefault()

    amount = ethers.utils.parseEther(amount).toString()

    let docs
    if (file) {
      docs = await uploadIpfs(daoAddress, 'Add Member Proposal', file)
    } else {
      docs = description
    }

    console.log('Proposal Params - ', 0, docs, [recipient], [amount], [Array(0)])

    try {
      const tx = await kalidao.propose(0, docs, [recipient], [amount], [Array(0)])
      console.log('tx', tx)
    } catch (e) {
      console.log('error', e)
    }
  }

  return (
    <Flex dir="col" gap="md">
      <Text>Mint DAO tokens to a new or existing DAO member</Text>
      <Form>
        <FormElement>
          <Label htmlFor="recipient">Recipient</Label>
          <Input
            name="recipient"
            type="text"
            placeholder={AddressZero}
            defaultValue={recipient}
            onChange={(e) => setRecipient(e.target.value)}
          />
        </FormElement>
        <FormElement>
          <Label htmlFor="amount">Amount</Label>
          <Input
            name="amount"
            type="number"
            placeholder="1000"
            defaultValue={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </FormElement>
        <FormElement variant="vertical">
          <Label htmlFor="description">Proposal Note</Label>
          <Input
            as="textarea"
            name="description"
            placeholder="Add a note to the proposal"
            type="text"
            defaultValue={description}
            onChange={(e) => setDescription(e.target.value)}
            css={{ padding: '0.5rem', width: '97%', height: '10vh' }}
          />
        </FormElement>
        <Flex gap="sm" align="end" effect="glow">
          <FileUploader setFile={setFile} />
        </Flex>
        <Back onClick={() => setProposal('membersMenu')} />
        <Button variant="cta" onClick={submit}>
          Submit
        </Button>
      </Form>
    </Flex>
  )
}
