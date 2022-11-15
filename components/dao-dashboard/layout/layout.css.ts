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
