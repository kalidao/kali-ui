import React from 'react'
import { Box, Card, Stack, IconClose, IconCheck } from '@kalidao/reality'
import { ethers } from 'ethers'
import { User } from '@components/tools/User'

type Props = {
  votes: any
}

export default function VotesView({ votes }: Props) {
  return (
    <Stack>
      {votes?.map((vote: any) => {
        return (
          <Vote
            key={vote?.voter}
            address={vote?.voter}
            weight={ethers.utils.formatEther(vote?.weight)}
            vote={vote?.vote}
          />
        )
      })}
    </Stack>
  )
}

type VoteProps = {
  address: string
  weight: string
  vote: boolean
}

const Vote = ({ address, weight, vote }: VoteProps) => {
  return (
    <Card padding="3">
      <Stack direction={'horizontal'} align="center" justify={'space-between'}>
        <Box width="20">
          <User address={address} />
        </Box>
        <Box width="10" display="flex" alignItems={'center'} justifyContent="center">
          {Number(weight).toFixed(2)}
        </Box>
        <Box width="10" color={vote === true ? 'green' : 'red'}>
          {vote == true ? <IconCheck /> : <IconClose />}
        </Box>
      </Stack>
    </Card>
  )
}
