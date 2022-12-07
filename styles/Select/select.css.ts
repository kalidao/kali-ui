import { style } from '@vanilla-extract/css'
import { atoms, vars } from '@kalidao/reality'

export const root = style({
  backgroundColor: vars.colors.background,
  borderWidth: vars.borderWidths.px,
  borderColor: vars.colors.foregroundSecondary,
  borderRadius: vars.radii.large,
  color: vars.colors.text,
  display: 'flex',
  fontSize: vars.fontSizes.small,
  height: vars.space[12],
  transitionDuration: '150',
  transitionProperty: 'colors',
  transitionTimingFunction: 'inOut',
  padding: '10',
  selectors: {
    '&:focus-within': {
      borderColor: vars.colors.accent,
    },
  },
})

export const error = style({
  borderColor: 'red',
  cursor: 'default',
  selectors: {
    '&:focus-within': {
      borderColor: vars.colors.red,
    },
  },
})

export const disabled = style({
  borderColor: 'foregroundSecondary',
})

export const select = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: vars.space[3],

  backgroundColor: vars.colors.background,
  borderWidth: vars.borderWidths.px,
  borderColor: vars.colors.foregroundSecondary,
  borderRadius: vars.radii.large,
  color: vars.colors.text,

  fontSize: vars.fontSizes.small,
  height: vars.space[12],

  lineHeight: vars.lineHeights.normal,

  ':hover': {
    color: vars.colors.foreground,
    backgroundColor: vars.colors.backgroundSecondary,
    borderColor: vars.colors.accent,
  },
  ':focus': {
    color: vars.colors.foreground,
    backgroundColor: vars.colors.backgroundSecondary,
    borderColor: vars.colors.accent,
    boxShadow: 'none',
    outline: 'none',
  },
  ':active': {
    color: vars.colors.foreground,
    backgroundColor: vars.colors.backgroundSecondary,
    borderColor: vars.colors.accent,
  },
})
