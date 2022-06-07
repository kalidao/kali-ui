import React, { useState, useEffect } from 'react'
import { useContract, useSigner, useContractRead } from 'wagmi'
import { Flex, Text, Button, Warning } from '../../../../styles/elements'
import { Form, FormElement, Label, Input } from '../../../../styles/form-elements'
import { Select } from '../../../../styles/form-elements/Select'
import FileUploader from '../../../tools/FileUpload'
import KALIDAO_ABI from '../../../../abi/KaliDAO.json'
import { useRouter } from 'next/router'
import { uploadIpfs } from '../../../tools/ipfsHelpers'
import { AddressZero } from '@ethersproject/constants'
import { votingPeriodToSeconds, formatVotingPeriod } from '../../../../utils'
import { fetchProposalCount } from '../../../../utils/fetchProposalCount'

export default function Escape() {
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
  const [proposalSelected, setProposalSelected] = useState(0)
  const [dropdown, setDropdown] = useState(null)
  const [warning, setWarning] = useState(null)
  const [description, setDescription] = useState('')
  const [file, setFile] = useState(null)

  useEffect(() => {
    const getProposalCount = async () => {
      let count = await fetchProposalCount(daoChain, daoAddress)
      console.log('Proposal count is - ', count)
      let array = []
      for (let i = 1; i <= count; i++) {
        array.push(
          <Select.Item key={i} value={i}>
            {i}
          </Select.Item>,
        )
        setDropdown([...array])
      }
    }
    getProposalCount()
  }, [])

  // TODO: Popup to change network if on different network from DAO
  const submit = async (e) => {
    e.preventDefault()

    let docs
    if (file) {
      docs = await uploadIpfs(daoAddress, 'Voting Period Proposal', file)
    } else {
      docs = description
    }

    console.log('Proposal Params - ', 10, docs, [AddressZero], [proposalSelected], [Array(0)])
    if (proposalSelected != 0) {
      try {
        const tx = await kalidao.propose(
          10, // ESCAPE prop
          docs,
          [AddressZero],
          [proposalSelected],
          [Array(0)],
        )
        console.log('tx', tx)
      } catch (e) {
        console.log('error', e)
      }
      setWarning(null)
    } else {
      setWarning('Please select a proposal number.')
    }
  }

  const handleProposalChange = (e) => {
    console.log(e.target.value)
    setProposalSelected(e.target.value)
  }

  return (
    <Flex dir="col" gap="md">
      <Text>Escape proposal can help with unstucking a proposal</Text>
      <Form>
        <FormElement>
          <Label htmlFor="type">Proposal to Kill</Label>
          <Select name="type" onChange={handleProposalChange} defaultValue={proposalSelected}>
            <Select.Item value={0}>Select</Select.Item>
            {dropdown}
          </Select>
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
        <Button onClick={submit}>Submit</Button>
      </Form>
    </Flex>
  )
}
