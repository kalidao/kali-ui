import { useState } from 'react';
import { Form, FormElement, Title, Label, Input } from '../../styles/form';
import Redemption from "./Redemption";
import Crowdsale from "./Crowdsale";
import { Navigation, PreviousButton, NextButton } from '../../styles/navigation';
import { useForm } from 'react-hook-form';
import { useStateMachine } from 'little-state-machine';
import updateAction from './updateAction';
import Switch from '../../styles/form/Switch';

export default function Extensions({ setStep }) {
  const { watch, register, control, handleSubmit } = useForm();
  const { actions, state } = useStateMachine({ updateAction });
  const crowdsaleActive = state.crowdsale.active 
  const { showCrowdsale, showRedemption } = watch();

  const onSubmit = (data) => {
    actions.updateAction(data);
    setStep((prev) => ++prev)
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Title>Extensions</Title>
      <FormElement>
        <Label htmlFor="redemption">Redemption</Label>
        <Switch 
          control={control} 
          name='showRedemption'
          value='showRedemption'
          defaultValue={state.showRedemption}
        />
      </FormElement>
      {showRedemption && <Redemption />}
      <FormElement>
        <Label htmlFor="crowdsale">Crowdsale</Label>
        <Switch 
          control={control} 
          name='showCrowdsale'
          value='showCrowdsale'
          defaultValue={state.showCrowdsale}
        />
      </FormElement>
      {showCrowdsale && <Crowdsale />}
      <Navigation>
        <PreviousButton onClick={() => setStep((prev) => --prev)}>
          Previous
        </PreviousButton>
        <NextButton type="submit">
          Next
        </NextButton>
      </Navigation>
    </Form>
  )
}
