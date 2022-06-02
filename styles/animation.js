import { keyframes } from './stitches.config'

export const pulse = keyframes({
  '0%': {
    // opacity: 0,
    boxShadow: '2px -2px 30px 8px rgba(8, 255, 8, 1)',
  },
  '25%': {
    boxShadow: '2px -2px 30px 13px rgba(32, 255, 32, 1)',
  },
  '50%': {
    boxShadow: '2px -2px 30px 13px rgba(64, 255, 64, 1)',
  },
  '75%': {
    boxShadow: '2px -2px 30px 13px rgba(128, 255, 128, 1)',
  },
  '100%': {
    // opacity: 1,
    boxShadow: '2px -2px 30px 13px rgba(254, 255, 254, 1)',
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
