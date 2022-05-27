import React from 'react'
import { Flex, Text } from '../../../styles/elements'

export default function Crowdsale({ crowdsale }) {
  console.log('crowdsale', crowdsale)
  return (
    <Flex>
        <pre>
            {JSON.stringify(crowdsale)}
        </pre>
    </Flex>
  )
}
