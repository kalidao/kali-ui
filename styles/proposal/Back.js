import React from 'react'
import { Button } from '../elements'
import { DoubleArrowLeftIcon } from '@radix-ui/react-icons'

export default function Back({ onClick }) {
  return (
    <Button variant="back" onClick={onClick}>
      <DoubleArrowLeftIcon />
      Back
    </Button>
  )
}
