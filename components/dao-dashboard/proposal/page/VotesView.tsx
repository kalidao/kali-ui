import React from 'react'
import { Box, Avatar, Card, Button, Heading, Stack, Text, Tag, IconClose, IconCheck } from '@kalidao/reality'
import { ethers } from 'ethers'
import { truncateAddress } from '@utils/truncateAddress'
import { useEnsAvatar, useEnsName } from 'wagmi'

type Props = {
  votes: any
}

export default function VotesView({ votes }: Props) {
  console.log('votes', votes)
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
  const { data: name } = useEnsName({
    address,
    chainId: 1,
  })
  const { data: avatar } = useEnsAvatar({
    addressOrName: name || address,
    chainId: 1,
  })

  return (
    <Card padding="3">
      <Stack direction={'horizontal'} align="center" justify={'space-between'}>
        <Stack direction={'horizontal'} align="center">
          <Avatar src={avatar ? (avatar as string) : ''} address={address} label={`voter ${address} profile`} />
          <Text>{name ? name : truncateAddress(address)}</Text>
        </Stack>
        <Text>{weight}</Text>
        <Box color={vote === true ? 'green' : 'red'}>{vote == true ? <IconCheck /> : <IconClose />}</Box>
      </Stack>
    </Card>
  )
}
