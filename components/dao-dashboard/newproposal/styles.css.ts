import { style } from '@vanilla-extract/css'
import { vars } from '@kalidao/reality'

export const itemContainer = style({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  gap: vars.space['4'],

  ':hover': {
    backgroundColor: vars.colors.accentSecondaryHover,
    borderColor: vars.colors.accent,
  },
})
