import React from 'react'
import { Form, Title } from '../../styles/form'
import { Navigation, PreviousButton, NextButton } from '../../styles/navigation';
import { useForm } from 'react-hook-form';
import { useStateMachine } from 'little-state-machine';
import updateAction from './updateAction';

export default function Legal({ setStep }) {
  const { register, handleSubmit } = useForm();
  const { actions, state } = useStateMachine({ updateAction });

  const onSubmit = (data) => {
    actions.updateAction(data);
    setStep((prev) => ++prev)
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Title>Legal</Title>
      <Navigation>
        <PreviousButton onClick={() => setStep((prev) => --prev)} >Previous</PreviousButton>
        <NextButton type="submit">Next</NextButton>
      </Navigation>
    </Form>
  )
}
