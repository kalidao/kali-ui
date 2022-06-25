import React from 'react'
import { Flex, Text, Button } from '../../styles/elements'
import { Form, FormElement, Input, Label } from '../../styles/form-elements'
import { useContractWrite } from 'wagmi'
import RICARDIAN_ABI from '../../abi/RicardianRegistry.json'
import { useForm } from 'react-hook-form'
import { ethers } from 'ethers'

export default function Create() {
  const { data, isLoading, writeAsync } = useContractWrite(
    {
      addressOrName: '0xbb41050f1915ec7385405ba15c401c8338d9a6ac',
      contractInterface: RICARDIAN_ABI,
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
        Create Entity
      </Text>
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
    </Flex>
  )
}
