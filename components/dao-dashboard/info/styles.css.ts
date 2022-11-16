import { style } from '@vanilla-extract/css'
import { vars } from '@kalidao/reality'

export const container = style({
  background: vars.colors.black,
  width: vars.space.full,
  padding: vars.space['6'],
  borderRadius: vars.radii['2xLarge'],
})

export const infoGrid = style({
  display: 'grid',
  gridTemplateColumns: `repeat(2, 1fr)`,
  gap: vars.space[2],
})
