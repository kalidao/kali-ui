import React from 'react'
import { styled } from '../../styles/stitches.config';
import { Label, Input, Form, FormElement, Title } from '../../styles/form';
import { Navigation, PreviousButton, NextButton } from "../../styles/navigation";
import { useForm } from 'react-hook-form';
import { useStateMachine } from 'little-state-machine';
import updateAction from "./updateAction";

export default function Identity({ setStep }) {
  const { register, handleSubmit } = useForm();
  const { actions, state } = useStateMachine({ updateAction });

  const onSubmit = (data) => {
    actions.updateAction(data);
    
    setStep((prev) => ++prev)
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Title>Identity</Title>
      <FormElement>
        <Label htmlFor="name">Name</Label> 
        <Input 
          type="text" 
          name="name" 
          placeholder="KaliDAO" 
          {...register('name')}
          defaultValue={state.name}
        />
      </FormElement>
      <FormElement>
        <Label htmlFor="symbol">Symbol</Label> 
        <Input 
          type="text" 
          name="symbol" 
          placeholder="KALI" 
          {...register('symbol')}
          defaultValue={state.symbol}
        />
      </FormElement>
      <Navigation>
        <NextButton type="submit">Next</NextButton>
      </Navigation>
    </Form>
  )
}
