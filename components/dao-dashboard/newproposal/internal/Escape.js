import React, { useState, useEffect } from 'react'
import { useContractRead, useContractWrite } from 'wagmi'
import { Flex, Text, Button, Warning } from '../../../../styles/elements'
import { Form, FormElement, Label, Input } from '../../../../styles/form-elements'
import { Select } from '../../../../styles/form-elements/Select'
import FileUploader from '../../../tools/FileUpload'
import KALIDAO_ABI from '../../../../abi/KaliDAO.json'
import { useRouter } from 'next/router'
import { uploadIpfs } from '../../../tools/ipfsHelpers'
import { AddressZero } from '@ethersproject/constants'
import Back from '../../../../styles/proposal/Back'
import { ethers } from 'ethers'

// TODO: Show this along with process proposal
export default function Escape({ setProposal }) {
  // Router
  const router = useRouter()
  const daoAddress = router.query.dao
  const daoChain = router.query.chainId

  // Contract functions
  const { writeAsync } = useContractWrite(
    {
      addressOrName: daoAddress,
      contractInterface: KALIDAO_ABI,
    },
    'propose',
  )
  const { data: _proposalCount } = useContractRead(
    {
      addressOrName: daoAddress,
      contractInterface: KALIDAO_ABI,
    },
    'proposalCount',
    {
      chainId: Number(daoChain),
    },
  )
  const proposalCount = _proposalCount ? _proposalCount.toNumber() : 0
  // Form
  const [proposalSelected, setProposalSelected] = useState(0)
  const [dropdown, setDropdown] = useState(null)
  const [warning, setWarning] = useState(null)
  const [description, setDescription] = useState('')
  const [file, setFile] = useState(null)

  useEffect(() => {
    const populateDropdown = () => {
      let array = []
      for (let i = 1; i <= proposalCount; i++) {
        array.push(
          <Select.Item key={i} value={i}>
            {i}
          </Select.Item>,
        )
        setDropdown([...array])
      }
    }
    populateDropdown()
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
        const tx = await writeAsync({
          args: [
            10, // ESCAPE prop
            docs,
            [AddressZero],
            [proposalSelected],
            [Array(0)],
          ],
          overrides: {
            gasLimit: 1050000,
          },
        })
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
    <Flex
      dir="col"
      gap="md"
      css={{
        maxWidth: '40vw',
      }}
    >
      <Text
        css={{
          fontFamily: 'Regular',
        }}
      >
        Proposals get stuck sometimes. All we gotta do is remove faulty proposals from the proposal queue, and re-submit
        a valid proposal.{' '}
      </Text>
      <Form>
        <FormElement>
          <Label htmlFor="type">Proposal to Kill</Label>
          <Select name="type" onChange={handleProposalChange} defaultValue={proposalSelected}>
            <Select.Item value={0}>Select</Select.Item>
            {dropdown}
          </Select>
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
