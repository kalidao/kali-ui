import { AddressZero } from '@ethersproject/constants'
import React from 'react'
import { DialogTitle } from '../../styles/Dialog'
import { Button, Flex } from '../../styles/elements'
import { Form, FormElement, Input, Label } from '../../styles/form-elements'

export default function CallContract() {
  return (
    <Flex dir="col" gap="md">
        <DialogTitle>Interact with External Contract</DialogTitle>
        <Form>
            <FormElement>
                <Label for="address">Contract Address</Label>
                <Input name="address" type="text" css={{ width: '80%'}} placeholder={AddressZero} />
            </FormElement>
            <Flex dir="col" gap="sm">
                <Label for="abi">ABI</Label>
                <Input as="textarea" name="abi" type="textarea" css={{ minHeight: '5rem', padding: '0.5rem'}} />
            </Flex>
            <Button>Submit</Button>
        </Form>
    </Flex>
  )
}
