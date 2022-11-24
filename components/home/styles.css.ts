import { vars } from '@kalidao/reality'
import { style } from '@vanilla-extract/css'

export const card = style({
  backgroundColor: vars.colors.background,
  borderRadius: vars.radii['2xLarge'],
  borderWidth: vars.borderWidths['0.5'],
  borderColor: vars.colors.background,

  ':hover': {
    backgroundColor: vars.colors.accent,
    borderColor: vars.colors.accent,
  },
})
