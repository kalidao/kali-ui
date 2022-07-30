import { styled } from '../stitches.config'
import * as LabelPrimitive from '@radix-ui/react-label'

export const Label = styled(LabelPrimitive.Root, {
  fontSize: '16px',
  fontWeight: 500,
  fontFamily: 'Regular',
  lineHeight: '1.2',
  color: '$gray12',
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'center',
  gap: '0.5rem',
})

export default Label
