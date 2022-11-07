import React, { useState } from 'react'
import { useAccount, useNetwork, useContract, useContractRead, useSigner, erc721ABI, useContractWrite } from 'wagmi'
import { Flex, Text, Button, Warning } from '../../../../styles/elements'
import { Form, FormElement, Label, Input } from '../../../../styles/form-elements'
import { ethers } from 'ethers'
import FileUploader from '../../../tools/FileUpload'
import KALIDAO_ABI from '../../../../abi/KaliDAO.json'
import { useRouter } from 'next/router'
import { isHolder } from '../../../../utils'
import { uploadIpfs } from '../../../tools/ipfsHelpers'
import Back from '../../../../styles/proposal/Back'
import { createProposal } from '../utils/'
import { ProposalProps } from '../utils/types'

export default function SendErc721({ setProposal, title, content }: ProposalProps) {
  const router = useRouter()
  const { dao, chainId } = router.query
  const { data: daoName, isLoading } = useContractRead({
    addressOrName: dao ? (dao as string) : ethers.constants.AddressZero,
    contractInterface: KALIDAO_ABI,
    functionName: 'name',
    chainId: Number(chainId),
  })
  const { isConnected, address } = useAccount()
  const { data: signer } = useSigner()
  const { chain: activeChain } = useNetwork()

  const { write: propose } = useContractWrite({
    mode: 'recklesslyUnprepared',
    addressOrName: dao ? (dao as string) : ethers.constants.AddressZero,
    contractInterface: KALIDAO_ABI,
    functionName: 'propose',
    chainId: Number(chainId),
  })

  // form
  const [tokenAddress, setTokenAddress] = useState<string>()
  const [tokenId, setTokenId] = useState<string>()
  const [recipient, setRecipient] = useState<string>()
  const [warning, setWarning] = useState<string>()

  // TODO: Popup to change network if on different network from DAO
  const submit = async () => {
    const isHolding = await isHolder(Number(chainId), tokenAddress as string, Number(tokenId), dao as string)
    if (isHolding) {
      console.log('DAO is holder')
    } else {
      setWarning(
        `${
          daoName ? (daoName as unknown as string) : 'DAO'
        } does not currently own this ERC721. You may not be able to process proposal.`,
      )
    }
    let iface = new ethers.utils.Interface(erc721ABI)
    let payload = iface.encodeFunctionData('transferFrom', [dao as string, recipient, tokenId])

    let docs
    try {
      docs = await createProposal(dao as string, Number(chainId), 2, title, content)
    } catch (e) {
      console.error(e)
      return
    }

    console.log('Proposal Params - ', 2, docs, [tokenAddress], [0], [payload])

    try {
      console.log(signer)
      const tx = await propose({
        recklesslySetUnpreparedArgs: [
          2, // CALL prop
          docs,
          [tokenAddress],
          [0],
          [payload],
        ],
      })
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
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTokenAddress(e.target.value)}
          />
        </FormElement>
        <FormElement>
          <Label htmlFor="tokenId">Token ID</Label>
          <Input
            name="tokenId"
            type="number"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTokenId(e.target.value)}
          />
        </FormElement>
        <FormElement>
          <Label htmlFor="recipient">Recipient</Label>
          <Input
            name="recipient"
            type="text"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setRecipient(e.target.value)}
          />
        </FormElement>
        {warning && <Warning warning={warning} />}
        <Back onClick={() => setProposal?.('sendMenu')} />
        <Button onClick={submit}>Submit</Button>
      </Form>
    </Flex>
  )
}
