import { style } from '@vanilla-extract/css'
import { vars, responsiveStyle, breakpoints } from '@kalidao/reality'

export const layout = style({
  minHeight: '100vh',
  paddingRight: vars.space['5'],
  paddingLeft: vars.space['5'],
  // backgroundColor: vars.colors.black,
})

export const header = style({
  minHeight: '10vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  zIndex: 10,
  position: 'relative',
})

export const dashboardHeader = style({
  minHeight: '10vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  '@media': {
    '(min-width: 1024px)': {
      paddingRight: vars.space['5'],
    },
  },
})

export const container = style({
  minHeight: '90vh',
  position: 'relative',
})

export const splashContainer = style({
  minHeight: '90vh',
  zIndex: '-1',
})

export const navMenu = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(2, 1fr)',
  gap: vars.space['1']
})

export const navItem = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: vars.space['6'],
  border: `1px solid ${vars.colors.accentSecondary}`,
  borderRadius: vars.radii['2xLarge'],

  ":hover": {
    background: vars.colors.accentSecondaryHover,
    border: `1px solid ${vars.colors.accent}`,

  }
})