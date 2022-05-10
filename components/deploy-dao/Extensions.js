import { useState } from 'react';
import { Button, Flex } from "../../styles/elements"
import { Form, FormElement, Title, Label, Input, Switch } from '../../styles/form-elements';
import Redemption from "./Redemption";
import Crowdsale from "./Crowdsale";
import { useForm } from 'react-hook-form';
import { useStateMachine } from 'little-state-machine';
import updateAction from './updateAction';


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
      <Flex css={{ justifyContent: 'flex-end'}}>
        <Button variant="transparent" onClick={() => setStep((prev) => --prev)}>
          Previous
        </Button>
        <Button variant="accent" type="submit">
          Next
        </Button>
      </Flex>
    </Form>
  )
}
