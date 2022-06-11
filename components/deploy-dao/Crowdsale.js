import React from 'react'
import { FormElement, Label, Form, Input, Switch } from '../../styles/form-elements'
import { Flex, Button } from '../../styles/elements'
import { Select } from '../../styles/form-elements/Select'
import { useStateMachine } from 'little-state-machine'
import { useForm } from 'react-hook-form'
import updateAction from './updateAction'

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
  const watchPurchaseToken = watch('purchaseToken', state.purchaseToken)
  const onPrevious = (data) => {
    actions.updateAction(data)

    if (!hardMode) {
      setStep('id')
    } else {
      setStep('redemption')
    }
  }

  const onNext = (data) => {
    actions.updateAction(data)

    setStep('founders')
  }

  return (
    <Form>
      <FormElement>
        <Label htmlFor="legal">Add Crowdsale</Label>
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
            <Label htmlFor="purchaseToken">Purchase Token</Label>
            <Select {...register('purchaseToken')} defaultValue={state['purchaseToken']}>
              <Select.Item value="eth">ETH</Select.Item>
              <Select.Item value="custom">Custom</Select.Item>
            </Select>
          </FormElement>
          <FormElement>
            <Label htmlFor="purchaseLimit">Total Purchase Limit</Label>
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
            <Label htmlFor="personaLimit">Personal Purchase Limit</Label>
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
            <Label htmlFor="purchaseMultiplier">Purchase Multiplier</Label>
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

      <Flex css={{ justifyContent: 'flex-end' }}>
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
