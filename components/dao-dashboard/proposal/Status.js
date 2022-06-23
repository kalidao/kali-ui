import React from 'react'
import { Flex, Text } from '../../../styles/elements'
import { CheckCircledIcon, CrossCircledIcon, DrawingPinFilledIcon, LinkBreak2Icon } from '@radix-ui/react-icons'

const validateStatus = (status) => {
  let color, icon, text
  switch (status) {
    case 'unsponsored':
      color = 'red'
      icon = <LinkBreak2Icon />
      text = 'UNSPONSORED'
      return { color, icon, text }
    case 'canProcess':
      color = 'green'
      icon = <DrawingPinFilledIcon />
      text = 'PROCESS NOW'
      return { color, icon, text }
    case 'passed':
      color = 'green'
      icon = <CheckCircledIcon />
      text = 'PASSED'
      return { color, icon, text }
    case 'failed':
      color = 'red'
      icon = <CrossCircledIcon />
      text = 'FAILED'
      return { color, icon, text }
    case 'voting':
      color = 'green'
      icon = <DrawingPinFilledIcon />
      text = 'VOTING'
  }
}

export default function Status({ status }) {
  const { color, icon, text } = validateStatus(status)

  return (
    <Flex
      css={{
        color: `$gray12`,
        background: `$${color}3`,
        padding: '2px 10px',
        borderRadius: '20px',
        border: `1px solid $${color}4`,
        fontWeight: '800',
        fontFamily: 'Regular',
        alignItems: 'center',
        justifyContent: 'flex-start',
        gap: '0.5rem',
      }}
    >
      {icon}
      {text}
    </Flex>
  )
}
