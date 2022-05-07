import React, { useState } from 'react'
import { Form, Title, FormElement, Label } from '../../styles/form'
import { Slider, SliderButton } from '../../styles/Slider'
import { VotingPeriod } from '../../styles/VotingPeriod';
import { styled } from '../../styles/stitches.config';
import { Navigation, PreviousButton, NextButton } from "../../styles/navigation";
import { useForm, Controller } from 'react-hook-form';
import { useStateMachine } from 'little-state-machine';
import updateAction from './updateAction';
import Checkbox from "../../styles/form/Checkbox";
import Switch from "../../styles/form/Switch";

const Input = styled('input', {
  border: '1px solid $border'
});

export default function Governance({ setStep }) {
  const { register, control, handleSubmit } = useForm();
  const { actions, state } = useStateMachine({ updateAction });

  // const [showQuorum, setShowQuorum] = useState(false);
  // const [showSupermajority, setShowSupermajority] = useState(false);

  const onSubmit = (data) => {
    actions.updateAction(data);
    setStep((prev) => ++prev)
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Title>Governance</Title>
      <FormElement>
        <Label htmlFor="votingPeriod">Voting Period</Label>
        <Input 
          type="number" 
          id="quorum" 
          placeholder="5" 
          {...register('votingPeriod')}
          defaultValue={state.votingPeriod} 
          />
          <select 
            {...register('votingPeriodUnit')} 
            defaultValue={state.votingPeriodUnit}
          >
            <option value="minutes">minutes</option>
            <option value="hours">hours</option>
            <option value="days">days</option>
          </select>
      </FormElement>
      <FormElement>
        <Label htmlFor="quorum">Quorum</Label>
        <Input 
          type="number" 
          id="quorum" 
          placeholder="20" 
          {...register('quorum')}
          defaultValue={state.quorum}
        />
      </FormElement> 
      <FormElement>
        <Label htmlFor="supermajority">Supermajority</Label>
        <Input 
          type="number" 
          id="supermajority" 
          placeholder="60" 
          {...register('supermajority')}
          defaultValue={state.supermajority}
        />
      </FormElement>
      <FormElement>
        <Label htmlFor="paused">Shares Transferable</Label>
        <Switch 
          {...register('paused')} 
          control={control} 
          name="paused" 
          value="paused" 
          defaultValue={state.paused}
          />
      </FormElement>
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
