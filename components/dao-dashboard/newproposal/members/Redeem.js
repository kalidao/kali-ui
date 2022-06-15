import React from 'react'
import { useRouter } from 'next/router'
import { ethers } from 'ethers'
import { useAccount, useContractWrite, useBalance, useContractRead } from 'wagmi'
import { useForm } from 'react-hook-form'
import { prettyDate } from '../../../../utils'

import { Flex, Text, Button } from '../../../../styles/elements'
import { Form, FormElement, Label, Input } from '../../../../styles/form-elements'
import { Warning } from '../../../../styles/elements'
import { AddressZero } from '@ethersproject/constants'
import Spinner from '../../../elements/Spinner'

import KALIDAO_ABI from '../../../../abi/KaliDAO.json'
import REDEMPTION_ABI from '../../../../abi/KaliDAOredemption.json'
import { addresses } from '../../../../constants/addresses'

// TODO: Add error handling
export default function Redeem() {
  const router = useRouter()
  const daoAddress = router.query.dao
  const daoChainId = router.query.chainId
  const redemptionAddress = addresses[daoChainId]['extensions']['redemption']
  const { data: account } = useAccount()

  const { data, isWriteError, isWritePending, writeAsync } = useContractWrite(
    {
      addressOrName: daoAddress,
      contractInterface: KALIDAO_ABI,
    },
    'callExtension',
    {
      onSettled(data, error) {
        console.log('Settled', { data, error })
      },
    },
  )

  const { data: symbol, isSymbolLoading } = useContractRead(
    {
      addressOrName: daoAddress ? daoAddress : AddressZero,
      contractInterface: KALIDAO_ABI,
    },
    'symbol',
    {
      chainId: Number(daoChainId),
    },
  )

  const { data: starts, isLoading: isStartLoading } = useContractRead(
    {
      addressOrName: addresses[daoChainId]['extensions']['redemption'],
      contractInterface: REDEMPTION_ABI,
    },
    'redemptionStarts',
    {
      args: daoAddress,
      chainId: Number(daoChainId),
    },
  )

  const {
    data: balance,
    isBalanceError,
    isBalanceLoading,
  } = useBalance({
    addressOrName: account ? account.address : AddressZero,
    token: daoAddress,
    chainId: Number(daoChainId),
    watch: true,
  })

  // form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  // TODO: Popup to change network if on different network from DAO
  const onSubmit = async (data) => {
    const { amount } = data

    console.log('Proposal Params - ', redemptionAddress, ethers.utils.parseEther(amount))

    try {
      const tx = await writeAsync({
        args: [redemptionAddress, ethers.utils.parseEther(amount), ethers.constants.HashZero],
        overrides: {
          gasLimit: 1500000,
        },
      })

      console.log('tx', tx)
    } catch (e) {
      console.log('error', e)
    }
  }

  return (
    <Flex dir="col" gap="md">
      <Text>Redeem assets from DAO treasury by burning select amount of DAO tokens</Text>
      <Text>
        Current Balance: {isBalanceLoading ? <Spinner /> : balance?.formatted} {isSymbolLoading ? <Spinner /> : symbol}
      </Text>
      <Text>
        Redemption Starts:{' '}
        {isStartLoading ? <Spinner /> : prettyDate(new Date(ethers.BigNumber.from(starts * 1000).toNumber()))}
      </Text>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormElement>
          <Label htmlFor="amount">Amount</Label>
          <Input
            name="amount"
            type="number"
            defaultValue={balance?.formatted}
            min="0"
            max={balance?.formatted}
            css={{
              width: '5rem',
            }}
            {...register('amount', {
              required: {
                value: true,
                message: 'Burn amount is required.',
              },
              min: {
                value: 0,
                message: 'Burn amount must be more than 0.',
              },
              max: {
                value: balance?.formatted,
                message: 'Burn amount cannot be more than balance.',
              },
            })}
          />
        </FormElement>
        {errors?.amount && <Warning warning={errors?.amount?.message} />}
        <Button type="submit">Submit</Button>
      </Form>
    </Flex>
  )
}
