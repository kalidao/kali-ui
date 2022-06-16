import { styled } from '../stitches.config'
import * as SwitchPrimitive from '@radix-ui/react-switch'
import { Controller } from 'react-hook-form'

const StyledSwitch = styled(SwitchPrimitive.Root, {
  all: 'unset',
  width: 42,
  height: 25,
  backgroundColor: '$sage8',
  borderRadius: '9999px',
  position: 'relative',
  WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)',
  '&:focus': { boxShadow: `0 0 0 2px $sage10` },
  '&[data-state="checked"]': { backgroundColor: '$sage9' },
})

const StyledThumb = styled(SwitchPrimitive.Thumb, {
  display: 'block',
  width: 21,
  height: 21,
  backgroundColor: '$red10',
  borderRadius: '9999px',
  border: '1px solid $red9',
  transition: 'transform 50ms',
  transform: 'translateX(2px)',
  willChange: 'transform',
  '&[data-state="checked"]': {
    transform: 'translateX(19px)',
    backgroundColor: '$green11',
    border: '1px solid $green10',
  },
})

export const Switch = (props) => (
  <Controller
    {...props}
    render={({ field }) => (
      <StyledSwitch {...field} value={undefined} checked={field.value} onCheckedChange={field.onChange}>
        <StyledThumb />
      </StyledSwitch>
    )}
  />
)

export default Switch
