import React from 'react'
import { GearIcon, Cross2Icon } from '@radix-ui/react-icons'
import { Popover, PopoverTrigger, PopoverContent, PopoverArrow, PopoverClose } from '../../styles/elements/Popover'
import { Flex, Text, Button } from '../../styles/elements'
import { FormElement, Label } from '../../styles/form-elements'
import { StyledSwitch, StyledThumb } from '../../styles/form-elements/Switch'
export default function Settings({ view, setView }) {
  const updateView = (to) => {
    if (view != to) {
      setView(to)
    } else {
      setView(0)
    }
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          css={{
            all: 'unset',
            fontFamily: 'inherit',
            borderRadius: '100%',
            height: 35,
            width: 35,
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '$mauve11',
            boxShadow: `0 2px 10px $blackA7`,
            '&:hover': { backgroundColor: '$violet2' },
            '&:focus': { boxShadow: `0 0 0 2px $violet3` },
          }}
        >
          <GearIcon />
        </Button>
      </PopoverTrigger>
      <PopoverContent sideOffset={5}>
        <Flex dir="col" gap="md">
          <Text
            css={{
              fontSize: '16px',
              fontWeight: '800',
              color: '$gray12',
            }}
          >
            Advanced Settings
          </Text>
          <FormElement>
            <Label>Create Entity Type</Label>
            <StyledSwitch defaultChecked={view != 1 ? false : true} onCheckedChange={() => updateView(1)}>
              <StyledThumb />
            </StyledSwitch>
          </FormElement>
          <FormElement>
            <Label>Update Base URI</Label>
            <StyledSwitch defaultChecked={view != 2 ? false : true} onCheckedChange={() => updateView(2)}>
              <StyledThumb />
            </StyledSwitch>
          </FormElement>
        </Flex>
        <PopoverArrow />
        <PopoverClose aria-label="Close">
          <Cross2Icon />
        </PopoverClose>
      </PopoverContent>
    </Popover>
  )
}
