import React from 'react'
import { Select } from '@design/Select'
import { GlobalState, useStateMachine } from 'little-state-machine'
import { useForm } from 'react-hook-form'
import updateAction from './updateAction'
import { Stack, Input, FieldSet, Button, Text } from '@kalidao/reality'
import { Switch } from '@design/Switch'
import { DateInput } from '@design/DateInput'

type Props = {
  setStep: React.Dispatch<React.SetStateAction<number>>
}

// TODO:
// Add purchase terms
// Add Accredited List
export default function Crowdsale({ setStep }: Props) {
  const { actions, state } = useStateMachine({ updateAction })
  const { hardMode } = state
  const {
    control,
    watch,
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<GlobalState>()
  const watchCrowdsale = watch('crowdsale', state.crowdsale)
  // TODO: Add custom token
  const watchPurchaseToken = watch('purchaseToken', state.purchaseToken)

  const onPrevious = (data: GlobalState) => {
    actions.updateAction(data)

    if (!hardMode) {
      setStep(0)
    } else {
      setStep(2)
    }
  }

  const onNext = (data: GlobalState) => {
    actions.updateAction(data)

    setStep(4)
  }

  return (
    <FieldSet legend="Swap" description="">
      <Stack direction={'horizontal'} align="center" justify={'space-between'}>
        <Text>Add Swap</Text>
        <Switch
          label="Add Swap"
          control={control}
          name="crowdsale"
          value="crowdsale"
          defaultValue={state.crowdsale}
          onValueChange={(value: boolean) => setValue('crowdsale', value)}
        />
      </Stack>
      {watchCrowdsale && (
        <>
          <Select
            label="Contribution Token"
            {...register('purchaseToken')}
            defaultValue={state['purchaseToken']}
            options={[
              {
                label: 'ETH',
                value: 'eth',
              },
              {
                label: 'Custom',
                value: 'custom',
              },
            ]}
          />
          {watchPurchaseToken === 'custom' && (
            <Input
              label="Custom Token Address"
              {...register('customTokenAddress')}
              defaultValue={state['customTokenAddress']}
            />
          )}
          <Input
            label="Total Contribution Limit"
            type="number"
            defaultValue={state['purchaseLimit']}
            placeholder="10000"
            {...register('purchaseLimit', {
              required: {
                value: true,
                message: 'Purchase Limit is required.',
              },
              min: {
                value: 0,
                message: 'Purchase Limit must be more than 0.',
              },
            })}
            error={errors.purchaseLimit?.message}
          />

          <Input
            label="Personal Contribution Limit"
            type="number"
            defaultValue={state['personalLimit']}
            placeholder="100"
            {...register('personalLimit', {
              required: {
                value: true,
                message: 'Personal Purchase Limit is required.',
              },
              min: {
                value: 0,
                message: 'Personal purchase Limit must be more than 0.',
              },
            })}
            error={errors.personalLimit?.message}
          />

          <Input
            label="Contribution Multiplier"
            type="number"
            defaultValue={state['purchaseMultiplier']}
            placeholder="10"
            {...register('purchaseMultiplier', {
              required: {
                value: true,
                message: 'Purchase Multiplier is required.',
              },
              min: {
                value: 0,
                message: 'Purchase Multiplier must be more than 0.',
              },
            })}
            error={errors?.purchaseMultiplier?.message}
          />
          <DateInput
            label="End Date"
            defaultValue={state['crowdsaleEnd']}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setValue('crowdsaleEnd', e.target.value)}
            error={errors.crowdsaleEnd?.message}
          />
        </>
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
