import React from 'react'
import { FormElement, Label, Form, Input, Switch } from '../../styles/form-elements'
import { Flex, Button } from '../../styles/elements'
import { useStateMachine } from 'little-state-machine'
import updateAction from './updateAction'
import { useForm } from 'react-hook-form'

// TODO: Add grace period
export default function Redemption({ setStep }) {
  const { actions, state } = useStateMachine({ updateAction })
  const { hardMode } = state
  const {
    register,
    control,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const watchRedemption = watch('redemption', state.redemption)
  const onPrevious = (data) => {
    actions.updateAction(data)

    if (!hardMode) {
      setStep(0)
    } else {
      setStep(1)
    }
  }

  const onNext = (data) => {
    actions.updateAction(data)

    if (!hardMode) {
      setStep(4)
    } else {
      setStep(3)
    }
  }

  return (
    <Form>
      <FormElement>
        <Label htmlFor="legal">Add Redemption</Label>
        <Switch
          control={control}
          name="redemption"
          value="redemption"
          defaultValue={state.redemption}
          onValueChange={(value) => setValue('redemption', value)}
        />
      </FormElement>
      {watchRedemption && (
        <FormElement>
          <Label htmlFor="redemption-start">Start Date</Label>
          <Input
            defaultValue={state['redemptionStart']}
            variant="calendar"
            type="datetime-local"
            name="redemptionStart"
            {...register('redemptionStart', {
              required: {
                value: true,
                message: 'Start date is required.',
              },
            })}
          />
        </FormElement>
      )}
      <Flex css={{ justifyContent: 'flex-end' }} gap="md">
        <Button variant="transparent" onClick={handleSubmit(onPrevious)}>
          Previous
        </Button>
        <Button variant="primary" type="submit" onClick={handleSubmit(onNext)}>
          Next
        </Button>
      </Flex>
    </Form>
  )
}
