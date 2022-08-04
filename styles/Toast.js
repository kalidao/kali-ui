import * as React from 'react'
import { styled, keyframes } from './stitches.config'
import { Button } from './elements'
import * as ToastPrimitive from '@radix-ui/react-toast'

const VIEWPORT_PADDING = 25

const hide = keyframes({
  '0%': { opacity: 1 },
  '100%': { opacity: 0 },
})

const slideIn = keyframes({
  from: { transform: `translateX(calc(100% + ${VIEWPORT_PADDING}px))` },
  to: { transform: 'translateX(0)' },
})

const swipeOut = keyframes({
  from: { transform: 'translateX(var(--radix-toast-swipe-end-x))' },
  to: { transform: `translateX(calc(100% + ${VIEWPORT_PADDING}px))` },
})

const StyledViewport = styled(ToastPrimitive.Viewport, {
  position: 'fixed',
  bottom: 0,
  right: 0,
  display: 'flex',
  flexDirection: 'column',
  padding: VIEWPORT_PADDING,
  gap: 10,
  width: 390,
  maxWidth: '100vw',
  margin: 0,
  listStyle: 'none',
  zIndex: 2147483647,
  outline: 'none',
})

const StyledToast = styled(ToastPrimitive.Root, {
  backgroundColor: '$gray3',
  border: '1px solid $gray4',
  borderRadius: 6,
  boxShadow: 'hsl(206 22% 7% / 35%) 0px 10px 38px -10px, hsl(206 22% 7% / 20%) 0px 10px 20px -15px',
  padding: 15,
  display: 'grid',
  gridTemplateAreas: '"title action" "description action"',
  gridTemplateColumns: 'auto max-content',
  columnGap: 15,
  alignItems: 'center',
  fontFamily: 'Regular',

  '@media (prefers-reduced-motion: no-preference)': {
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

const StyledTitle = styled(ToastPrimitive.Title, {
  gridArea: 'title',
  marginBottom: 5,
  fontWeight: 500,
  color: '$gray12',
  fontSize: 15,
  fontFamily: 'Regular',
})

const StyledDescription = styled(ToastPrimitive.Description, {
  gridArea: 'description',
  margin: 0,
  color: '$gray12',
  fontSize: 13,
  lineHeight: 1.3,
  fontFamily: 'Regular',
})

const StyledAction = styled(ToastPrimitive.Action, {
  gridArea: 'action',
  color: '$gray12',
  fontFamily: 'Regular',
})

// Exports
export const ToastProvider = ToastPrimitive.Provider
export const ToastViewport = StyledViewport
export const Toast = StyledToast
export const ToastTitle = StyledTitle
export const ToastDescription = StyledDescription
export const ToastAction = StyledAction
export const ToastClose = ToastPrimitive.Close

const ToastDemo = ({ open, setOpen, title, description }) => {
  const eventDateRef = React.useRef(new Date())
  const timerRef = React.useRef(0)

  React.useEffect(() => {
    return () => clearTimeout(timerRef.current)
  }, [])

  return (
    <ToastProvider swipeDirection="right">
      <Toast open={open} onOpenChange={setOpen}>
        <ToastTitle>{title}</ToastTitle>
        <ToastDescription asChild>{description}</ToastDescription>
        <ToastAction asChild altText="Goto schedule to undo">
          <Button variant="cta">Close</Button>
        </ToastAction>
      </Toast>
      <ToastViewport />
    </ToastProvider>
  )
}

export default ToastDemo
