import React from 'react'
import { Flex, Text, Button } from '../../styles/elements'
import { Form, FormElement, Input, Label } from '../../styles/form-elements'
import { useContractRead, useContractWrite } from 'wagmi'
import RICARDIAN_ABI from '../../abi/Ricardian.json'
import { useForm } from 'react-hook-form'
import { ethers } from 'ethers'

export default function Mint() {
  const { data, isLoading, writeAsync } = useContractWrite(
    {
      addressOrName: '0x46079087d42acb6e1104eda63e6a51b10db709bc',
      contractInterface: RICARDIAN_ABI,
    },
    'mint',
  )
  const { data: baseURI, status } = useContractRead(
    {
      addressOrName: '0x46079087d42acb6e1104eda63e6a51b10db709bc',
      contractInterface: RICARDIAN_ABI,
    },
    'uri',
    {
      args: 3,
    },
  )
  console.log('baseURI', baseURI, status)
  const { handleSubmit, register } = useForm()

  const mint = async (data) => {
    console.log(data)
    const { to, tokenID, manager } = data
    const amount = 1
    const nftData = ethers.constants.HashZero
    const tokenURI = 'ipfs://bafybeibg26r6agfztqcopnv6sgm7zfzfhpjpuhyuk4dkoq7vzwp7ch2lgu/'

    try {
      const res = await writeAsync({
        args: [to, parseInt(tokenID), amount, nftData, tokenURI, manager],
      })
      console.log(res)
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <Form onSubmit={handleSubmit(mint)}>
      <FormElement
        css={{
          width: '40rem',
        }}
      >
        <Label htmlFor="name">To</Label>
        <Input
          name="to"
          placeholder="Address to Mint To"
          type="text"
          {...register('to', { required: true })}
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
        <Label htmlFor="tokenID">Token ID</Label>
        <Input
          name="to"
          placeholder="Token ID"
          type="text"
          {...register('tokenID', { required: true })}
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
        <Label htmlFor="name">Manager</Label>
        <Input
          name="manager"
          placeholder="Manager of Entity"
          type="text"
          {...register('manager', { required: true })}
          css={{
            width: '20rem',
          }}
        />
      </FormElement>
      <Button variant="cta" type="submit" disabled={isLoading}>
        Mint
      </Button>
    </Form>
  )
}
