import { useRouter } from 'next/router'
import React from 'react'
import { getVotingPeriod } from '../../../utils/fetchDaoInfo'
import { Box, Text } from '../../../styles/elements'
export default function InfoCard({ start, votingPeriod }) {

  const startDate = new Date(start * 1000).toLocaleDateString()
  const end = (start*1000) + (votingPeriod*1000)
  const endDate = new Date(end).toLocaleDateString()

  console.log('date', start, votingPeriod, end)
  return (
    <Box>
      <Text variant="heading">Information</Text>
        {/* {votingPeriod} */}
        <Text>Start Date: {startDate}</Text>
        <Text>End Date: {endDate}</Text>
    </Box>
  )
}
