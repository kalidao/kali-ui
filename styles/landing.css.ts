import { responsiveStyle, vars } from '@kalidao/reality'
import { style } from '@vanilla-extract/css'

export const container = style({
  minHeight: '100vh',
  padding: vars.space[6],
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
})
export const heading = style([
  style({
    color: vars.colors.foreground,
    margin: 0,
  }),
  responsiveStyle({
    xs: {
      fontSize: '3rem',
    },
    md: {
      fontSize: '10rem',
    },
  }),
])

export const heading2 = style([
  style({
    color: vars.colors.foreground,
    fontWeight: vars.fontWeights.semiBold,
    margin: 0,
  }),
  responsiveStyle({
    xs: {
      fontSize: '1rem',
    },
    md: {
      fontSize: '3rem',
    },
  }),
])
