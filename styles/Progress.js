import * as ProgressPrimitive from '@radix-ui/react-progress'
import { styled } from './stitches.config'

const StyledProgress = styled(ProgressPrimitive.Root, {
  position: 'relative',
  overflow: 'hidden',
  background: '$foreground',
  borderRadius: '3px',
  width: '100%',
  height: 9,
})

const StyledIndicator = styled(ProgressPrimitive.Indicator, {
  backgroundColor: '$accent',
  width: '100%',
  height: '100%',
  transition: 'transform 660ms cubic-bezier(0.65, 0, 0.35, 1)',
})

export const Progress = StyledProgress
export const ProgressIndicator = StyledIndicator
