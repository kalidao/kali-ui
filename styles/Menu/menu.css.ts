import { style } from '@vanilla-extract/css'
import { vars } from '@kalidao/reality'

export const arrow = style({
  fill: vars.colors.backgroundSecondary,
})

export const content = style({
  minWidth: 220,
  background: vars.colors.background,
  borderRadius: vars.radii['2xLarge'],
  padding: vars.space[2],
  boxShadow: `${vars.shadows[1]} ${vars.colors.foregroundTertiary}`,
})

export const item = style({
  all: 'unset',
  fontFamily: vars.fonts.sans,
  fontSize: vars.fontSizes.base,
  lineHeight: vars.lineHeights.normal,
  color: vars.colors.foreground,
  borderRadius: vars.radii.large,
  display: 'flex',
  alignItems: 'center',
  height: vars.space[10],
  padding: vars.space[1],
  position: 'relative',
  paddingLeft: vars.space[6],
  userSelect: 'none',

  ':hover': {
    color: vars.colors.foreground,
    background: vars.colors.backgroundTertiary,
  },

  ':focus': {
    color: vars.colors.foreground,
    background: vars.colors.backgroundSecondary,
  },
})

export const separator = style({
  backgroundColor: vars.colors.foregroundTertiary,
  height: 1,
  margin: 5,
})

export const icon = style({
  position: 'relative',
  color: vars.colors.foreground,
  top: 1,

  selectors: {
    '&[data-state=open]': {
      transform: 'rotate(-90deg)',
      transition: 'transform 250ms ease',
    },
  },
})

export const trigger = style({
  all: 'unset',
  fontFamily: vars.fonts.sans,
  lineHeight: vars.lineHeights.normal,
  padding: vars.space[3],
  borderRadius: vars.radii.full,

  ':hover': {
    backgroundColor: vars.colors.accentSecondaryHover,
  },
  transition: 'transform 250ms ease',
  selectors: {
    '&[data-state=open]': {
      backgroundColor: vars.colors.accentSecondary,
      transform: 'rotate(-90deg)',
    },
  },
})
export const label = style({
  paddingLeft: vars.space[6],
  fontSize: vars.fontSizes.base,
  fontFamily: vars.fonts.sans,
  lineHeight: vars.lineHeights[2],
  color: vars.colors.accent,
  width: vars.space.full,
})

export const itemLink = style({
  all: 'unset',
})
