import { style } from '@vanilla-extract/css'
import { vars } from '@kalidao/reality'

export const arrow = style({
  fill: vars.colors.backgroundSecondary,
})

export const content = style({
  minWidth: 220,
  backgroundColor: vars.colors.backgroundSecondary,
  borderRadius: 6,
  padding: 5,
  boxShadow: '0px 10px 38px -10px rgba(22, 23, 24, 0.35), 0px 10px 20px -15px rgba(22, 23, 24, 0.2)',
})

export const item = style({
  all: 'unset',
  fontSize: vars.fontSizes.base,
  lineHeight: vars.lineHeights.normal,
  color: vars.colors.foreground,
  borderRadius: vars.radii.none,
  display: 'flex',
  alignItems: 'center',
  height: 25,
  padding: vars.space[1],
  position: 'relative',
  paddingLeft: vars.space[6],
  userSelect: 'none',

  ':hover': {
    background: vars.colors.foregroundSecondary,
  },

  ':focus': {
    background: vars.colors.foregroundSecondaryHover,
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
  transition: 'transform 250ms ease',

  selectors: {
    '&[data-state=open]': {
      transform: 'rotate(-90deg)',
    },
  },
})

export const label = style({
  paddingLeft: vars.space[6],
  fontSize: vars.fontSizes.base,
  lineHeight: vars.lineHeights[2],
  color: vars.colors.accent,
})

export const itemLink = style({
  all: 'unset',
})
