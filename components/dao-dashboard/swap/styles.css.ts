import { style } from '@vanilla-extract/css'
import { pulse, contentShow } from '@design/animation.css'
import { vars } from '@kalidao/reality'

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  gap: vars.space[1],

  background: vars.colors.background,
  color: vars.colors.foreground,
  borderRadius: vars.radii['2xLarge'],

  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',

  minWidth: vars.space[96],
  padding: vars.space[6],

  animation: `${contentShow} 150ms cubic-bezier(0.16, 1, 0.3, 1) forwards, ${pulse} 10s linear 0ms infinite alternate`,
})
