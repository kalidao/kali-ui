import React, { useState } from 'react'
import { Flex } from '../../styles/elements'
import { Select } from '@design/Select'
import { useForm, Controller } from 'react-hook-form'
import updateAction from './updateAction'
import { Tip } from '../elements'
import { Stack, FieldSet, Checkbox, Input, Button } from '@kalidao/reality'
import { GlobalState, useStateMachine } from 'little-state-machine'

type Props = {
  setStep: React.Dispatch<React.SetStateAction<number>>
}

export default function Governance({ setStep }: Props) {
  const {
    register,
    setValue,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<GlobalState>()
  const { actions, state } = useStateMachine({ updateAction })
  const { hardMode } = state

  const onPrevious = (data: GlobalState) => {
    actions.updateAction(data)

    setStep(0)
  }

  const onNext = (data: GlobalState) => {
    actions.updateAction(data)

    if (!hardMode) {
      setStep(4)
    } else {
      setStep(2)
    }
  }

  return (
    <FieldSet legend="Governance">
      <Stack direction={'horizontal'}>
        <Input
          label="Voting Period"
          type="number"
          id="quorum"
          placeholder="5"
          {...register('votingPeriod', { required: true })}
          defaultValue={state.votingPeriod}
          min="1"
        />
        <Select
          {...register('votingPeriodUnit')}
          label={'Voting Period Unit'}
          options={[
            { label: 'Minutes', value: 'minutes' },
            { label: 'Hours', value: 'hours' },
            { label: 'Days', value: 'days' },
          ]}
          defaultValue={'minutes'}
        />
      </Stack>
      <Input
        label="Participation Needed"
        description="Minimum percentage of votes required for a proposal to pass"
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
      <Input
        label="Approval Needed"
        description="Minimum percentage of positive votes required for a proposal to pass"
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

      <Checkbox
        label="Allow token transferability"
        control={control}
        name="transferability"
        value="transferability"
        defaultValue={state.transferability}
        onValueChange={(value) => setValue('transferability', value)}
      />
      <Stack direction={'horizontal'} align="center" justify={'flex-end'}>
        <Button variant="transparent" onClick={handleSubmit(onPrevious)}>
          Previous
        </Button>
        <Button variant="primary" type="submit" onClick={handleSubmit(onNext)}>
          Next
        </Button>
      </Stack>
    </FieldSet>
  )
}
