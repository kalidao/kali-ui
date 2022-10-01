import React, { useState } from 'react'
import { ethers } from 'ethers'
import { useContract, useContractRead, useSigner } from 'wagmi'
import { Flex, Text, Button } from '../../../../styles/elements'
import { Form, FormElement, Label, Input } from '../../../../styles/form-elements'
import FileUploader from '../../../tools/FileUpload'
import KALIDAO_ABI from '../../../../abi/KaliDAO.json'
import { useRouter } from 'next/router'
import { uploadIpfs } from '../../../tools/ipfsHelpers'
import Back from '../../../../styles/proposal/Back'
import { createProposal } from '../utils/'
import { ProposalProps } from '../utils/types'

export default function SendEth({ setProposal, title, content }: ProposalProps) {
  const router = useRouter()
  const { dao: daoAddress, chainId: daoChainId } = router.query
  const { data: daoName, isLoading } = useContractRead({
    addressOrName: daoAddress ? (daoAddress as string) : ethers.constants.AddressZero,
    contractInterface: KALIDAO_ABI,
    functionName: 'name',
    chainId: Number(daoChainId),
  })
  const { data: signer } = useSigner()

  const kalidao = useContract({
    addressOrName: daoAddress ? (daoAddress as string) : ethers.constants.AddressZero,
    contractInterface: KALIDAO_ABI,
    signerOrProvider: signer,
  })

  // form
  const [recipient, setRecipient] = useState<string>()
  const [amount, setAmount] = useState<string>()

  // TODO: Popup to change network if on different network from DAO
  const submit = async () => {
    if (!amount) return
    let amt = amount && ethers.utils.parseEther(amount).toString()

    let docs
    try {
      docs = await createProposal(daoAddress as string, Number(daoChainId), 2, title, content)
    } catch (e) {
      console.error(e)
      return
    }

    console.log('Proposal Params - ', 2, docs, [recipient], [amt], [Array(0)])

    try {
      const tx = await kalidao.propose(
        2, // CALL prop
        docs,
        [recipient],
        [amt],
        [Array(0)],
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
        Send ETH from {daoName} treasury
      </Text>
      <Form>
        <FormElement>
          <Label htmlFor="recipient">Recipient</Label>
          <Input
            name="recipient"
            type="text"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setRecipient(e.target.value)}
          />
        </FormElement>
        <FormElement>
          <Label htmlFor="amount">Amount</Label>
          <Input
            name="amount"
            type="number"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAmount(e.target.value)}
          />
        </FormElement>
        <Back onClick={() => setProposal?.('sendMenu')} />
        <Button onClick={submit}>Submit</Button>
      </Form>
    </Flex>
  )
}
