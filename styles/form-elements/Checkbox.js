import React from 'react'
import { styled } from '../stitches.config'
import * as CheckboxPrimitive from '@radix-ui/react-checkbox'
import { CheckIcon, Cross1Icon } from '@radix-ui/react-icons'
import { Controller } from 'react-hook-form'

const StyledCheckbox = styled(CheckboxPrimitive.Root, {
  all: 'unset',
  backgroundColor: '$gray900',
  width: 25,
  height: 25,
  borderRadius: 5,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  border: '1px solid $gray100',
  boxShadow: `0 2px 10px '$gray100'`,
  '&:hover': { backgroundColor: '$gray900' },
  '&:focus': { boxShadow: `0 0 0 2px ${'$green500'}` },
})

const StyledIndicator = styled(CheckboxPrimitive.Indicator, {
  color: '$green800',
})

const Checkbox = (props) => (
  <Controller
    {...props}
    render={({ field }) => (
      <StyledCheckbox {...field} value={undefined} checked={field.value} onCheckedChange={field.onChange}>
        <StyledIndicator>
          {field.value === true ? <CheckIcon color="green" /> : <Cross1Icon color="red" />}
        </StyledIndicator>
      </StyledCheckbox>
    )}
  />
)

export default Checkbox
