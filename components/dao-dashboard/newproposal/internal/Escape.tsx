import React, { useState } from 'react'
import { useContractWrite } from 'wagmi'
import { Flex, Text, Button, Warning } from '@design/elements'
import { Form, FormElement, Label, Input } from '@design/form-elements'
import KALIDAO_ABI from '../../../../abi/KaliDAO.json'
import { useRouter } from 'next/router'
import { AddressZero } from '@ethersproject/constants'
import { createProposal } from '../utils/'

type EscapeProps = {
  dao: string
  chainId: number
  kill: number
  title: string
  content: { [key: string]: any } | undefined
}

// TODO: Show this along with process proposal
export default function Escape({ dao, chainId, kill, title, content }: EscapeProps) {
  // Contract functions
  const { writeAsync: propose } = useContractWrite({
    mode: 'recklesslyUnprepared',
    address: dao,
    abi: KALIDAO_ABI,
    functionName: 'propose',
    chainId: chainId,
  })

  // State
  const [warning, setWarning] = useState('')

  // TODO: Popup to change network if on different network from DAO
  const submit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()

    let docs
    try {
      docs = await createProposal(dao, chainId, 10, title, content)
    } catch (e) {
      console.error(e)
      setWarning('There was an error in submitting this proposal.')
      return
    }

    console.log('Proposal Params - ', 10, docs, [AddressZero], [kill], [Array(0)])
    try {
      const tx = propose({
        recklesslySetUnpreparedArgs: [
          10, // ESCAPE prop
          docs,
          [AddressZero],
          [kill],
          [Array(0)],
        ],
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
        {warning !== '' && <Warning warning={warning} />}
        <Button onClick={submit}>Submit</Button>
      </Form>
    </Flex>
  )
}
