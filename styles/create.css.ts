import { vars } from '@kalidao/reality'
import { style } from '@vanilla-extract/css'

export const container = style({
  position: 'relative',
  minHeight: '90vh',
  minWidth: vars.space.viewWidth,
  display: 'flex',
  alignItems: 'flex-start',
  justifyContent: 'flex-start',
  flexDirection: 'column',
  gap: vars.space[3],
  padding: vars.space[6],
})
