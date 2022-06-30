import React from 'react'
import { Flex, Text, Button, Box } from '../../styles/elements'
import { Form, FormElement, Input, Label } from '../../styles/form-elements'
import { useAccount, useContractRead, useContractWrite } from 'wagmi'
import RICARDIAN_ABI from '../../abi/Ricardian.json'
import { useForm } from 'react-hook-form'
import { ethers } from 'ethers'
import { AddressZero } from '@ethersproject/constants'

export default function Mint() {
  const { data: account } = useAccount()
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
    const { mintTo, tokenID, manager } = data
    const amount = 1
    const nftData = ethers.constants.HashZero
    const tokenURI = 'ipfs://bafybeibg26r6agfztqcopnv6sgm7zfzfhpjpuhyuk4dkoq7vzwp7ch2lgu/'

    try {
      const res = await writeAsync({
        args: [mintTo, parseInt(tokenID), amount, nftData, tokenURI, manager],
      })
      console.log(res)
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <Flex as="form" dir="col" align="center" onSubmit={handleSubmit(mint)}>
      <Flex></Flex>
      <Flex
        css={{
          width: '38rem',
          padding: '1rem',
          borderRadius: '10px',
          flexDirection: 'column',
          justifyContent: 'flex-start',
          alignItems: 'flex-start',
          gap: '5px',
        }}
      >
        <Text
          as="label"
          htmlFor="name"
          css={{
            background: 'none',
            color: '$mauve11',
          }}
        >
          Name
        </Text>
        <Flex>
          <Input
            name="to"
            placeholder="XYZ"
            type="text"
            // defaultValue={account?.address}
            {...register('name', { required: true })}
            css={{
              all: 'unset',
              width: '33.5rem',
              borderLeft: '1px solid $mauve6',
              borderTop: '1px solid $mauve6',
              borderBottom: '1px solid $mauve6',
              padding: '0.5rem',
              borderRadius: '10px 0px 0px 10px',
              display: 'flex',
              justifyContent: 'flex-start',
              alignItems: 'center',

              '&:hover': {
                background: '$mauve2',
              },

              '&:focus': {
                background: '$mauve3',
              },
            }}
          />
          <Flex
            css={{
              background: '$mauve2',
              padding: '0.5rem',
              borderRadius: '0 10px 10px 0',
              borderRight: '1px solid $mauve6',
              borderTop: '1px solid $mauve6',
              borderBottom: '1px solid $mauve6',
            }}
          >
            LLC
          </Flex>
        </Flex>
      </Flex>
      <Flex
        css={{
          width: '38rem',
          padding: '1rem',
          borderRadius: '10px',
          flexDirection: 'column',
          justifyContent: 'flex-start',
          alignItems: 'flex-start',
          gap: '5px',
        }}
      >
        <Text
          as="label"
          htmlFor="mintTo"
          css={{
            background: 'none',
            color: '$mauve11',
          }}
        >
          To
        </Text>
        <Input
          name="to"
          placeholder="0x..."
          type="text"
          defaultValue={account?.address}
          {...register('mintTo', { required: true })}
          css={{
            all: 'unset',
            width: '36rem',
            border: '1px solid $mauve6',
            padding: '0.5rem',
            borderRadius: '10px',
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'center',

            '&:hover': {
              background: '$mauve2',
            },

            '&:focus': {
              background: '$mauve3',
            },
          }}
        />
      </Flex>
      {/* <Flex
        css={{
          width: '38rem',
          padding: '1rem',
          borderRadius: '10px',
          flexDirection: 'column',
          justifyContent: 'flex-start',
          alignItems: 'flex-start',
          gap: '5px',
        }}
      >
        <Text
          as="label"
          htmlFor="manager"
          css={{
            background: 'none',
            color: '$mauve11',
          }}
        >
          Manager
        </Text>
        <Input
          name="Manager"
          placeholder="0x..."
          type="text"
          defaultValue={account?.address}
          {...register('manager', { required: true })}
          css={{
            all: 'unset',
            width: '36rem',
            border: '1px solid $mauve6',
            padding: '0.5rem',
            borderRadius: '10px',
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'center',
          }}
        />
      </Flex> */}
      <Button
        css={{
          all: 'unset',
          background: '$cyan1',
          color: '$mauve12',
          border: '1px solid $cyan5',
          borderRadius: '20px',
          padding: '0.5rem',
          width: '36.9rem',

          '&:hover': {
            background: '$cyan2',
          },
        }}
        type="submit"
        disabled={isLoading}
      >
        Mint
      </Button>
    </Flex>
  )
}
