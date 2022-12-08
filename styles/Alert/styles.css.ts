import { style } from '@vanilla-extract/css'
import { vars } from '@kalidao/reality'
import { overlayShow, contentShow, pulse } from '@design/animation.css'

export const overlay = style({
  backdropFilter: 'blur(100px) contrast(0.9)',
  position: 'fixed',
  inset: 0,

  '@media': {
    '(prefers-reduced-motion: no-preference)': {
      animation: `${overlayShow} 150ms cubic-bezier(0.16, 1, 0.3, 1) forwards`,
    },
  },
})

export const content = style({
  background: 'transparent',
  color: vars.colors.foreground,
  borderRadius: vars.radii['2xLarge'],
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '90vw',
  maxWidth: '600px',
  maxHeight: '90vh',
  padding: vars.space[6],

  '@media': {
    '(prefers-reduced-motion: no-preference)': {
      animation: `${contentShow} 150ms cubic-bezier(0.16, 1, 0.3, 1) forwards, ${pulse} 10s linear 0ms infinite alternate`,
    },
  },
})

export const title = style({
  margin: 0,
  fontFamily: vars.fonts.sans,
  fontWeight: vars.fontWeights.bold,
  color: vars.colors.accent,
  fontSize: vars.fontSizes.large,
})

export const description = style({
  margin: '10px 0 20px',
  color: vars.colors.foreground,
  fontSize: vars.fontSizes.base,
  lineHeight: vars.lineHeights.normal,
  fontFamily: vars.fonts.sans,
})
