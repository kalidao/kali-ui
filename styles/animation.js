import { keyframes } from './stitches.config'
import { cyanDark, violetDark, indigoDark, tealDark, plumDark } from '@radix-ui/colors'

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

export const cyanPulse = keyframes({
  '0%': {
    boxShadow: `0 0 5px 5px ${cyanDark.cyan5}, 0 0 10px 7px ${cyanDark.cyan6}, 0 0 15px 9px ${cyanDark.cyan7}, 0 0 20px 11px ${cyanDark.cyan9}, 0 0 25px 13px ${cyanDark.cyan10}, 0 0 30px 15px ${cyanDark.cyan11}`,
  },
  '25%': {
    boxShadow: `0 0 6px 8px ${indigoDark.indigo5}, 0 0 11px 10px ${indigoDark.indigo6}, 0 0 16px 9px ${indigoDark.indigo7}, 0 0 21px 11px ${indigoDark.indigo9}, 0 0 26px 16px ${cyanDark.cyan10}, 0 0 31px 17px ${indigoDark.indigo11}`,
  },
  '50%': {
    boxShadow: `0 0 7px 11px ${tealDark.teal5}, 0 0 12px 13px ${tealDark.teal56}, 0 0 17px 9px ${tealDark.teal57}, 0 0 22px 11px ${tealDark.teal9}, 0 0 27px 19px ${tealDark.teal10}, 0 0 32px 20px ${tealDark.teal11}`,
  },
  '75%': {
    boxShadow: `0 0 8px 14px ${violetDark.violet5}, 0 0 13px 16px ${violetDark.violet6}, 0 0 18px 9px ${violetDark.violet7}, 0 0 23px 11px ${violetDark.violet9}, 0 0 28px 22px ${violetDark.violet10}, 0 0 33px 23px ${violetDark.violet11}`,
  },
  '100%': {
    boxShadow: `0 0 9px 16px ${plumDark.plum5}, 0 0 14px 19px ${plumDark.plum6}, 0 0 19px 9px ${plumDark.plum7}, 0 0 24px 11px ${plumDark.plum9}, 0 0 29px 2px ${plumDark.plum10}, 0 0 34px 26px ${plumDark.plum11}`,
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
