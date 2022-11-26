import { style } from '@vanilla-extract/css'
import { vars } from '@kalidao/reality'

export const root = style({
  position: 'relative',
  overflow: 'hidden',
  background: vars.colors.backgroundTertiary,
  borderRadius: vars.radii['2xLarge'],
  width: '100%',
  height: vars.space[2],
  marginTop: vars.space[2],
})

export const indicator = style({
  backgroundColor: vars.colors.accent,
  width: '100%',
  height: '100%',
  transition: 'transform 660ms cubic-bezier(0.65, 0, 0.35, 1)',
})
