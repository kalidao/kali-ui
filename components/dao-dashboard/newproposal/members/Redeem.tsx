import React, { useCallback } from 'react'
import { useRouter } from 'next/router'
import { BigNumber, ethers } from 'ethers'
import { useAccount, useContractWrite, useBalance, useContractRead } from 'wagmi'
import { useForm } from 'react-hook-form'
import { prettyDate } from '@utils/prettyDate'

import { Warning } from '@design/elements'
import { AddressZero } from '@ethersproject/constants'
import { Skeleton, Stack, Text, Input, Box, Button } from '@kalidao/reality'

import KALIDAO_ABI from '@abi/KaliDAO.json'
import REDEMPTION_ABI from '@abi/KaliDAOredemption.json'
import { addresses } from '@constants/addresses'
import { ProposalProps } from '../utils/types'

type FormType = {
  amount: number
}

// TODO: Add error handling
export default function Redeem({ content, title }: ProposalProps) {
  const router = useRouter()
  const { dao, chainId } = router.query
  const { isConnected, address } = useAccount()
  const {
    data,
    isError: isWriteError,
    isLoading: isWritePending,
    writeAsync,
  } = useContractWrite({
    mode: 'recklesslyUnprepared',
    addressOrName: dao ? (dao as string) : AddressZero,
    contractInterface: KALIDAO_ABI,
    functionName: 'callExtension',
  })
  const { data: symbol, isLoading: isSymbolLoading } = useContractRead({
    addressOrName: dao ? (dao as string) : AddressZero,
    contractInterface: KALIDAO_ABI,
    functionName: 'symbol',
    chainId: Number(chainId),
  })
  const { data: starts, isLoading: isStartLoading } = useContractRead({
    addressOrName: chainId ? addresses[Number(chainId)]['extensions']['redemption'] : AddressZero,
    contractInterface: REDEMPTION_ABI,
    functionName: 'redemptionStarts',
    args: [dao ? (dao as string) : AddressZero],
    chainId: Number(chainId),
  })
  const {
    data: balance,
    isError: isBalanceError,
    isLoading: isBalanceLoading,
  } = useBalance({
    addressOrName: isConnected ? (address as string) : AddressZero,
    token: dao ? (dao as string) : AddressZero,
    chainId: Number(chainId),
    watch: true,
  })

  // form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormType>()

  const redeem = useCallback(
    async (redeemAmount: BigNumber) => {
      if (!isConnected) return

      const tx = await writeAsync({
        recklesslySetUnpreparedArgs: [
          addresses[Number(chainId)]['extensions']['redemption'],
          redeemAmount,
          ethers.constants.HashZero,
        ],
        recklesslySetUnpreparedOverrides: {
          gasLimit: 1500000,
        },
      })
    },
    [isConnected, chainId, writeAsync],
  )

  // TODO: Popup to change network if on different network from DAO
  const onSubmit = async (data: FormType) => {
    const { amount } = data

    await redeem(ethers.utils.parseEther(amount.toString()))
  }

  return (
    <Stack>
      <Text>Redeem assets from DAO treasury by burning select amount of DAO tokens</Text>
      <Text>
        Current Balance: <Skeleton>{isBalanceLoading && balance?.formatted}</Skeleton>{' '}
        <Skeleton>{isSymbolLoading && symbol}</Skeleton>
      </Text>
      <Text>
        Redemption Starts:
        <Skeleton>{isStartLoading && starts && prettyDate(starts.toDateString())}</Skeleton>
      </Text>
      <Box as="form" onSubmit={handleSubmit(onSubmit)}>
        <Input
          label="Amount"
          description="The amount of tokens to redeem from treasury."
          type="number"
          placeholder="10"
          inputMode={'numeric'}
          max={Number(balance?.formatted)}
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
              value: balance ? Number(balance.formatted) : 10,
              message: 'Burn amount cannot be more than balance.',
            },
          })}
        />
        <span>{errors?.amount && <Warning warning={errors?.amount?.message} />}</span>
        <Button variant="primary" type="submit" center loading={isWritePending}>
          Submit
        </Button>
      </Box>
    </Stack>
  )
}
