import { style } from '@vanilla-extract/css'
import { pulse, contentShow } from '@design/animation.css'
import { vars } from '@kalidao/reality'

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',

  background: vars.colors.background,
  color: '$mauve12',
  borderRadius: '20px',

  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',

  width: '90vw',
  maxWidth: '600px',
  maxHeight: '90vh',
  padding: 25,

  animation: `${contentShow} 150ms cubic-bezier(0.16, 1, 0.3, 1) forwards, ${pulse} 10s linear 0ms infinite alternate`,
})
