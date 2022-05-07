import React from 'react'
import { styled } from '../stitches.config';
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { CheckIcon } from '@radix-ui/react-icons';
import { Controller } from 'react-hook-form';

const StyledCheckbox = styled(CheckboxPrimitive.Root, {
    all: 'unset',
    backgroundColor: 'white',
    width: 25,
    height: 25,
    borderRadius: 4,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: `0 2px 10px $darkgray`,
    '&:hover': { backgroundColor: '$lightgray' },
    '&:focus': { boxShadow: `0 0 0 2px $green` },
});
  
const StyledIndicator = styled(CheckboxPrimitive.Indicator, {
    color: '$green',
});

const Checkbox = (props) => (
    <Controller
      {...props}
      render={({ field }) => (
        <StyledCheckbox
          {...field}
          value={undefined}
          checked={field.value}
          onCheckedChange={field.onChange}
        >
          <StyledIndicator>
              <CheckIcon />
          </StyledIndicator>
        </StyledCheckbox>
      )}
    />
);

export default Checkbox
