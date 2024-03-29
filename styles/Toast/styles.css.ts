import { vars } from '@kalidao/reality'
import { style, keyframes } from '@vanilla-extract/css'

const hide = keyframes({
  '0%': { opacity: 1 },
  '100%': { opacity: 0 },
})

const slideIn = keyframes({
  from: { transform: `translateX(calc(100% + ${25}px))` },
  to: { transform: 'translateX(0)' },
})

const swipeOut = keyframes({
  from: { transform: 'translateX(var(--radix-toast-swipe-end-x))' },
  to: { transform: `translateX(calc(100% + ${25}px))` },
})

export const root = style({
  backgroundColor: vars.colors.backgroundTertiary,
  borderRadius: 6,
  boxShadow: `${vars.shadows[1]} ${vars.colors.foregroundSecondary}`,
  padding: vars.space['3'],
  display: 'grid',
  gridTemplateAreas: '"title action" "description action"',
  gridTemplateColumns: 'auto max-content',
  columnGap: 15,
  alignItems: 'center',

  selectors: {
    '&[data-state="open"]': {
      animation: `${slideIn} 150ms cubic-bezier(0.16, 1, 0.3, 1)`,
    },
    '&[data-state="closed"]': {
      animation: `${hide} 100ms ease-in`,
    },
    '&[data-swipe="move"]': {
      transform: 'translateX(var(--radix-toast-swipe-move-x))',
    },
    '&[data-swipe="cancel"]': {
      transform: 'translateX(0)',
      transition: 'transform 200ms ease-out',
    },
    '&[data-swipe="end"]': {
      animation: `${swipeOut} 100ms ease-out`,
    },
  },
})

export const title = style({
  gridArea: 'title',
  marginBottom: 5,
  fontWeight: 800,
  color: vars.colors.foreground,
  fontSize: 15,
})

export const description = style({
  gridArea: 'description',
  margin: 0,
  color: vars.colors.foreground,
  fontSize: vars.fontSizes.large,
  lineHeight: vars.lineHeights.normal,
})

export const action = style({
  gridArea: 'action',
  justifySelf: 'end',
})

export const viewport = style({
  position: 'fixed',
  bottom: 0,
  right: 0,
  display: 'flex',
  flexDirection: 'column',
  padding: 25,
  gap: 10,
  width: 390,
  maxWidth: '100vw',
  margin: 0,
  listStyle: 'none',
  zIndex: 2147483647,
  outline: 'none',
})
