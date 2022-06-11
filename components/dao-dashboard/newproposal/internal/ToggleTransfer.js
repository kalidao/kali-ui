import React, { useState, useEffect } from 'react'
import { ethers } from 'ethers'
import { useContract, useSigner } from 'wagmi'
import { Flex, Text, Button } from '../../../../styles/elements'
import { Form, FormElement, Label, Input } from '../../../../styles/form-elements'
import FileUploader from '../../../tools/FileUpload'
import KALIDAO_ABI from '../../../../abi/KaliDAO.json'
import { useRouter } from 'next/router'
import { uploadIpfs } from '../../../tools/ipfsHelpers'
import KALIERC20_ABI from '../../../../abi/KaliERC20.json'
import { AddressZero } from '@ethersproject/constants'
import { fetchPaused } from '../../../../utils/fetchPaused'
import Back from '../../../../styles/proposal/Back'

export default function ToggleTransfer({ setProposal }) {
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
  const [status, setStatus] = useState(null)
  const [description, setDescription] = useState('')
  const [file, setFile] = useState(null)

  useEffect(() => {
    const getStatus = async () => {
      const paused = await fetchPaused(daoChainId, daoAddress)
      setStatus(paused)
    }
    getStatus()
  }, [])

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
      const tx = await kalidao.propose(
        8, // PAUSE prop
        docs,
        [AddressZero],
        [0],
        [Array(0)],
      )
      console.log('tx', tx)
    } catch (e) {
      console.log('error', e)
    }
  }

  return (
    <Flex dir="col" gap="md">
      <Text>Submit proposal to restrict or unrestrict DAO token transferability</Text>
      <Form>
        <FormElement>
          <Label htmlFor="recipient">Token Status</Label>
          {status ? <Text>Restricted</Text> : <Text>Unrestricted</Text>}
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
