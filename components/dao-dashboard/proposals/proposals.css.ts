import { style } from '@vanilla-extract/css'
import { vars } from '@kalidao/reality'

export const container = style({
  position: 'relative',
  minHeight: '90vh',
  display: 'flex',
  flexDirection: 'column',
  gap: vars.space[5],
  padding: vars.space[6],
  backgroundColor: vars.colors.background,
  borderRadius: vars.radii['2xLarge'],
})

export const timeline = style({
  display: 'flex',
  flexDirection: 'column',
  gap: vars.space[2],
})
