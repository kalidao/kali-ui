import { vars, responsiveStyle } from '@kalidao/reality'
import { style } from '@vanilla-extract/css'

export const icon = style({})

export const govItemLabel = style([
  responsiveStyle({
    xs: {
      display: 'none',
    },
    sm: {
      display: 'none',
    },
    md: {
      display: 'none',
    },
    lg: {
      display: 'block',
    },
  }),
])

export const govItem = style({
  // all: 'unset',
  display: 'flex',
  gap: vars.space[1],
  alignItems: 'center',
  justifyContent: 'flex-start',
  padding: vars.space[3],
  width: '100%',

  ':hover': {
    backgroundColor: vars.colors.accentSecondaryHover,
  },

  // '@media': {
  //     'screen and (max-width: 768px)': {
  //         '> svg': {
  //             display: 'none',
  //         }
  //     }
  // }
})
