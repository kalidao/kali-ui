import React, { useState } from 'react'
import { useContractWrite } from 'wagmi'
import { Flex, Text, Button, Warning } from '../../../../styles/elements'
import { Form, FormElement, Label, Input } from '../../../../styles/form-elements'
import KALIDAO_ABI from '../../../../abi/KaliDAO.json'
import { useRouter } from 'next/router'
import { AddressZero } from '@ethersproject/constants'
import { createProposal } from '../../../tools/createProposal'

// TODO: Show this along with process proposal
export default function Escape({ kill, title, editor }) {
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

  // TODO: Popup to change network if on different network from DAO
  const submit = async (e) => {
    e.preventDefault()

    let docs
    try {
      docs = await createProposal(daoAddress, daoChain, 10, title, editor.getJSON())
    } catch (e) {
      console.error(e)
      setWarning('There was an error in submitting this proposal.')
      return
    }

    console.log('Proposal Params - ', 10, docs, [AddressZero], [kill], [Array(0)])
      try {
        const tx = await writeAsync({
          args: [
            10, // ESCAPE prop
            docs,
            [AddressZero],
            [kill],
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
        Proposals get stuck sometimes. All we gotta do is remove faulty proposal from the proposal queue, and re-submit
        a valid proposal.{' '}
      </Text>
      <Form>
        <FormElement>
          <Label htmlFor="type">Proposal to Kill</Label>
          <Input disabled={true} defaultValue={kill} />
        </FormElement>
        <Button onClick={submit}>Submit</Button>
      </Form>
    </Flex>
  )
}
