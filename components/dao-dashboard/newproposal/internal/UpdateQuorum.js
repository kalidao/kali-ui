import React, { useState, useEffect } from 'react'
import { useContract, useContractRead, useSigner } from 'wagmi'
import { Flex, Text, Button, Warning } from '../../../../styles/elements'
import { Form, FormElement, Label, Input } from '../../../../styles/form-elements'
import FileUploader from '../../../tools/FileUpload'
import KALIDAO_ABI from '../../../../abi/KaliDAO.json'
import { useRouter } from 'next/router'
import { uploadIpfs } from '../../../tools/ipfsHelpers'
import { AddressZero } from '@ethersproject/constants'
import Back from '../../../../styles/proposal/Back'

export default function UpdateQuorum({ setView }) {
  const router = useRouter()
  const daoAddress = router.query.dao
  const daoChain = router.query.chainId
  const { data: currentQuorum } = useContractRead(
    {
      addressOrName: daoAddress,
      contractInterface: KALIDAO_ABI,
    },
    'quorum',
    {
      chainId: Number(daoChain),
    },
  )
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
    <Flex
      dir="col"
      gap="md"
      css={{
        padding: '20px',
        width: '60vw',
        fontFamily: 'Regular',
      }}
    >
      <Back onClick={() => setView(0)} />
      <Text
        css={{
          fontFamily: 'Regular',
        }}
      >
        Update participation required for a proposal to pass.
      </Text>
      <Form>
        <FormElement>
          <Label htmlFor="recipient">Current</Label>
          <Text>{currentQuorum}%</Text>
        </FormElement>
        <FormElement>
          <Label htmlFor="recipient">Changing to</Label>
          <Input
            name="recipient"
            placeholder="20"
            type="number"
            defaultValue={quorum}
            onChange={(e) => setQuorum(e.target.value)}
          />
        </FormElement>
        {warning && <Warning warning={warning} />}
        <Button onClick={submit}>Submit</Button>
      </Form>
    </Flex>
  )
}
