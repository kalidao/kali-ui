import React, { useState } from 'react'
import { Flex } from '../../styles/elements'
import { Input, Form, FormElement, Label, Switch, Checkbox } from '../../styles/form-elements'
import { Select } from '../../styles/form-elements/Select'
import { useForm, Controller } from 'react-hook-form'
import { useStateMachine } from 'little-state-machine'
import updateAction from './updateAction'
import { Tip } from '../elements/'
import { Stack, Button } from '@kalidao/reality'

export default function Governance({ setStep }) {
  const {
    register,
    setValue,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const { actions, state } = useStateMachine({ updateAction })
  const { hardMode } = state

  const onPrevious = (data) => {
    actions.updateAction(data)

    setStep(0)
  }

  const onNext = (data) => {
    actions.updateAction(data)

    if (!hardMode) {
      setStep(4)
    } else {
      setStep(2)
    }
  }

  return (
    <Form>
      <FormElement>
        <Label htmlFor="votingPeriod">Voting Period</Label>
        <Flex>
          <Input
            variant="voting"
            type="number"
            id="quorum"
            placeholder="5"
            {...register('votingPeriod', { required: true })}
            defaultValue={state.votingPeriod}
            min="1"
            css={{
              '&:hover': {
                boxShadow: 'none',
              },
            }}
          />
          <Select
            {...register('votingPeriodUnit')}
            defaultValue={state.votingPeriodUnit}
            onValueChange={(value) => setValue('votingPeriodUnit', value)}
          >
            <Select.Item value="min">minutes</Select.Item>
            <Select.Item value="hour">hours</Select.Item>
            <Select.Item value="day">days</Select.Item>
          </Select>
        </Flex>
      </FormElement>
      <FormElement>
        <Label htmlFor="quorum">
          Participation Needed
          <Tip label="Minimum percentage of votes required for a proposal to pass" />
        </Label>
        <Flex dir="col" gap="sm">
          <Input
            type="number"
            id="quorum"
            placeholder="20"
            aria-invalid={errors.quorum ? 'true' : 'false'}
            min="0"
            max="100"
            {...register('quorum', {
              required: {
                value: true,
                message: 'Participation percentage is required.',
              },
              min: {
                value: 0,
                message: 'Participation percentage must be above 0.',
              },
              max: {
                value: 100,
                message: 'Participation percentage must be below 100.',
              },
            })}
            defaultValue={state.quorum}
          />
          {errors.quorum && <span>{errors?.quorum?.message}</span>}
        </Flex>
      </FormElement>
      <FormElement>
        <Label htmlFor="approval">
          Approval Needed <Tip label="Minimum percentage of positive votes required for a proposal to pass" />
        </Label>
        <Flex dir="col" gap="sm">
          <Input
            type="number"
            id="approval"
            placeholder="60"
            min="51"
            max="100"
            aria-invalid={errors.approval ? 'true' : 'false'}
            {...register('approval', {
              required: {
                value: true,
                message: 'Approval percentage is required.',
              },
              min: {
                value: 51,
                message: 'Approval percentage must be more than 51.',
              },
              max: {
                value: 100,
                message: 'Approval percentage must be below 100.',
              },
            })}
            defaultValue={state.approval}
          />
          {errors.approval && <span>{errors?.approval?.message}</span>}
        </Flex>
      </FormElement>
      <FormElement>
        <Label htmlFor="transferability">
          Token Transferability <Tip label="Toggle to allow KaliDAO tokens to be transferable at start" />
        </Label>

        <Switch
          control={control}
          name="transferability"
          value="transferability"
          defaultValue={state.transferability}
          onValueChange={(value) => setValue('transferability', value)}
        />
      </FormElement>
      <Stack direction={'horizontal'} align="center" justify={'flex-end'}>
        <Button variant="transparent" onClick={handleSubmit(onPrevious)}>
          Previous
        </Button>
        <Button variant="primary" type="submit" onClick={handleSubmit(onNext)}>
          Next
        </Button>
      </Stack>
    </Form>
  )
}
