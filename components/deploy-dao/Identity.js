import React, { useEffect, useState } from 'react'
import { Flex, Button, Warning } from '../../styles/elements'
import { Form, Label, Input } from '../../styles/form-elements'
import { useForm } from 'react-hook-form'
import { useStateMachine } from 'little-state-machine'
import updateAction from './updateAction'
import { useNetwork } from 'wagmi'
import { getNames } from '../../graph/queries'
export default function Identity({ setStep }) {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm()
  const { activeChain } = useNetwork()
  const { actions, state } = useStateMachine({ updateAction })
  const { hardMode } = state
  const [names, setNames] = useState([])

  useEffect(() => {
    if (!activeChain) return
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
      fetchNames()
    }
  }, [activeChain])

  const onSubmit = (data) => {
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
      setStep('founders')
    } else {
      setStep('gov')
    }
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Flex dir="row" align="separate">
        <Label htmlFor="name">Name</Label>
        <Flex dir="col" gap="sm">
          <Input
            type="text"
            name="name"
            placeholder="KaliDAO"
            aria-invalid={errors.name ? 'true' : 'false'}
            {...register('name', { required: 'Name is required.' })}
            defaultValue={state.name}
          />
          {errors.name && <span>{errors?.name?.message}</span>}
        </Flex>
      </Flex>
      <Flex dir="row" align="separate">
        <Label htmlFor="symbol">Symbol</Label>
        <Flex dir="col" gap="sm">
          <Input
            type="text"
            name="symbol"
            placeholder="KALI"
            aria-invalid={errors.symbol ? 'true' : 'false'}
            {...register('symbol', { required: true, maxLength: 11 })}
            defaultValue={state.symbol}
          />
          {errors.symbol && errors.symbol.type === 'required' && <span role="alert">Symbol is required.</span>}
          {errors.symbol && errors.symbol.type === 'maxLength' && <span role="alert">Max symbol length exceeded</span>}
        </Flex>
      </Flex>
      <Flex css={{ justifyContent: 'flex-end' }}>
        <Button variant="primary" type="submit">
          Next
        </Button>
      </Flex>
      <Warning warning="You cannot change name and symbol after deployment." />
    </Form>
  )
}
