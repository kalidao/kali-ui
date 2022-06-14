import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { ethers } from 'ethers'
import { useContract, useSigner, useBalance, useContractRead, useAccount } from 'wagmi'
import { Flex, Text, Button } from '../../../../styles/elements'
import { Form, FormElement, Label, Input } from '../../../../styles/form-elements'
import KALIDAO_ABI from '../../../../abi/KaliDAO.json'
import { addresses } from '../../../../constants/addresses'
import { Warning } from '../../../../styles/elements'
import { AddressZero } from '@ethersproject/constants'
import Spinner from '../../../elements/Spinner'
import { useForm } from 'react-hook-form'

export default function Redeem() {
  const router = useRouter()
  const daoAddress = router.query.dao
  const daoChainId = router.query.chainId
  const redemptionAddress = addresses[daoChainId]['extensions']['redemption']
  const { data: account } = useAccount()
  const { data: signer } = useSigner()

  const kalidao = useContract({
    addressOrName: daoAddress,
    contractInterface: KALIDAO_ABI,
    signerOrProvider: signer,
  })
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
  const [warning, setWarning] = useState(null)

  // TODO: Popup to change network if on different network from DAO
  const onSubmit = async (data) => {
    const { amount } = data

    console.log('Proposal Params - ', redemptionAddress, ethers.utils.parseEther(amount), '0x')
    try {
      const tx = await kalidao.callExtension(redemptionAddress, ethers.utils.parseEther(amount), '0x')
      console.log('tx', tx)
    } catch (e) {
      console.log('error', e)
    }
  }

  return (
    <Flex dir="col" gap="md">
      <Text>Redeem assets from DAO treasury by burning select amount of DAO tokens</Text>
      <Text>
        Current Balance: {isBalanceLoading ? <Spinner /> : balance.formatted} {isSymbolLoading ? <Spinner /> : symbol}
      </Text>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormElement>
          <Label htmlFor="amount">Amount</Label>
          <Input
            name="amount"
            type="number"
            defaultValue={balance?.formatted}
            min="0"
            max={balance.formatted}
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
