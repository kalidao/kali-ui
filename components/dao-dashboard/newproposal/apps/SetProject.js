import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { ethers } from 'ethers'
import { useContractWrite } from 'wagmi'
import { Flex, Text, Button } from '../../../../styles/elements'
import { Form, FormElement, Label, Input, Switch } from '../../../../styles/form-elements'
import { useForm } from 'react-hook-form'
import { addresses } from '../../../../constants/addresses'
import KALIDAO_ABI from '../../../../abi/KaliDAO.json'
import Back from '../../../../styles/proposal/Back'

export default function SetProject({ setProposal }) {
  const router = useRouter()
  const { dao, chainId } = router.query
  //   addresses[daoChainId]['extensions']['projectmanagement']
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const {
    data,
    isLoading: isWritePending,
    isSuccess: isWriteSuccess,
    isError,
    error,
    writeAsync,
  } = useContractWrite(
    {
      addressOrName: dao,
      contractInterface: KALIDAO_ABI,
    },
    'propose',
    {
      onSuccess(data) {
        console.log('success!', data)
      },
    },
  )

  const onSubmit = async (data) => {
    const { id, manager, budget, deadline, goals, description } = data
    let payload
    try {
      const abiCoder = ethers.utils.defaultAbiCoder
      payload = abiCoder.encode(
        ['uint256', 'address', 'uint256', 'uint256', 'string'],
        [0, manager, ethers.utils.parseEther(budget), parseInt(new Date(deadline).getTime() / 1000), goals],
      )
    } catch (e) {
      console.log('error', e)
      return
    }

    const tx = await writeAsync({
      args: [9, description, [addresses[chainId]['extensions']['projectmanagement']], [1], [payload]],
      overrides: {
        gasLimit: 1050000,
      },
    }).catch((e) => {
      console.log('error', e.code, e.reason)
    })
  }

  return (
    <Flex dir="col" gap="md" as="form" onSubmit={handleSubmit(onSubmit)}>
      <FormElement>
        <Label htmlFor="manager">Manager</Label>
        <Input type="text" {...register('manager', { required: true })} />
      </FormElement>
      <FormElement>
        <Label htmlFor="budget">Budget</Label>
        <Input type="text" {...register('budget', { required: true })} />
      </FormElement>
      <FormElement>
        <Label htmlFor="deadline">Deadline</Label>
        <Input variant="calendar" type="datetime-local" {...register('deadline', { required: true })} />
      </FormElement>
      <FormElement variant="vertical">
        <Label htmlFor="goals">Goals</Label>
        <Input
          as="textarea"
          type="text"
          {...register('goals', { required: true })}
          css={{ padding: '0.5rem', width: '97%', height: '10vh' }}
        />
      </FormElement>
      <FormElement variant="vertical">
        <Label htmlFor="description">Description</Label>
        <Input
          as="textarea"
          name="description"
          type="text"
          //   defaultValue={description}
          //   onChange={(e) => setDescription(e.target.value)}
          {...register('description', { required: true })}
          css={{ padding: '0.5rem', width: '97%', height: '10vh' }}
        />
      </FormElement>
      <Back onClick={() => setProposal('appsMenu')} />
      <Button type="submit" variant="cta">
        Submit
      </Button>
    </Flex>
  )
}
