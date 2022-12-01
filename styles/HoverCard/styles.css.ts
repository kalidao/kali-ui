import { vars } from '@kalidao/reality'
import { keyframes, style } from '@vanilla-extract/css'

const slideDownAndFade = keyframes({
  '0%': { opacity: 0, transform: 'translateY(2px)' },
  '100%': { opacity: 1, transform: 'translateY(0)' },
})

const slideLeftAndFade = keyframes({
  '0%': { opacity: 0, transform: 'translateX(-2px)' },
  '100%': { opacity: 1, transform: 'translateX(0)' },
})

const slideUpAndFade = keyframes({
  '0%': { opacity: 0, transform: 'translateY(-2px)' },
  '100%': { opacity: 1, transform: 'translateY(0)' },
})

const slideRightAndFade = keyframes({
  '0%': { opacity: 0, transform: 'translateX(2px)' },
  '100%': { opacity: 1, transform: 'translateX(0)' },
})

export const content = style({
  borderRadius: vars.radii['2xLarge'],
  padding: vars.space[3],
  width: vars.space[36],
  backgroundColor: vars.colors.backgroundSecondary,
  boxShadow: `${vars.shadows[1]} ${vars.colors.foregroundTertiary}`,
  animationDuration: '400ms',
  animationTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
  willChange: 'transform, opacity',

  selectors: {
    [`&[data-side='top']`]: {
      animationName: slideDownAndFade,
    },
    [`&[data-side='right']`]: {
      animationName: slideLeftAndFade,
    },
    [`&[data-side='bottom']`]: {
      animationName: slideUpAndFade,
    },
    [`&[data-side='left']`]: {
      animationName: slideRightAndFade,
    },
  },
})

export const arrow = style({
  fill: vars.colors.backgroundSecondary,
})
