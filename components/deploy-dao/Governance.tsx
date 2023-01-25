import React from 'react'
import { Select } from '@design/Select'
import { useForm } from 'react-hook-form'
import updateAction from './updateAction'
import { Stack, FieldSet, Input, Button } from '@kalidao/reality'
import { GlobalState, useStateMachine } from 'little-state-machine'
import Switch from '@design/Switch'

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
          id="votingPeriod"
          placeholder="5"
          {...register('votingPeriod', { required: true })}
          defaultValue={state.votingPeriod}
          min="1"
        />
        <Select
          name="votingPeriodUnit"
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setValue('votingPeriodUnit', e.currentTarget.value)}
          label={'Voting Period Unit'}
          options={[
            {
              label: 'Minutes',
              value: 'min',
            },
            {
              label: 'Hours',
              value: 'hour',
            },
            {
              label: 'Days',
              value: 'day',
            },
          ]}
          defaultValue={state.votingPeriodUnit}
        />
      </Stack>
      <Input
        label="Participation Needed"
        description="Minimum percentage of votes required for a proposal to pass"
        type="number"
        id="quorum"
        placeholder="20"
        aria-invalid={errors.quorum ? 'true' : 'false'}
        min="1"
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
        error={errors?.quorum?.message}
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
            message: 'Approval percentage must be more than 52.',
          },
          max: {
            value: 100,
            message: 'Approval percentage must be below 100.',
          },
        })}
        error={errors?.approval?.message}
        defaultValue={state.approval}
      />
      {/* !!!TODO */}
      <Switch control={control} label="Allow token transferability" name="transferability" value="transferability" />
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
