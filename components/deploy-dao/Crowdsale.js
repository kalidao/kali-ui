import React from 'react'
import { FormElement, Label, ConnectForm, Input } from '../../styles/form-elements'
import { Select } from '../../styles/form-elements/Select';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { StyledInput } from "../../styles/form-elements/DatePicker";
import { Separator } from '@radix-ui/react-select';

export default function Crowdsale() {
//   crowdsale: {
//     active: false,
//     purchaseLimit: 1000,
//     personalLimit: 100,
//     purchaseMultiplier: 10,
//     purchaseToken: null,
//     saleEnds: null,
// },

  return (
    <ConnectForm>
      {({ register, setValue, watch }) => (
        <>
          <FormElement>
            <Label htmlFor="purchaseToken">Purchase Token</Label>
              <Select 
                {...register('purchaseToken')} 
                defaultValue="eth"
                onValueChange={(value) => setValue('purchaseToken', value)}
              >  
              <Select.Item value="eth">
                ETH
              </Select.Item>
              <Select.Item value="custom">
                Custom
              </Select.Item>
            </Select>
          </FormElement>
          <FormElement>
            <Label htmlFor="purchaseLimit">Total Purchase Limit</Label>
            <Input type="number" name="purchaseLimit" placeholder="10000" {...register('purchaseLimit')} />
          </FormElement>
          <FormElement>
            <Label htmlFor="personaLimit">Personal Purchase Limit</Label>
            <Input type="number" name="personalLimit" placeholder="100" {...register('personalLimit')} />
          </FormElement>
          <FormElement>
            <Label htmlFor="purchaseMultiplier">Purchase Multiplier</Label>
            <Input type="number" name="purchaseMultiplier" placeholder="10" {...register('purchaseMultiplier')} />
          </FormElement>
        </>
      )}
      {/* <FormElement>
        <Label>
          Sale Ends
        </Label>
        <Controller 
          control={control}
          name="saleEnds"
          render={({ field }) => (
            <DatePicker 
              placeholder="Select Date"
              customInput={<StyledInput />}
              onChange={(date) => field.onChange(date)}
              selected={field.value}
            />
          )} 
        />
      </FormElement> */}
    </ConnectForm>
  )
}
