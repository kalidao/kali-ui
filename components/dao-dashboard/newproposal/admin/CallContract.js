import React, { useState } from 'react'
import { useAccount, useNetwork, useContract, useSigner, erc20ABI, useContractRead } from 'wagmi'
import { Flex, Text, Button } from '../../../../styles/elements'
import { Form, FormElement, Label, Input } from '../../../../styles/form-elements'
import { ethers } from 'ethers'
import { Select } from '../../../../styles/form-elements/Select'
import FileUploader from '../../../tools/FileUpload'
import KALIDAO_ABI from '../../../../abi/KaliDAO.json'
import { useRouter } from 'next/router'
import { uploadIpfs } from '../../../tools/ipfsHelpers'
import { tokens } from '../../../../constants/tokens'

export default function CallContract() {
  const router = useRouter()
  const daoAddress = router.query.dao
  const daoChainId = router.query.chainId
  const { data: daoName, isLoading } = useContractRead(
    {
      addressOrName: daoAddress,
      contractInterface: KALIDAO_ABI,
    },
    'name',
    {
      chainId: Number(daoChainId),
    },
  )
  const { data: account } = useAccount()
  const { data: signer } = useSigner()
  const { activeChain } = useNetwork()

  const kalidao = useContract({
    addressOrName: daoAddress,
    contractInterface: KALIDAO_ABI,
    signerOrProvider: signer,
  })

  // form
  const [contractAddress, setContractAddress] = useState(null)
  const [contractAbi, setContractAbi] = useState(null)
  const [description, setDescription] = useState('')
  const [file, setFile] = useState(null)

  const handleParse = async (abi) => {
    console.log(abi)
  }

  // TODO: Popup to change network if on different network from DAO
  const submit = async (e) => {
    e.preventDefault()

    let docs
    if (file) {
      docs = await uploadIpfs(daoAddress, 'Send ERC20 Proposal', file)
    } else {
      docs = description
    }

    console.log('Proposal Params - ', 2, docs, [asset], [0], [payload])

    try {
      const tx = await kalidao.propose(
        2, // CALL prop
        docs,
        [asset],
        [0],
        [payload],
      )
      console.log('tx', tx)
    } catch (e) {
      console.log('error', e)
    }
  }

  return (
    <Flex dir="col" gap="md">
      <Text>Send ERC20s from {daoName} treasury</Text>
      <Form>
        <FormElement>
          <Label htmlFor="contractAddress">Contract Address</Label>
          <Input
            name="contractAddress"
            type="text"
            defaultValue={contractAddress}
            onChange={(e) => setContractAddress(e.target.value)}
          />
        </FormElement>
        <FormElement variant="vertical">
          <Label htmlFor="description">Contract ABI</Label>
          <Input
            as="textarea"
            name="description"
            type="text"
            defaultValue={contractAbi}
            onChange={(e) => setContractAbi(e.target.value)}
            css={{ padding: '0.5rem', width: '97%', height: '10vh' }}
          />
          <button onClick={handleParse}>Parse ABI</button>
        </FormElement>
        {/* <FormElement>
          <Label htmlFor="amount">Amount</Label>
          <Input name="amount" type="number" defaultValue={amount} onChange={(e) => setAmount(e.target.value)} />
        </FormElement> */}
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
        <Button onClick={submit}>Submit</Button>
      </Form>
    </Flex>
  )
}
