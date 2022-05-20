import React, { useState } from 'react'
import { Button, Flex } from '../../styles/elements';
import { Input, Form, Title, FormElement, Label, Switch } from '../../styles/form-elements'
import { Select } from '../../styles/form-elements/Select';
import { styled } from '../../styles/stitches.config';
import { useForm, Controller } from 'react-hook-form';
import { useStateMachine } from 'little-state-machine';
import updateAction from './updateAction';


export default function Governance({ setStep }) {
  const { register, setValue, control, handleSubmit } = useForm();
  const { actions, state } = useStateMachine({ updateAction });

  // const [showQuorum, setShowQuorum] = useState(false);
  // const [showSupermajority, setShowSupermajority] = useState(false);

  const onSubmit = (data) => {
    actions.updateAction(data);
    setStep((prev) => ++prev)
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormElement>
        <Label htmlFor="quorum">Participation Needed</Label>
        <Input 
          type="number" 
          id="quorum" 
          placeholder="20" 
          {...register('quorum')}
          defaultValue={state.quorum}
        />
      </FormElement> 
      <FormElement>
        <Label htmlFor="lootPaused">Loot Transferablity</Label>
        <Switch 
          {...register('lootPaused')} 
          control={control} 
          name="lootPaused" 
          value="lootPaused" 
          defaultValue={state.lootPaused}
          />
      </FormElement>
      <FormElement>
        <Label htmlFor="signerPaused">Signer NFT Transferablity</Label>
        <Switch 
          {...register('signerPaused')} 
          control={control} 
          name="signerPaused" 
          value="signerPaused" 
          defaultValue={state.signerPaused}
          />
      </FormElement>
      <Flex css={{ justifyContent: 'flex-end'}}>
        <Button variant="transparent" onClick={() => setStep((prev) => --prev)}>
          Previous
        </Button>
        <Button variant="primary" type="submit">
          Next
        </Button>
      </Flex>
    </Form>
  )
}
