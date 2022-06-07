import React from 'react'
import { Flex, Button, Warning } from '../../styles/elements'
import { Form, Label, Input } from '../../styles/form-elements'
import { useForm } from 'react-hook-form'
import { useStateMachine } from 'little-state-machine'
import updateAction from './updateAction'

export default function Identity({ setStep }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const { actions, state } = useStateMachine({ updateAction })
  const { hardMode } = state

  const onSubmit = (data) => {
    console.log(data)
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
            {...register('name', { required: true })}
            defaultValue={state.name}
          />
          {errors.name && errors.name.type === 'required' && <span>Name is required.</span>}
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
