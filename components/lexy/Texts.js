import React from 'react'
import { Flex } from '../../styles/elements'
import Text from './Text'

export default function Texts({ texts }) {
  console.log('texts', texts)
  return (
    <Flex
      dir="col"
      css={{
        gap: '10px',
      }}
    >
      {texts.map((text, index) => (
        <Text key={index} text={text} />
      ))}
    </Flex>
  )
}
