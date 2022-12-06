import React from 'react'
import { Card, Text, Stack, Stat, IconCheck, IconClose } from '@kalidao/reality'
import { Progress } from '@design/Progress'
import { useQuery } from 'wagmi'
import { useRouter } from 'next/router'
import { BigNumber } from 'ethers'
import { calculateParticipation, calculateApproval } from '@utils/proposals'

export default function Results({ votes }: { votes: any }) {
  const router = useRouter()
  const { dao, chainId, proposalId } = router.query

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

  const { data: quorum } = useQuery(
    ['quorum', dao, chainId, votes],
    async () => await calculateParticipation(dao as string, Number(chainId), weight),
  )
  const { data: approval } = useQuery(
    ['approval', dao, chainId, votes],
    async () =>
      await calculateApproval(dao as string, Number(chainId), Number(proposalId)),
  )

  console.log('approval', quorum?.toString(), approval?.toString(), proposalId)
  return (
    <Card padding="6">
      <Stack>
        <Stack direction="horizontal" align="stretch" justify={'center'}>
          <Stat label="Yes" value={yesVotes.length} meta={<IconCheck color="green" />} />
          <Stat label="No" value={votes.length - yesVotes.length} meta={<IconClose color="red" />} />
        </Stack>
        <Stat label="Participation" value={<Progress value={quorum ? quorum : 0} />} size="medium" />
        <Stat label="Approval" value={<Progress value={quorum ? quorum : 0} />} size="medium" />

        <Text color="red">This is failing.</Text>
      </Stack>
    </Card>
  )
}
