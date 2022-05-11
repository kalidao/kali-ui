import React from 'react'
import { Flex, Button } from '../../styles/elements';
import { Form, FormElement, Label, Input } from "../../styles/form-elements"
import { useForm } from 'react-hook-form';
import { useStateMachine } from 'little-state-machine';
import updateAction from "./updateAction";

export default function Identity({ setStep, onNext }) {
  const { register, handleSubmit } = useForm();
  const { actions, state } = useStateMachine({ updateAction });

  const onSubmit = (data) => {
    actions.updateAction(data);
    
    setStep((prev) => ++prev)
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
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
      <Flex css={{ justifyContent: 'flex-end'}}>
        <Button variant="primary" type="submit">Next</Button>
      </Flex>
    </Form>
  )
}
