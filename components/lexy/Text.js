import React from 'react'
import { Text as TextBox, Flex } from '../../styles/elements'
import { Avatar, AvatarImage, AvatarFallback } from '../../styles/Avatar'
import { getRandomEmoji } from '../../utils'
import { AddressZero } from '@ethersproject/constants'

export default function Text({ text }) {
  return (
    <Flex
      gap="sm"
      dir="col"
      css={{
        fontFamily: 'Regular',
        lineHeight: 1,
        color: '$gray12',
        background: `${text?.name == 'Lexy' ? '$violet5' : '$gray5'}`,
        padding: '10px',
        borderRadius: '20px',
      }}
    >
      <Avatar>
        <AvatarImage
          src={text?.name == 'Lexy' ? '/img/lexy.jpeg' : '/img/preview.png'}
          alt={`${text?.name == 'Lexy' ? 'Lexy' : 'Human'} icon`}
        />
        <AvatarFallback>{getRandomEmoji(AddressZero)}</AvatarFallback>
      </Avatar>
      {text &&
        text?.text.split('/n').map((line, index) => (
          <TextBox as="p" key={index}>
            {line}
          </TextBox>
        ))}
    </Flex>
  )
}
