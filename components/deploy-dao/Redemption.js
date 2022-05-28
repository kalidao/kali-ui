import React from 'react'
import { FormElement, Label, Input, ConnectForm } from '../../styles/form-elements'
export default function Redemption() {
  return (
    <ConnectForm>

{({ register, setValue, watch }) => (
        <>
          <FormElement>
            <Label htmlFor="redemption-start">Start Date</Label>
            <Input variant="calendar" type="datetime-local" name="redemption-start" {...register('redemption-start')} />
          </FormElement>
        </>
      )}
    </ConnectForm>
  )
}
