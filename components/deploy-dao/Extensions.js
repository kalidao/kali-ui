import { useState } from 'react'
import { Button, Flex } from '../../styles/elements'
import { Form, FormElement, Title, Label, Input, Switch } from '../../styles/form-elements'
import Redemption from './Redemption'
import Crowdsale from './Crowdsale'
import { useForm, Controller, FormProvider } from 'react-hook-form'
import { useStateMachine } from 'little-state-machine'
import updateAction from './updateAction'

export default function Extensions({ setStep }) {
  const methods = useForm()
  const { actions, state } = useStateMachine({ updateAction })
  const { showCrowdsale, showRedemption, hardMode } = state

  const onPrevious = (data) => {
    actions.updateAction(data)

    if (!hardMode) {
      setStep('id')
    } else {
      setStep('gov')
    }
  }

  const onNext = (data) => {
    actions.updateAction(data)

    setStep('founders')
  }

  return (
    <FormProvider {...methods}>
      <Form>
        <FormElement>
          <Label htmlFor="redemption">Redemption</Label>
          <Switch
            control={methods.control}
            name="showRedemption"
            value="showRedemption"
            defaultValue={state['showRedemption']}
          />
        </FormElement>
        {showRedemption && <Redemption />}
        <FormElement>
          <Label htmlFor="crowdsale">Crowdsale</Label>
          <Switch
            control={methods.control}
            name="showCrowdsale"
            value="showCrowdsale"
            defaultValue={state['showCrowdsale']}
          />
        </FormElement>
        {showCrowdsale && <Crowdsale />}
        <Flex css={{ justifyContent: 'flex-end' }}>
          <Button variant="transparent" onClick={methods.handleSubmit(onPrevious)}>
            Previous
          </Button>
          <Button variant="primary" type="submit" onClick={methods.handleSubmit(onNext)}>
            Next
          </Button>
        </Flex>
      </Form>
    </FormProvider>
  )
}
