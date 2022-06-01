import React, { useState } from 'react'
import { Button, Flex } from '../../styles/elements';
import { Input, Form, Title, FormElement, Label, Switch } from '../../styles/form-elements'
import { Select } from '../../styles/form-elements/Select';
import { styled } from '../../styles/stitches.config';
import { useForm, Controller } from 'react-hook-form';
import { useStateMachine } from 'little-state-machine';
import updateAction from './updateAction';
import InfoTip from "../elements/InfoTip";

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
        <Label htmlFor="votingPeriod">Voting Period <InfoTip label="This determines voting period" /></Label>
        <Flex css={{ '&:hover': { 
      boxShadow: '-2px 0px 20px 3px #ffa00a' 
    } }}>
        <Input 
          variant="voting"
          type="number" 
          id="quorum" 
          placeholder="5" 
          {...register('votingPeriod')}
          defaultValue={state.votingPeriod} 
          css={{
            '&:hover': {
              boxShadow: 'none'
            }
          }}
          />
        <Select 
          {...register('votingPeriodUnit')} 
          defaultValue="day"
          onValueChange={(value) => setValue('votingPeriodUnit', value)}
        >  
            <Select.Item value="min">
              minutes
            </Select.Item>
            <Select.Item value="hour">
              hours
            </Select.Item>
            <Select.Item value="day">
              days
            </Select.Item>
          </Select>
        </Flex>
      </FormElement>
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
        <Label htmlFor="approval">Approval Needed</Label>
        <Input 
          type="number" 
          id="approval" 
          placeholder="60" 
          {...register('approval')}
          defaultValue={state.approval}
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
