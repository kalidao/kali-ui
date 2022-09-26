import { style } from '@vanilla-extract/css'
import { vars } from '@kalidao/reality'

export const layout = style({
  height: '90vh',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  gap: vars.space[10],
})
