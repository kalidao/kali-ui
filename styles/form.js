import { styled } from "./stitches.config";
import * as LabelPrimitive from '@radix-ui/react-label';

export const Form = styled('form', {
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem'
});

export const FormElement = styled('div', {
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

export const Error = styled('span', {
  color: '$black'
})

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




