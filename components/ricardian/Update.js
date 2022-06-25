import React from 'react'
import { Flex, Text, Button } from '../../styles/elements'
import { Form, FormElement, Input, Label } from '../../styles/form-elements'
import { useContractWrite } from 'wagmi'
import RICARDIAN_ABI from '../../abi/Ricardian.json'
import { useForm } from 'react-hook-form'
import { ethers } from 'ethers'
import { uploadIpfs } from '../tools/ipfsHelpers'

export default function Mint() {
  const { data, isLoading, writeAsync } = useContractWrite(
    {
      addressOrName: '0xa682FB2DEb3ba58e85032f1dB4144f443284D078',
      contractInterface: RICARDIAN_ABI,
    },
    'ownerSetBaseURI',
  )
  const { handleSubmit, register } = useForm()

  const updateBaseURI = async (data) => {
    console.log(data)

    try {
      const imageURI = await uploadIpfs('0xa682FB2DEb3ba58e85032f1dB4144f443284D078', 'Bull Token', data.file)
    } catch (e) {
      console.log(e)
    }

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
    <Flex
      css={{
        position: 'absolute',
        marginLeft: 'auto',
        marginRight: 'auto',
        top: '7rem',
        left: 0,
        right: 0,
        textAlign: 'center',
        width: '50rem',
        height: '40rem',
        background: '$mauve2',
        border: '$mauve4',
        color: '$mauve11',
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'column',
        gap: '20px',
      }}
    >
      <Text
        css={{
          marginTop: '20px',
          fontSize: '24px',
          fontWeight: '700',
        }}
      >
        Mint Entity
      </Text>
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
          <Label htmlFor="name">Manager</Label>
          <Input
            name="to"
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
    </Flex>
  )
}
