import { style } from '@vanilla-extract/css'
import { vars } from '@kalidao/reality'

export const link = style({
  all: 'unset',
  color: vars.colors.foregroundSecondary,

  ':hover': {
    cursor: 'pointer',
    color: vars.colors.accent,
  },
})
