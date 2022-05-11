import { useState } from 'react';
import { Button, Flex } from "../../styles/elements"
import { Form, FormElement, Title, Label, Input, Switch, DatePicker } from '../../styles/form-elements';
import Redemption from "./Redemption";
import Crowdsale from "./Crowdsale";
import { useForm, Controller, FormProvider } from 'react-hook-form';
import { useStateMachine } from 'little-state-machine';
import updateAction from './updateAction';
import { StyledInput } from '../../styles/form-elements/DatePicker';
// import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function Extensions({ setStep }) {
  const methods = useForm();
  const { actions, state } = useStateMachine({ updateAction });
  const { showCrowdsale, showRedemption } = methods.watch();

  const onSubmit = (data) => {
    actions.updateAction(data);
    setStep((prev) => ++prev)
  };

  return (
    <FormProvider {...methods}>
    <Form onSubmit={methods.handleSubmit(onSubmit)}>
      <FormElement>
        <Label htmlFor="redemption">Redemption</Label>
        <Switch 
          control={methods.control} 
          name='showRedemption'
          value='showRedemption'
          defaultValue={false}
        />
      </FormElement>
      {showRedemption && <Redemption />}
      <FormElement>
        <Label htmlFor="crowdsale">Crowdsale</Label>
        <Switch 
          control={methods.control} 
          name='showCrowdsale'
          value='showCrowdsale'
          defaultValue={false}
        />
      </FormElement>
      {showCrowdsale && <Crowdsale />
      // <>
      //   <FormElement>
      //     <Label>
      //       Sale Ends
      //     </Label>
      //     <Controller
      //       control={control}
      //       name="saleEnds"
      //       regster={register('saleEnds')}
      //       render={({ field: { onChange, onBlur, value, ref } }) => (
      //         <DatePicker
      //           onChange={onChange}
      //           onBlur={onBlur}
      //           selected={value}
      //         />
      //       )}
      //     />
      //   </FormElement>
      // </>
      }
      <Flex css={{ justifyContent: 'flex-end'}}>
        <Button variant="transparent" onClick={() => setStep((prev) => --prev)}>
          Previous
        </Button>
        <Button variant="primary" type="submit">
          Next
        </Button>
      </Flex>
    </Form>
    </FormProvider>
  )
}
