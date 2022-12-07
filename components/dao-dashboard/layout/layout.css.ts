import { style } from '@vanilla-extract/css'
import { vars, responsiveStyle, breakpoints } from '@kalidao/reality'
import { pxGroteskScreen } from '@design/app.css'

export const layout = style({
  minHeight: '100vh',
  paddingRight: vars.space['5'],
  paddingLeft: vars.space['5'],
  // backgroundColor: vars.colors.black,
})

export const logo = style({
  fontFamily: pxGroteskScreen,
  fontSize: vars.fontSizes['headingTwo'],
  borderBottom: `1px solid ${vars.colors.foreground}`,
  borderLeft: `1px solid ${vars.colors.foreground}`,
  paddingLeft: vars.space[2],
  paddingRight: vars.space[2],
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  lineHeight: vars.lineHeights['1.25'],
  color: vars.colors.foreground,

  ':hover': {
    // 3d scale
    filter: 'contrast(200%)',
    transform: 'scale(1.1)',
  },
})

export const header = style({
  minHeight: '10vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  zIndex: 10,
  gap: vars.space['2'],
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
  gap: vars.space['1'],
})

export const navItem = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: vars.space['3'],
  border: `1px solid ${vars.colors.accentSecondary}`,
  borderRadius: vars.radii['2xLarge'],

  ':hover': {
    background: vars.colors.accentSecondaryHover,
    border: `1px solid ${vars.colors.accent}`,
  },
})
