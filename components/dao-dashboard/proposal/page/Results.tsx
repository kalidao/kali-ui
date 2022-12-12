import React from 'react'
import { Card, Text, Stack, Stat, IconCheck, IconClose } from '@kalidao/reality'
import { Progress } from '@design/Progress'
import { BigNumber } from 'ethers'
import { ethers } from 'ethers'

export default function Results({ votes, totalSupply, quorum }: { votes: any, totalSupply: string, quorum: number }) {
  const yesVotes = votes.filter((vote: any) => Boolean(vote['vote']) === true)
  const noVotes = votes.filter((vote: any) => Boolean(vote['vote']) === false)

  let weight = BigNumber.from(0)
  for (let i = 0; i < votes.length; i++) {
    weight = weight.add(BigNumber.from(votes[i].weight))
  }
  let yesVotesWeight = BigNumber.from(0)
  for (let i = 0; i < yesVotes.length; i++) {
    yesVotesWeight = yesVotesWeight.add(BigNumber.from(yesVotes[i].weight))
  }
  let noVotesWeight = BigNumber.from(0)
  for (let i = 0; i < noVotes.length; i++) {
    noVotesWeight = noVotesWeight.add(BigNumber.from(noVotes[i].weight))
  }
  const totalWeight = totalSupply ? BigNumber.from(totalSupply) : BigNumber.from(0)
  const quorumReached = (yesVotesWeight.add(noVotesWeight)).mul(100).div(totalWeight)
  const quorumRequired = BigNumber.from(quorum)
  const quorumMet = quorumReached.gte(quorumRequired) ? true : false
  const quorumProgress = quorumMet ? 100 : quorumReached.mul(100).div(quorumRequired)
  const quorumVotes = ethers.utils.formatEther(totalWeight.mul(quorumRequired).div(100))
  console.log('weight', yesVotesWeight.toString(), noVotesWeight.toString(), totalWeight.toString(), quorum, quorumReached.toString(), quorumRequired.toString(), quorumReached.mul(100).div(quorumRequired).toString(), quorumMet)
 
  return (
    <Card padding="6">
      <Stack>
        <Stack direction="horizontal" align="stretch" justify={'center'}>
          <Stat label="Yes" value={yesVotes.length} meta={<IconCheck color="green" />} />
          <Stat label="No" value={votes.length - yesVotes.length} meta={<IconClose color="red" />} />
        </Stack>
        <Stat label="Participation" meta={quorumMet ? '' : `Needs ${
          quorumVotes
        } more votes`} value={<Progress value={Number(quorumProgress.toString())} />} size="medium" />
        {/*<Stat label="Approval" value={<Progress value={quorum ? quorum : 0} />} size="medium" /> */}
        {/* <Text color="red">This is failing.</Text> */}
      </Stack>
    </Card>
  )
}
