import { vars } from '@kalidao/reality'
import { style } from '@vanilla-extract/css'

export const memberButton = style({
  all: 'unset',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  background: vars.colors.background,
  border: `1px solid ${vars.colors.accentSecondary}`,
  padding: vars.space[6],
  borderRadius: vars.radii['2xLarge'],

  ':hover': {
    background: vars.colors.accentSecondary,
    border: `1px solid ${vars.colors.accentSecondaryHover}`,
  },
})
