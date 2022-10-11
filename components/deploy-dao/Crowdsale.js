import React from 'react'
import { FormElement, Label, Form, Input, Switch } from '../../styles/form-elements'
import { Flex } from '../../styles/elements'
import { Select } from '../../styles/form-elements/Select'
import { useStateMachine } from 'little-state-machine'
import { useForm } from 'react-hook-form'
import updateAction from './updateAction'
import { Stack, Button } from '@kalidao/reality'

// TODO:
// Add purchase terms
// Add Accredited List
export default function Crowdsale({ setStep }) {
  const { actions, state } = useStateMachine({ updateAction })
  const { hardMode } = state
  const {
    control,
    watch,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const watchCrowdsale = watch('crowdsale', state.crowdsale)
  // TODO: Add custom token
  const watchPurchaseToken = watch('purchaseToken', state.purchaseToken)

  const onPrevious = (data) => {
    actions.updateAction(data)

    if (!hardMode) {
      setStep(0)
    } else {
      setStep(2)
    }
  }

  const onNext = (data) => {
    actions.updateAction(data)

    setStep(4)
  }

  return (
    <Form>
      <FormElement>
        <Label htmlFor="legal">Add Swap</Label>
        <Switch
          control={control}
          name="crowdsale"
          value="crowdsale"
          defaultValue={state.crowdsale}
          onValueChange={(value) => setValue('crowdsale', value)}
        />
      </FormElement>
      {watchCrowdsale && (
        <>
          <FormElement>
            <Label htmlFor="purchaseToken">Contribution Token</Label>
            <Select {...register('purchaseToken')} defaultValue={state['purchaseToken']}>
              <Select.Item value="eth">ETH</Select.Item>
              <Select.Item value="custom">Custom</Select.Item>
            </Select>
          </FormElement>
          {watchPurchaseToken === 'custom' && (
            <FormElement>
              <Label htmlFor="customTokenAddress">Custom Token Address</Label>
              <Input {...register('customTokenAddress')} defaultValue={state['customTokenAddress']} />
            </FormElement>
          )}
          <FormElement>
            <Label htmlFor="purchaseLimit">Total Contribution Limit</Label>
            <Flex dir="col" gap="sm">
              <Input
                type="number"
                name="purchaseLimit"
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
              />
              {errors.purchaseLimit && <span role="alert">{errors?.purchaseLimit?.message}</span>}
            </Flex>
          </FormElement>
          <FormElement>
            <Label htmlFor="personaLimit">Personal Contribution Limit</Label>
            <Flex dir="col" gap="sm">
              <Input
                type="number"
                name="personalLimit"
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
              />
              {errors.personalLimit && <span role="alert">{errors?.personalLimit?.message}</span>}
            </Flex>
          </FormElement>
          <FormElement>
            <Label htmlFor="purchaseMultiplier">Contribution Multiplier</Label>
            <Flex dir="col" gap="sm">
              <Input
                type="number"
                name="purchaseMultiplier"
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
              />
              {errors.purchaseMultiplier && <span role="alert">{errors?.purchaseMultiplier?.message}</span>}
            </Flex>
          </FormElement>
          <FormElement>
            <Label htmlFor="crowdsale-end">End Date</Label>
            <Flex dir="col" gap="sm">
              <Input
                variant="calendar"
                type="datetime-local"
                defaultValue={state['crowdsaleEnd']}
                name="crowdsale-end"
                {...register('crowdsaleEnd', {
                  required: {
                    value: true,
                    message: 'End date is required.',
                  },
                })}
              />
              {errors?.['crowdsaleEnd'] && <span role="alert">{errors?.['crowdsaleEnd']?.message}</span>}
            </Flex>
          </FormElement>
        </>
      )}

      <Stack direction={'horizontal'} align="center" justify={'flex-end'}>
        <Button
          variant="transparent"
          onClick={handleSubmit(onPrevious)}
          direction={'horizontal'}
          align="center"
          justify={'flex-end'}
        >
          Previous
        </Button>
        <Button variant="primary" type="submit" onClick={handleSubmit(onNext)}>
          Next
        </Button>
      </Stack>
    </Form>
  )
}
