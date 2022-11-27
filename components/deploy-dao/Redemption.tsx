import React from 'react'
import { GlobalState, useStateMachine } from 'little-state-machine'
import updateAction from './updateAction'
import { useForm } from 'react-hook-form'
import { Stack, Button, Input, FieldSet } from '@kalidao/reality'
import Switch from '@design/Switch'
import { DateInput } from '@design/DateInput'

type Props = {
  setStep: React.Dispatch<React.SetStateAction<number>>
}

// TODO: Add grace period
export default function Redemption({ setStep }: Props) {
  const { actions, state } = useStateMachine({ updateAction })
  const { hardMode } = state
  const {
    register,
    control,
    watch,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<GlobalState>()
  const watchRedemption = watch('redemption', state.redemption)

  const onPrevious = (data: GlobalState) => {
    actions.updateAction(data)

    if (!hardMode) {
      setStep(0)
    } else {
      setStep(1)
    }
  }

  const onNext = (data: GlobalState) => {
    actions.updateAction(data)

    if (!hardMode) {
      setStep(4)
    } else {
      setStep(3)
    }
  }

  return (
    <FieldSet legend="Redemption">
      <Switch
        label="Add Redemption"
        control={control}
        name="redemption"
        value="redemption"
        defaultValue={state.redemption}
        onValueChange={(value: boolean) => setValue('redemption', value)}
      />
      {watchRedemption && (
        <DateInput
          label="Start Date"
          defaultValue={state['redemptionStart']}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setValue('redemptionStart', e.target.value)}
        />
      )}
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
