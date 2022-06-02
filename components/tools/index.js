import React from 'react'
import { Flex, Text } from '../../styles/elements'
import DraftDoc from './DraftDoc'
import ToolBox from './ToolBox';

export default function Tools() {
  return (
    <Flex css={{ position: 'absolute', top: '10%', left: '9%' }}>
      <Text as="h2" variant="heading">
        Building...
      </Text>
      {/* <DraftDoc /> */}
      {/* <ToolBox /> */}
    </Flex>
  )
}
