import React from 'react'
import { Flex, Box } from '../../styles/elements'

export default function Text({ text }) {
  return (
    <Box
      css={{
        fontFamily: 'Regular',
        lineHeight: 1,
        color: '$gray12',
        background: `${text?.name == 'Lexy' ? '$violet5' : '$gray5'}`,
        padding: '10px',
        borderRadius: '20px',
      }}
    >
      {text?.text}
    </Box>
  )
}
