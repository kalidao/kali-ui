import React from 'react'
import { Form, FormElement, Switch, Label, Input } from '../../styles/form-elements'
import { Select } from "../../styles/form-elements/Select";
import { useForm } from 'react-hook-form';
import { useStateMachine } from 'little-state-machine';
import updateAction from './updateAction';
import { Flex, Button, Text } from '../../styles/elements';
import { legalEntities } from '../../constants/legalEntities';
import { OpenInNewWindowIcon } from '@radix-ui/react-icons';

export default function Legal({ setStep }) { 
  const { control, watch, register, setValue, handleSubmit } = useForm();
  const watchLegal = watch("legal", false);
  const watchDocs = watch("docType", false);
  const { actions, state } = useStateMachine({ updateAction });

  const onPrevious = (data) => {
    actions.updateAction(data);

    setStep(prev => --prev)
  };
  const onNext = (data) => {
    actions.updateAction(data);

    setStep(prev => ++prev)
  };

  let selectArray = [];
  for (let key in legalEntities) {
    selectArray.push(<Select.Item key={key} value={key}>
      {legalEntities[key]["text"]}
    </Select.Item>)
  }
  
  return (
    <Form>
      <FormElement>
        <Label htmlFor="legal">Add structure</Label>
        <Switch 
          control={control} 
          name='legal'
          value='legal'
          defaultValue={state.legal}
          onValueChange={(value) => setValue("legal", value)}
        />
      </FormElement>
      { (watchLegal) && (
        <>
          <FormElement>
            <Label htmlFor="docs">
                Choose entity
            </Label>
            <Select 
              {...register('docType')}
              defaultValue="series"
              onValueChange={(value) => setValue("docType", value)}
            >
              {selectArray}
            </Select>
          </FormElement>
          {watchDocs && (legalEntities[watchDocs]["email"] === true && 
          <FormElement>
            <Label htmlFor="email">
              Email
            </Label>
            <Input
              type="email" 
              name="email" 
              placeholder="abc@xyz.com" 
              {...register('email')}
              defaultValue={state.email}
            />
          </FormElement>)}
          {watchDocs === 'existing' &&
          <FormElement>
            <Label htmlFor="existingDocs">
              Existing Docs
            </Label>
            <Input
              type="text" 
              name="existingDocs" 
              placeholder="Any link" 
              {...register('existingDocs')}
              defaultValue={state.existingDocs}
            />
          </FormElement>  
          }
          {watchDocs && 
          <FormElement>
            {legalEntities[watchDocs]["message"]}
          </FormElement>}
          {watchDocs && (legalEntities[watchDocs]["template"] != null && 
            <Text 
              as="a" 
              href={legalEntities[watchDocs]["template"]} 
              target="_blank"
              css={{
                display: 'flex',
                gap: '0.2rem',
                justifyContent: 'flex-end',
                alignItems: 'center',
                fontFamily: 'Italic',

                '&:hover': {
                  color: '$accent'
                }
              }}
            >
              Review Template 
              <OpenInNewWindowIcon />
            </Text>)}
        </>  
      )}  

      <Flex css={{ justifyContent: 'flex-end'}}>
        <Button variant="transparent" onClick={handleSubmit(onPrevious)} >Previous</Button>
        <Button variant="primary" onClick={handleSubmit(onNext)}>Next</Button>
      </Flex>
    </Form>
  )
}
