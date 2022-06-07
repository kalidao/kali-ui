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
  //   crowdsale: {
  //     active: false,
  //     purchaseLimit: 1000,
  //     personalLimit: 100,
  //     purchaseMultiplier: 10,
  //     purchaseToken: null,
  //     saleEnds: null,
  // },

  return (
    <Form>
      <FormElement>
        <Label htmlFor="legal">Add structure</Label>
        <Input
          type="checkbox"
          variant="checkbox"
          control={control}
          name="crowdsale"
          value={state.crowdsale}
          defaultValue={state.crowdsale}
          onValueChange={(value) => setValue('crowdsale', value)}
          {...register('crowdsale')}
        />
      </FormElement>
      {watchCrowdsale && (
        <>
          <FormElement>
            <Label htmlFor="purchaseToken">Purchase Token</Label>
            <Select
              {...register('purchaseToken')}
              defaultValue={state['purchaseToken']}
              onValueChange={(value) => setValue('purchaseToken', value)}
            >
              <Select.Item value="eth">ETH</Select.Item>
              <Select.Item value="custom">Custom</Select.Item>
            </Select>
          </FormElement>
          <FormElement>
            <Label htmlFor="purchaseLimit">Total Purchase Limit</Label>
            <Input
              type="number"
              name="purchaseLimit"
              defaultValue={state['purchaseLimit']}
              placeholder="10000"
              {...register('purchaseLimit')}
            />
          </FormElement>
          <FormElement>
            <Label htmlFor="personaLimit">Personal Purchase Limit</Label>
            <Input
              type="number"
              name="personalLimit"
              defaultValue={state['personalLimit']}
              placeholder="100"
              {...register('personalLimit')}
            />
          </FormElement>
          <FormElement>
            <Label htmlFor="purchaseMultiplier">Purchase Multiplier</Label>
            <Input
              type="number"
              name="purchaseMultiplier"
              defaultValue={state['purchaseMultiplier']}
              placeholder="10"
              {...register('purchaseMultiplier')}
            />
          </FormElement>
          <FormElement>
            <Label htmlFor="crowdsale-end">End Date</Label>
            <Input
              variant="calendar"
              type="datetime-local"
              defaultValue={state['crowdsale-end']}
              name="crowdsale-end"
              {...register('crowdsale-end')}
            />
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
