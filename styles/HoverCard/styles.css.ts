import { vars } from '@kalidao/reality'
import { keyframes, style } from '@vanilla-extract/css'

// .HoverCardContent {
//     border-radius: 6px;
//     padding: 20px;
//     width: 300px;
//     background-color: white;
//     box-shadow: hsl(206 22% 7% / 35%) 0px 10px 38px -10px, hsl(206 22% 7% / 20%) 0px 10px 20px -15px;
//     animation-duration: 400ms;
//     animation-timing-function: cubic-bezier(0.16, 1, 0.3, 1);
//     will-change: transform, opacity;
//   }
//   .HoverCardContent[data-side='top'] {
//     animation-name: slideDownAndFade;
//   }
//   .HoverCardContent[data-side='right'] {
//     animation-name: slideLeftAndFade;
//   }
//   .HoverCardContent[data-side='bottom'] {
//     animation-name: slideUpAndFade;
//   }
//   .HoverCardContent[data-side='left'] {
//     animation-name: slideRightAndFade;
//   }

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
  width: '300px',
  backgroundColor: vars.colors.backgroundSecondary,
  boxShadow: vars.shadows['2xLarge'],
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
