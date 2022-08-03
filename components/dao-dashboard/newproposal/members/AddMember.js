import React, { useState } from 'react'
import { ethers } from 'ethers'
import { useContract, useSigner } from 'wagmi'
import { Flex, Text, Button } from '../../../../styles/elements'
import { Form, FormElement, Label, Input } from '../../../../styles/form-elements'
import FileUploader from '../../../tools/FileUpload'
import KALIDAO_ABI from '../../../../abi/KaliDAO.json'
import { useRouter } from 'next/router'
import { createProposal } from '../../../tools/createProposal'
import Back from '../../../../styles/proposal/Back'
import { AddressZero } from '@ethersproject/constants'

export default function AddMember({ setProposal, editor, title }) {
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
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [recipient, setRecipient] = useState(null)
  const [amount, setAmount] = useState(null)

  // TODO: Popup to change network if on different network from DAO
  const submit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    let amt = ethers.utils.parseEther(amount).toString()

    let docs
    try {
      docs = await createProposal(daoAddress, daoChainId, 0, title, editor.getJSON())
    } catch (e) {
      console.error(e)
      return
    }

    console.log('Proposal Params - ', 0, docs, [recipient], [amt], [Array(0)])

    try {
      const tx = await kalidao.propose(0, docs, [recipient], [amt], [Array(0)])
      console.log('tx', tx)
    } catch (e) {
      console.log('error', e)
    }
    setIsSubmitting(false)
  }

  return (
    <Flex dir="col" gap="md">
      <Text
        css={{
          fontFamily: 'Regular',
        }}
      >
        Mint DAO tokens to a new or existing DAO member
      </Text>
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
        <Back onClick={() => setProposal('membersMenu')} />
        <Button variant="cta" onClick={submit}>
          {isSubmitting ? 'Submitting...' : 'Submit'}
        </Button>
      </Form>
    </Flex>
  )
}
