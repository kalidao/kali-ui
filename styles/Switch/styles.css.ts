import { style } from '@vanilla-extract/css'
import { vars } from '@kalidao/reality'

export const root = style({
  all: 'unset',
  width: 42,
  height: 25,
  backgroundColor: vars.colors.red,
  borderRadius: '9999px',
  position: 'relative',
  WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)',
  ':focus': { boxShadow: `0 0 0 2px ${vars.colors.background}` },
  selectors: {
    '&[data-state="checked"]': { backgroundColor: vars.colors.green },
  },
})

export const thumb = style({
  display: 'block',
  width: 21,
  height: 21,
  backgroundColor: vars.colors.background,
  borderRadius: '9999px',
  border: '1px solid $red9',
  transition: 'transform 50ms',
  transform: 'translateX(2px)',
  willChange: 'transform',

  selectors: {
    '&[data-state="checked"]': {
      transform: 'translateX(19px)',
      backgroundColor: vars.colors.white,
      border: `1px solid ${vars.colors.white}`,
    },
  },
})
