import React from 'react'
import { DialogTitle } from '../../styles/Dialog'
import { Flex } from '../../styles/elements'
import { Form, FormElement, Input, Label } from '../../styles/form-elements'

export default function SendAssets() {
  return (
    <Flex dir="col">
        <DialogTitle>Make Payment</DialogTitle>
        <Form>
            <FormElement>
                <Label for="address">Contract Address</Label>
                <Input type="text" />
            </FormElement>
        </Form>
    </Flex>
  )
}
