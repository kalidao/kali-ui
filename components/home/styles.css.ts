import { vars } from '@kalidao/reality'
import { style } from '@vanilla-extract/css'

export const card = style({
  backgroundColor: vars.colors.backgroundSecondary,
  borderRadius: vars.radii['2xLarge'],
  borderWidth: vars.borderWidths['0.5'],
  borderColor: vars.colors.backgroundSecondary,

  ':hover': {
    borderColor: vars.colors.accentSecondaryHover,
  },
})
