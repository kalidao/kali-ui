import { style } from '@vanilla-extract/css'
import { vars } from '@kalidao/reality'

export const container = style({
  height: '90vh',
  display: 'flex',
  flexDirection: 'column',
  gap: vars.space[5],
  paddingBottom: vars.space[20],
})

export const timeline = style({
  width: 'fit-content',
  display: 'flex',
  flexDirection: 'column',
  gap: vars.space[2],
})
