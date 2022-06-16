import { keyframes } from './stitches.config'

export const pulse = keyframes({
  '0%': {
    // opacity: 0,
    boxShadow: `2px -2px 30px 8px hsl(250, 46.8%, 38.9%)`,
  },
  '25%': {
    boxShadow: '2px -2px 30px 13px hsl(252, 56.0%, 57.5%)',
  },
  '50%': {
    boxShadow: '2px -2px 30px 13px hsl(251, 63.2%, 63.2%)',
  },
  '75%': {
    boxShadow: '2px -2px 30px 13px hsl(250, 95.0%, 76.8%)',
  },
  '100%': {
    // opacity: 1,
    boxShadow: '2px -2px 30px 13px hsl(252, 87.0%, 96.4%)',
  },
})

export const bounce = keyframes({
  '0%': {
    transform: 'translate3d(0, 0, 0)',
  },
  '100%': {
    transform: 'translate3d(0, 10px, 0)',
  },
})
export const contentShow = keyframes({
  '0%': { opacity: 0, transform: 'translate(-50%, -48%) scale(.96)' },
  '100%': { opacity: 1, transform: 'translate(-50%, -50%) scale(1)' },
})

export const overlayShow = keyframes({
  '0%': { opacity: 0 },
  '100%': { opacity: 1 },
})

export const slideUpAndFade = keyframes({
  '0%': { opacity: 0, transform: 'translateY(2px)' },
  '100%': { opacity: 1, transform: 'translateY(0)' },
})

export const slideRightAndFade = keyframes({
  '0%': { opacity: 0, transform: 'translateX(-2px)' },
  '100%': { opacity: 1, transform: 'translateX(0)' },
})

export const slideDownAndFade = keyframes({
  '0%': { opacity: 0, transform: 'translateY(-2px)' },
  '100%': { opacity: 1, transform: 'translateY(0)' },
})

export const slideLeftAndFade = keyframes({
  '0%': { opacity: 0, transform: 'translateX(2px)' },
  '100%': { opacity: 1, transform: 'translateX(0)' },
})
