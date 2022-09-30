import React, { useState } from 'react'
import { useAccount, useNetwork, useContract, useContractRead, useSigner, erc721ABI } from 'wagmi'
import { Flex, Text, Button, Warning } from '../../../../styles/elements'
import { Form, FormElement, Label, Input } from '../../../../styles/form-elements'
import { ethers } from 'ethers'
import FileUploader from '../../../tools/FileUpload'
import KALIDAO_ABI from '../../../../abi/KaliDAO.json'
import { useRouter } from 'next/router'
import { isHolder } from '../../../../utils'
import { uploadIpfs } from '../../../tools/ipfsHelpers'
import Back from '../../../../styles/proposal/Back'
import { createProposal } from '../utils/createProposal.ts'

export default function SendErc721({ setProposal, title, editor }) {
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
  const [tokenAddress, setTokenAddress] = useState(null)
  const [tokenId, setTokenId] = useState(null)
  const [recipient, setRecipient] = useState(null)
  const [description, setDescription] = useState('')
  const [file, setFile] = useState(null)
  const [warning, setWarning] = useState()

  // TODO: Popup to change network if on different network from DAO
  const submit = async (e) => {
    e.preventDefault()

    const isHolding = await isHolder(daoChainId, tokenAddress, tokenId, daoAddress)
    if (isHolding) {
      console.log('DAO is holder')
    } else {
      setWarning(
        `${daoName ? daoName : 'DAO'} does not currently own this ERC721. You may not be able to process proposal.`,
      )
    }
    let iface = new ethers.utils.Interface(erc721ABI)
    let payload = iface.encodeFunctionData('transferFrom', [daoAddress, recipient, tokenId])

    let docs
    try {
      docs = await createProposal(daoAddress, daoChainId, 2, title, editor.getJSON())
    } catch (e) {
      console.error(e)
      return
    }

    console.log('Proposal Params - ', 2, docs, [tokenAddress], [0], [payload])

    try {
      console.log(signer)
      const tx = await kalidao.propose(
        2, // CALL prop
        docs,
        [tokenAddress],
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
      <Text
        css={{
          fontFamily: 'Regular',
        }}
      >
        Send an ERC721 from {daoName} treasury
      </Text>
      <Form>
        <FormElement>
          <Label htmlFor="contractAddress">ERC721 Contract Address</Label>
          <Input
            name="contractAddress"
            type="text"
            defaultValue={tokenAddress}
            onChange={(e) => setTokenAddress(e.target.value)}
          />
        </FormElement>
        <FormElement>
          <Label htmlFor="tokenId">Token ID</Label>
          <Input name="tokenId" type="number" defaultValue={tokenId} onChange={(e) => setTokenId(e.target.value)} />
        </FormElement>
        <FormElement>
          <Label htmlFor="recipient">Recipient</Label>
          <Input name="recipient" type="text" defaultValue={recipient} onChange={(e) => setRecipient(e.target.value)} />
        </FormElement>
        {warning && <Warning warning={warning} />}
        <Back onClick={() => setProposal('sendMenu')} />
        <Button onClick={submit}>Submit</Button>
      </Form>
    </Flex>
  )
}
