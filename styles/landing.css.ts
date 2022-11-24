import { responsiveStyle, vars } from '@kalidao/reality'
import { style } from '@vanilla-extract/css'

export const container = style({
  minHeight: '100vh',
  padding: vars.space[6],
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
      fontSize: '12rem',
    },
  }),
])
