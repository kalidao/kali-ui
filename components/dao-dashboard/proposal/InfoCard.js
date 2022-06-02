import { useRouter } from 'next/router'
import React from 'react'
import { getVotingPeriod } from '../../../utils/fetchDaoInfo'
import { Flex, Text } from '../../../styles/elements'
import Info from '../../../styles/Info'

export default function InfoCard({ start, votingPeriod }) {

  const startDate = new Date(start * 1000).toLocaleString()
  const end = (start*1000) + (votingPeriod*1000)
  const endDate = new Date(end).toLocaleString()

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
