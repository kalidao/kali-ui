import { vars } from '@kalidao/reality'
import { style, keyframes } from '@vanilla-extract/css'

const slideDown = keyframes({
  from: { height: 0 },
  to: { height: 'var(--radix-accordion-content-height)' },
})

const slideUp = keyframes({
  from: { height: 'var(--radix-accordion-content-height)' },
  to: { height: 0 },
})

export const header = style({
  all: 'unset',
  display: 'flex',
})

export const icon = style({
  color: vars.colors.foreground,
  transition: 'transform 300ms cubic-bezier(0.87, 0, 0.13, 1)',
  selectors: {
    '[data-state=closed] &': { transform: 'rotate(180deg)' },
  },
})

export const trigger = style({
  all: 'unset',
  fontFamily: vars.fonts.sans,
  backgroundColor: vars.colors.background,
  padding: vars.space[2],
  paddingRight: vars.space[4],
  paddingLeft: vars.space[4],
  height: vars.space[8],
  flex: 1,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  fontSize: vars.fontSizes.base,
  lineHeight: vars.lineHeights.normal,
  color: vars.colors.foreground,
  fontWeight: vars.fontWeights.semiBold,

  selectors: {
    '&[data-state="closed"]': { backgroundColor: vars.colors.background },
    '&[data-state="open"]': { backgroundColor: vars.colors.background, color: vars.colors.foreground },
    '&:hover': { backgroundColor: vars.colors.accentSecondary },
  },
})

export const root = style({
  borderRadius: vars.radii['2xLarge'],
  width: vars.space.full,
  backgroundColor: vars.colors.background,
  display: 'flex',
  flexDirection: 'column',
  gap: vars.space[1],
})

export const item = style({
  overflow: 'hidden',
  padding: vars.space[1],
  borderColor: vars.colors.foregroundSecondary,
  borderWidth: vars.borderWidths['0.5'],
  borderStyle: vars.borderStyles.solid,

  selectors: {
    '&:first-child': {
      marginTop: 0,
      borderTopLeftRadius: 4,
      borderTopRightRadius: 4,
    },

    '&:last-child': {
      borderBottomLeftRadius: 4,
      borderBottomRightRadius: 4,
    },
    '&:focus-within': {
      position: 'relative',
      zIndex: 1,
      boxShadow: `0 0 0 2px ${'$gray'}`,
    },
  },
})

export const content = style({
  overflow: 'hidden',
  fontSize: 15,
  color: '$gray12',
  backgroundColor: '$mauve2',

  selectors: {
    '&[data-state="open"]': {
      animation: `${slideDown} 300ms cubic-bezier(0.87, 0, 0.13, 1) forwards`,
    },
    '&[data-state="closed"]': {
      animation: `${slideUp} 300ms cubic-bezier(0.87, 0, 0.13, 1) forwards`,
    },
  },
})

export const chevron = style({
  color: '$mauve12',
  transition: 'transform 300ms cubic-bezier(0.87, 0, 0.13, 1)',
  selectors: {
    '[data-state=closed] &': { transform: 'rotate(180deg)' },
  },
})
