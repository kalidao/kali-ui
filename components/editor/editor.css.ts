import { style } from '@vanilla-extract/css'
import { vars } from '@kalidao/reality'

export const editor = style({
  all: 'unset',
  backgroundColor: vars.colors.background,
  outlineWidth: vars.borderWidths.px,
  outlineColor: vars.colors.foregroundSecondary,
  outlineStyle: 'solid',
  borderWidth: vars.borderWidths.px,
  borderColor: vars.colors.foregroundSecondary,
  borderRadius: vars.radii.large,
  color: vars.colors.text,
  fontSize: vars.fontSizes.small,
  paddingRight: vars.space[3],
  paddingLeft: vars.space[3],

  display: 'flex',
  minHeight: vars.space[24],

  ':hover': {
    outlineColor: vars.colors.accent,
    backgroundColor: vars.colors.backgroundSecondary,
  },
})

export const bubbles = style({
  display: 'flex',
  gap: vars.space[1],
  backgroundColor: vars.colors.backgroundSecondary,
  borderRadius: vars.radii['2xLarge'],
  fontSize: vars.fontSizes.label,
  padding: vars.space[3],
})
