import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { ethers } from 'ethers'
import { erc20ABI, useContract, useContractRead, useSigner } from 'wagmi'
import { Flex, Text, Button } from '../../../../styles/elements'
import { Form, FormElement, Label, Input, Select } from '../../../../styles/form-elements'
import KALIDAO_ABI from '../../../../abi/KaliDAO.json'
import { addresses } from '../../../../constants/addresses'
import { Warning } from '../../../../styles/elements'
import { AddressZero } from '@ethersproject/constants'
import Back from '../../../../styles/proposal/Back'
import { createProposal } from '../utils/'

export default function RemoveCrowdsale({ setProposal, title, content }) {
  const router = useRouter()
  const daoAddress = router.query.dao
  const chainId = router.query.chainId
  const { data: signer } = useSigner()
  const crowdsaleAddress = addresses[chainId]['extensions']['crowdsale2']

  const kalidao = useContract({
    addressOrName: daoAddress,
    contractInterface: KALIDAO_ABI,
    signerOrProvider: signer,
  })

  const [toggleConfirm, setToggleConfirm] = useState(false)
  const [warning, setWarning] = useState(null)

  const submit = async (e) => {
    e.preventDefault()

    let docs
    try {
      docs = await createProposal(daoAddress, chainId, 9, title, content)
    } catch (e) {
      console.error(e)
      return
    }

    // Prop payload
    let payload
    try {
      const abiCoder = ethers.utils.defaultAbiCoder
      payload = abiCoder.encode(
        ['uint256', 'uint8', 'address', 'uint32', 'uint96', 'uint96', 'string'],
        [0, 1, AddressZero, 946702800, 0, 0, 'none'],
      )
      console.log(payload)
    } catch (e) {
      setWarning('Error formatting crowdsale setExtension() parameters.')
      console.log(e)
      return
    }

    console.log('Proposal Params - ', 9, docs, [crowdsaleAddress], [1], [payload])

    try {
      const tx = await kalidao.propose(
        9, // EXTENSION prop
        docs,
        [crowdsaleAddress],
        [1],
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
        variant="instruction"
        css={{
          fontFamily: 'Regular',
        }}
      >
        The Swap extension allows anyone to atomically swap Ether or ERC20 tokens, e.g., DAI, for KaliDAO tokens.
      </Text>
      <Text
        variant="instruction"
        css={{
          fontFamily: 'Regular',
        }}
      >
        Please confirm and submit this removal proposal to remove current Swap.
      </Text>
      <Form>
        <FormElement>
          <Input
            type={'checkbox'}
            variant="checkbox"
            value={toggleConfirm}
            onChange={() => setToggleConfirm(!toggleConfirm)}
          />
          <Label htmlFor="recipient">Confirm to submit this Swap removal proposal</Label>
        </FormElement>
        {warning && <Warning warning={warning} />}
        <Back onClick={() => setProposal('appsMenu')} />
        <Button
          disabled={!toggleConfirm}
          css={{
            width: '100%',
            height: '3rem',
            fontFamily: 'Regular',
            fontWeight: '800',
            border: '2px solid $gray4',
            borderRadius: '10px',
            '&:hover': {
              background: !toggleConfirm ? 'none' : '$gray10',
            },
            '&:active': {
              transform: 'translate(1px, 1px)',
            },
          }}
          onClick={submit}
        >
          Submit
        </Button>
      </Form>
    </Flex>
  )
}
