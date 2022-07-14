import React, { useEffect, useState } from 'react'
import { Flex, Button, Warning } from '../../styles/elements'
import { Form, Label, Input } from '../../styles/form-elements'
import { useForm } from 'react-hook-form'
import { useStateMachine } from 'little-state-machine'
import updateAction from './updateAction'
import { useNetwork } from 'wagmi'
import { getNames } from '../../graph/queries'

export default function Identity({ setView, setStep }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const { actions, state } = useStateMachine({ updateAction })

  const onSubmit = (data) => {
    actions.updateAction(data)

    setStep(1)
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Flex dir="row" align="separate">
        <Label htmlFor="name">Name</Label>
        <Flex dir="col" gap="sm">
          <Input
            type="text"
            name="name"
            placeholder="K Club"
            aria-invalid={errors.name ? 'true' : 'false'}
            {...register('name', {
              required: {
                value: true,
                message: 'Name is required.',
              },
            })}
            defaultValue={state.name}
          />
          {errors.name && <span>{errors?.name?.message}</span>}
        </Flex>
      </Flex>
      <Flex css={{ justifyContent: 'flex-end' }} gap="md">
        <Button variant="transparent" onClick={() => setView(0)}>
          Previous
        </Button>
        <Button variant="primary" type="submit">
          Next
        </Button>
      </Flex>
      <Warning warning="You cannot change name and symbol after deployment." />
    </Form>
  )
}
