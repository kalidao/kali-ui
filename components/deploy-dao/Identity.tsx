import React, { useEffect, useState } from 'react'
import { Stack, Button } from '@kalidao/reality'
import { Form } from '../../styles/form-elements'
import { useForm } from 'react-hook-form'
import { GlobalState, useStateMachine } from 'little-state-machine'
import updateAction from './updateAction'
import { useNetwork } from 'wagmi'
import { getNames } from '../../graph/queries'
import { FieldSet, Input } from '@kalidao/reality'
import Tutorial from './tutorial'

type Props = {
  setStep: React.Dispatch<React.SetStateAction<number>>
}

export default function Identity({ setStep }: Props) {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<GlobalState>()
  const { chain: activeChain } = useNetwork()
  const { actions, state } = useStateMachine({ updateAction })
  const { hardMode } = state
  const [names, setNames] = useState<string[]>([])

  useEffect(() => {
    if (!activeChain) return
    let mounted = true
    const fetchNames = async () => {
      const result = await getNames(activeChain?.id)
      const names = []
      for (let i = 0; i < result?.data?.daos.length; i++) {
        names.push(result?.data?.daos?.[i]?.token?.name)
      }
      setNames(names)
    }

    fetchNames()
    return () => {
      mounted = false
    }
  }, [activeChain])

  const onSubmit = (data: GlobalState) => {
    // name check
    if (names.includes(data?.name)) {
      setError(
        'name',
        {
          type: 'custom',
          message: 'Name is not unique. Please choose another!',
        },
        {
          shouldFocus: true,
        },
      )
      return
    }
    actions.updateAction(data)

    if (!hardMode) {
      setStep(4)
    } else {
      setStep(1)
    }
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FieldSet
        legend="Token"
        description="Your token is the identity of your organization. The token created will be ERC20 compliant."
      >
        <Input
          label="Name"
          placeholder="KaliCo"
          defaultValue={state.name === '' ? undefined : state.name}
          {...register('name', {
            required: {
              value: true,
              message: 'Name is required.',
            },
          })}
        />
        <Input
          label="Symbol"
          placeholder="KCO"
          prefix="$"
          textTransform="uppercase"
          defaultValue={state.symbol === '' ? undefined : state.symbol}
          {...register('symbol', {
            required: {
              value: true,
              message: 'Symbol is required.',
            },
            maxLength: {
              value: 11,
              message: 'Max symbol length exceeded',
            },
          })}
        />
        {errors.name && <span>{errors?.name?.message}</span>}
        {errors.symbol && <span role="alert">{errors?.symbol?.message}</span>}
      </FieldSet>
      <Stack direction={'horizontal'} justify="space-between">
        <Tutorial />
        <Button variant="primary" type="submit">
          Next
        </Button>
      </Stack>
    </Form>
  )
}
