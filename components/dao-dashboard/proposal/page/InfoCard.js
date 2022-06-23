import React from 'react'
import { Flex, Text } from '../../../../styles/elements'
import Info from '../../../../styles/Info'
import { prettyDate } from '../../../../utils'

export default function InfoCard({ start, votingPeriod }) {
  const startDate = prettyDate(new Date(start * 1000))
  const end = start * 1000 + votingPeriod * 1000
  const endDate = prettyDate(new Date(end))

  console.log('date', start, votingPeriod, end)
  return (
    <Info heading="Details">
      <Flex align="separate">
        <Text>Start Date:</Text>
        {startDate}
      </Flex>
      <Flex align="separate">
        <Text>End Date:</Text>
        {endDate}
      </Flex>
    </Info>
  )
}
