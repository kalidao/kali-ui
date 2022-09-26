import React from 'react'
import { styled, keyframes } from '@stitches/react'
import { violet, mauve, blackA } from '@radix-ui/colors'
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu'
import { CSS } from '@stitches/react/types/css-util'
import { TransformProps } from '@stitches/react/types/styled-component'
import { Box, Button, IconMenu } from '@kalidao/reality'
import { arrow, content, item, separator } from './menu.css'
import Link from 'next/link'

const slideUpAndFade = keyframes({
  '0%': { opacity: 0, transform: 'translateY(2px)' },
  '100%': { opacity: 1, transform: 'translateY(0)' },
})

const slideRightAndFade = keyframes({
  '0%': { opacity: 0, transform: 'translateX(-2px)' },
  '100%': { opacity: 1, transform: 'translateX(0)' },
})

const slideDownAndFade = keyframes({
  '0%': { opacity: 0, transform: 'translateY(-2px)' },
  '100%': { opacity: 1, transform: 'translateY(0)' },
})

const slideLeftAndFade = keyframes({
  '0%': { opacity: 0, transform: 'translateX(2px)' },
  '100%': { opacity: 1, transform: 'translateX(0)' },
})

const contentStyles = {
  minWidth: 220,
  backgroundColor: 'white',
  borderRadius: 6,
  padding: 5,
  boxShadow: '0px 10px 38px -10px rgba(22, 23, 24, 0.35), 0px 10px 20px -15px rgba(22, 23, 24, 0.2)',
  '@media (prefers-reduced-motion: no-preference)': {
    animationDuration: '400ms',
    animationTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
    willChange: 'transform, opacity',
    '&[data-state="open"]': {
      '&[data-side="top"]': { animationName: slideDownAndFade },
      '&[data-side="right"]': { animationName: slideLeftAndFade },
      '&[data-side="bottom"]': { animationName: slideUpAndFade },
      '&[data-side="left"]': { animationName: slideRightAndFade },
    },
  },
}

const StyledContent = styled(DropdownMenuPrimitive.Content, { ...contentStyles })

const StyledArrow = styled(DropdownMenuPrimitive.Arrow, {
  fill: 'white',
})

const StyledSubContent = styled(DropdownMenuPrimitive.SubContent, { ...contentStyles })

function SubContent(
  props: JSX.IntrinsicAttributes &
    Omit<DropdownMenuPrimitive.DropdownMenuSubContentProps & React.RefAttributes<HTMLDivElement>, 'css' | 'as'> &
    TransformProps<{}, {}> & { as?: undefined; css?: CSS<{}, {}, {}, {}> | undefined },
) {
  return (
    <DropdownMenuPrimitive.Portal>
      <StyledSubContent {...props} />
    </DropdownMenuPrimitive.Portal>
  )
}

const StyledLabel = styled(DropdownMenuPrimitive.Label, {
  paddingLeft: 25,
  fontSize: 12,
  lineHeight: '25px',
  color: mauve.mauve11,
})

const StyledSeparator = styled(DropdownMenuPrimitive.Separator, {
  height: 1,
  backgroundColor: violet.violet6,
  margin: 5,
})

const StyledItemIndicator = styled(DropdownMenuPrimitive.ItemIndicator, {
  position: 'absolute',
  left: 0,
  width: 25,
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
})

// Exports
export const DropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup
export const DropdownMenuItemIndicator = StyledItemIndicator
export const DropdownMenuLabel = StyledLabel
export const DropdownMenuSeparator = StyledSeparator
export const DropdownMenuSub = DropdownMenuPrimitive.Sub
export const DropdownMenuSubContent = SubContent

const RightSlot = styled('div', {
  marginLeft: 'auto',
  paddingLeft: 20,
  color: mauve.mauve11,
  '[data-highlighted] > &': { color: 'white' },
  '[data-disabled] &': { color: mauve.mauve8 },
})

export const Menu = () => {
  return (
    <Box>
      <DropdownMenuPrimitive.Root>
        <DropdownMenuPrimitive.Trigger asChild>
          <Button shape="circle" variant="transparent">
            <IconMenu aria-label="Menu" />
          </Button>
        </DropdownMenuPrimitive.Trigger>
        <DropdownMenuPrimitive.Portal>
          <DropdownMenuPrimitive.Content className={content}>
            <DropdownMenuPrimitive.Item className={item}>Getting Started</DropdownMenuPrimitive.Item>
            <DropdownMenuPrimitive.Item className={item}>Services</DropdownMenuPrimitive.Item>
            <DropdownMenuPrimitive.Item className={item}>Tools</DropdownMenuPrimitive.Item>
            <DropdownMenuPrimitive.Separator className={separator} />
            <DropdownMenuLabel>Socials</DropdownMenuLabel>
            <DropdownMenuPrimitive.Item className={item}>Twitter</DropdownMenuPrimitive.Item>
            <DropdownMenuPrimitive.Item className={item}>Discord</DropdownMenuPrimitive.Item>
            <DropdownMenuPrimitive.Item className={item}>GitHub</DropdownMenuPrimitive.Item>
            <DropdownMenuPrimitive.Arrow className={arrow} />
          </DropdownMenuPrimitive.Content>
        </DropdownMenuPrimitive.Portal>
      </DropdownMenuPrimitive.Root>
    </Box>
  )
}
