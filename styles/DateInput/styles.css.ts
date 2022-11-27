import { style } from '@vanilla-extract/css'
import { vars } from '@kalidao/reality'

export const container = style({
  backgroundColor: vars.colors.background,
  outlineWidth: vars.borderWidths.px,
  outlineColor: vars.colors.foregroundSecondary,
  outlineStyle: 'solid',
  borderWidth: vars.borderWidths.px,
  borderColor: vars.colors.foregroundSecondary,
  borderRadius: vars.radii.large,
  color: vars.colors.text,
  fontSize: vars.fontSizes.small,
  paddingRight: vars.space[3.5],
  paddingLeft: vars.space[3.5],
  paddingTop: vars.space[3.5],
  paddingBottom: vars.space[3.5],

  display: 'flex',

  ':hover': {
    outlineColor: vars.colors.accent,
    backgroundColor: vars.colors.backgroundSecondary,
  },
})
