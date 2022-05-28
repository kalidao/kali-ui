import React from 'react'
import { FormElement, Label, ConnectForm, Input } from '../../styles/form-elements'
import { Select } from '../../styles/form-elements/Select';

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
          <FormElement>
            <Label htmlFor="crowdsale-end">End Date</Label>
            <Input variant="calendar" type="datetime-local" name="crowdsale-end" {...register('crowdsale-end')} />
          </FormElement>
        </>
      )}
    </ConnectForm>
  )
}
