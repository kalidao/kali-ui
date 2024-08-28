import React, { useCallback } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { useAccount, useBalance, useReadContract, useWriteContract } from 'wagmi'
import { useForm } from 'react-hook-form'

import { zeroAddress, parseEther, toHex } from 'viem'

import { KALIDAO_ABI } from '@abi/KaliDAO'
import { REDEMPTION_ABI } from '@abi/KaliDAOredemption'
import { addresses } from '@constants/addresses'
import { Address } from 'viem'

type FormType = {
  amount: number
}

// TODO: Implement, Add error handling
export default function () {
  const router = useRouter()
  const params = useParams<{ chainId: string; dao: Address }>()
  const chainId = params ? Number(params.chainId) : 1
  const dao = params?.dao as Address

  const { isConnected, address } = useAccount()
  const { writeContractAsync } = useWriteContract()
  const { data: symbol, isLoading: isSymbolLoading } = useReadContract({
    address: dao ? (dao as `0xstring`) : zeroAddress,
    abi: KALIDAO_ABI,
    functionName: 'symbol',
    chainId: Number(chainId),
  })
  const { data: starts, isLoading: isStartLoading } = useReadContract({
    address: chainId ? (addresses[Number(chainId)]['extensions']['redemption'] as `0xstring`) : zeroAddress,
    abi: REDEMPTION_ABI,
    functionName: 'redemptionStarts',
    args: [dao ? dao : zeroAddress],
    chainId: Number(chainId),
  })
  const { data: balance, isLoading: isBalanceLoading } = useBalance({
    address: isConnected ? (address as `0xstring`) : zeroAddress,
    token: dao ? (dao as `0xstring`) : zeroAddress,
    chainId: Number(chainId),
  })

  // form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormType>()

  const redeem = useCallback(
    async (redeemAmount: bigint) => {
      if (!isConnected) return

      await writeContractAsync({
        address: dao ? (dao as `0xstring`) : zeroAddress,
        abi: KALIDAO_ABI,
        functionName: 'callExtension',
        args: [addresses[Number(chainId)]['extensions']['redemption'], redeemAmount, toHex(0)],
        // overrides: {
        //   gasLimit: ethers.BigNumber.from(1500000),
        // },
      })
    },
    [isConnected, chainId, writeContractAsync, dao],
  )

  // TODO: Popup to change network if on different network from DAO
  const onSubmit = async (data: FormType) => {
    const { amount } = data

    await redeem(parseEther(amount.toString()))
  }

  /*
  return (
    <Stack>
      <Text>Redeem assets from DAO treasury by burning select amount of DAO tokens</Text>
      <Text>
        Current Balance: <Skeleton>{isBalanceLoading && balance?.formatted}</Skeleton>{' '}
        <Skeleton>{isSymbolLoading && symbol as string}</Skeleton>
      </Text>
      <Text>
        Redemption Starts:
        <Skeleton>{isStartLoading && starts ? starts as string && prettyDate(starts.toDateString()) : null}</Skeleton>
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
  )*/
}
