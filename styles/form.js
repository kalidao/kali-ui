import { styled } from "./stitches.config";
import * as LabelPrimitive from '@radix-ui/react-label';
import * as SwitchPrimitive from '@radix-ui/react-switch';

export const Box = styled('div', {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
});

export const Title = styled('div', {
  fontSize: '20px',
  color: '$black',
  fontWeight: '800',
  borderBottom: '1px solid $border'
});

export const Label = styled(LabelPrimitive.Root, {
    fontSize: '16px',
    fontWeight: 600,
    lineHeight: '18.51px',
    color: '$black',
    userSelect: 'none',
});;

export const Input = styled('input', {
  all: 'unset',
  width: 200,
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: 4,
  padding: '0 10px',
  height: 35,
  fontSize: 15,
  lineHeight: 1,
  color: '$black',
  backgroundColor: '$white',
  border: '1px solid $border',
  boxShadow: `0 0 0 1px $blackAlpha`,
  '&:focus': { boxShadow: `0 0 0 2px $purple` },
});

// SWITCH
const StyledSwitch = styled(SwitchPrimitive.Root, {
  all: 'unset',
  width: 42,
  height: 25,
  backgroundColor: '$red',
  borderRadius: '9999px',
  position: 'relative',
  boxShadow: `0 2px 10px $blackAlpha`,
  WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)',
  '&:focus': { boxShadow: `0 0 0 2px $border` },
  '&[data-state="checked"]': { backgroundColor: '$green' },
});

const StyledThumb = styled(SwitchPrimitive.Thumb, {
  display: 'block',
  width: 21,
  height: 21,
  backgroundColor: 'white',
  borderRadius: '9999px',
  boxShadow: `0 2px 2px '$blackAlpha'`,
  transition: 'transform 100ms',
  transform: 'translateX(2px)',
  willChange: 'transform',
  '&[data-state="checked"]': { transform: 'translateX(19px)' },
});

export const Switch = (props) => {
  return <StyledSwitch {...props} >
    <StyledThumb />
  </StyledSwitch>
}


