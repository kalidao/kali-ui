import { styled } from '../stitches.config'
import * as LabelPrimitive from '@radix-ui/react-label'

export const Label = styled(LabelPrimitive.Root, {
  fontSize: '16px',
  fontWeight: 600,
  lineHeight: '18.51px',
  color: '$foreground',
  userSelect: 'none',
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'center',
  gap: '0.5rem',
})

export default Label
