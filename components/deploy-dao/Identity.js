import React from 'react'
import { Flex, Button, Box } from '../../styles/elements'
import { Form, FormElement, Label, Input } from '../../styles/form-elements'
import { useForm } from 'react-hook-form'
import { useStateMachine } from 'little-state-machine'
import updateAction from './updateAction'
import { TiWarning } from 'react-icons/ti'

export default function Identity({ setStep, hardMode }) {
  const { register, handleSubmit } = useForm()
  const { actions, state } = useStateMachine({ updateAction })

  const onSubmit = (data) => {
    actions.updateAction(data)

    if (!hardMode) {
      setStep('founders')
    } else {
      setStep('gov')
    }
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormElement>
        <Label htmlFor="name">Name</Label>
        <Input type="text" name="name" placeholder="KaliDAO" {...register('name')} defaultValue={state.name} />
      </FormElement>
      <FormElement>
        <Label htmlFor="symbol">Symbol</Label>
        <Input type="text" name="symbol" placeholder="KALI" {...register('symbol')} defaultValue={state.symbol} />
      </FormElement>
      <Flex css={{ justifyContent: 'flex-end' }}>
        <Button variant="primary" type="submit">
          Next
        </Button>
      </Flex>
      <Box
        variant="tip"
        css={{
          display: 'flex',
          justifyContent: 'flex-start',
          alignItems: 'center',
          gap: '0.6rem',
        }}
      >
        <TiWarning color="yellow" />
        You cannot change name and symbol after deployment.
      </Box>
    </Form>
  )
}
