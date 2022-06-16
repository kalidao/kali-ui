import React from 'react'
import * as Tooltip from '@radix-ui/react-tooltip'
import { styled } from '../../styles/stitches.config'
import { slideDownAndFade, slideLeftAndFade, slideUpAndFade, slideRightAndFade } from '../../styles/animation'
import { QuestionMarkIcon } from '@radix-ui/react-icons'

const Content = styled(Tooltip.Content, {
  borderRadius: 4,
  padding: '10px 15px',
  fontSize: 15,
  lineHeight: 1,
  color: '$gray12',
  backgroundColor: '$gray1',
  boxShadow: 'hsl(206 22% 7% / 35%) 0px 10px 38px -10px, hsl(206 22% 7% / 20%) 0px 10px 20px -15px',
  '@media (prefers-reduced-motion: no-preference)': {
    animationDuration: '400ms',
    animationTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
    animationFillMode: 'forwards',
    willChange: 'transform, opacity',
    '&[data-state="delayed-open"]': {
      '&[data-side="top"]': { animationName: slideDownAndFade },
      '&[data-side="right"]': { animationName: slideLeftAndFade },
      '&[data-side="bottom"]': { animationName: slideUpAndFade },
      '&[data-side="left"]': { animationName: slideRightAndFade },
    },
  },
})

const IconButton = styled('button', {
  all: 'unset',
  fontFamily: 'inherit',
  borderRadius: '100%',
  height: 20,
  width: 20,
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: '$background',
  backgroundColor: 'none',
  boxShadow: `0 2px 10px black`,
  '&:hover': { boxShadow: `0 2px 10px white` },
  '&:focus': { boxShadow: `0 0 0 2px black` },
})

const Arrow = styled(Tooltip.Arrow, {
  fill: '$gray1',
})

// Add label
export default function Tip({ label }) {
  return (
    <Tooltip.Root>
      <Tooltip.Trigger asChild>
        <QuestionMarkIcon color="#ffa00a" />
      </Tooltip.Trigger>
      <Content sideOffset={5}>
        {label}
        <Arrow />
      </Content>
    </Tooltip.Root>
  )
}

export function TriggerTip({ label, children }) {
  return (
    <Tooltip.Root>
      <Tooltip.Trigger asChild>{children}</Tooltip.Trigger>
      <Content sideOffset={5}>
        {label}
        <Arrow />
      </Content>
    </Tooltip.Root>
  )
}
