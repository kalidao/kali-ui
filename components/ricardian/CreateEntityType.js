import React from 'react'
import { Flex, Text, Button } from '../../styles/elements'
import { Form, FormElement, Input, Label } from '../../styles/form-elements'

import { useNetwork, useContractWrite } from 'wagmi'
import { useForm } from 'react-hook-form'
import { ethers } from 'ethers'

import { addresses } from '../../constants/addresses'
import RICARDIAN_FACTORY_ABI from '../../abi/RicardianRegistry.json'

export default function CreateEntityType() {
  const { activeChain } = useNetwork()
  const { writeAsync, isLoading } = useContractWrite(
    {
      addressOrName: addresses[activeChain.id]['ricardianFactory'],
      contractInterface: RICARDIAN_FACTORY_ABI,
    },
    'registerRicardian',
  )
  const { handleSubmit, register } = useForm()
  const create = async (data) => {
    console.log(data)
    const { name, symbol, baseURI, mintFee, owner } = data
    try {
      const res = await writeAsync({
        args: [name, symbol, baseURI, ethers.utils.parseEther(mintFee), owner],
      })
      console.log(res)
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <Form onSubmit={handleSubmit(create)}>
      <FormElement
        css={{
          width: '40rem',
        }}
      >
        <Label htmlFor="name">Name</Label>
        <Input
          name="name"
          placeholder="Name of Entity Type Token"
          type="text"
          {...register('name', { required: true })}
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
        <Label htmlFor="symbol">Symbol</Label>
        <Input
          name="symbol"
          placeholder="Symbol of Entity Type Token"
          type="text"
          {...register('symbol', { required: true })}
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
          placeholder="Base URI of Entity Type Token"
          type="text"
          {...register('baseURI', { required: true })}
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
        <Label htmlFor="mintFee">Mint Fee</Label>
        <Input
          name="mintFee"
          placeholder="Mint Fee of Entity Type Token"
          type="number"
          {...register('mintFee', { required: true })}
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
        <Label htmlFor="owner">Owner</Label>
        <Input
          name="owner"
          placeholder="Owner of Entity Type Token"
          type="text"
          {...register('owner', { required: true })}
          css={{
            width: '20rem',
          }}
        />
      </FormElement>
      <Button variant="cta" type="submit" disabled={isLoading}>
        Submit
      </Button>
    </Form>
  )
}
