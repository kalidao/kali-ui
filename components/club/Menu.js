import React from 'react'
import { Flex } from '../../styles/elements'
import { DialogTitle } from '../../styles/Dialog'
import { Button } from '../../styles/elements'

export default function Menu({ setVisible }) {
  return (
    <Flex dir="col" gap="md">
        <Button onClick={() => setVisible(1)} css={{ fontFamily: 'Screen'}}>Make Payment</Button>
        <Button onClick={() => setVisible(2)}>Interact with Contracts</Button>
    </Flex>
  )
}
