import React, { useState } from 'react'
import { Flex, Text, Button } from '../../styles/elements'
import { Form, FormElement, Input, Label } from '../../styles/form-elements'
import { useContractWrite } from 'wagmi'
import RICARDIAN_ABI from '../../abi/Ricardian.json'
import { useForm } from 'react-hook-form'
import { AddressZero } from '@ethersproject/constants'

export default function Mint() {
  const [address, setAddress] = useState(AddressZero)
  const { data, isLoading, writeAsync } = useContractWrite(
    {
      addressOrName: address,
      contractInterface: RICARDIAN_ABI,
    },
    'ownerSetBaseURI',
  )
  const { handleSubmit, register } = useForm()

  const updateBaseURI = async (data) => {
    const { baseURI } = data

    try {
      const res = await writeAsync({
        args: [baseURI],
      })
      console.log(res)
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <Form onSubmit={handleSubmit(updateBaseURI)}>
      <FormElement
        css={{
          width: '40rem',
        }}
      >
        <Label htmlFor="contract">Contract</Label>
        <Input
          name="contract"
          placeholder="Contract Address"
          type="text"
          onChange={(e) => setAddress(e.target.value)}
          css={{
            width: '20rem',
          }}
        />
      </FormElement>
      <FormElement
        css={{
          width: '40rem',
        }}
      >
        <Label htmlFor="baseURI">Base URI</Label>
        <Input
          name="baseURI"
          placeholder="Updated Base URI"
          type="text"
          {...register('baseURI', { required: true })}
          css={{
            width: '20rem',
          }}
        />
      </FormElement>
      <Button variant="cta" type="submit" disabled={isLoading}>
        Update Base URI
      </Button>
    </Form>
  )
}
