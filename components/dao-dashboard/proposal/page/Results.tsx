import React from 'react'
import { Card, CardContent } from '@components/ui/card'
import { Progress } from '@components/ui/progress'
import { CheckCircle, XCircle } from 'lucide-react'
import { BigNumber } from 'ethers'
import { ethers } from 'ethers'

export default function Results({ votes, totalSupply, quorum }: { votes: any; totalSupply: string; quorum: number }) {
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
  const quorumReached = yesVotesWeight.add(noVotesWeight).mul(100).div(totalWeight)
  const quorumRequired = BigNumber.from(quorum)
  const quorumMet = quorumReached.gte(quorumRequired) ? true : false
  const quorumProgress = quorumMet ? 100 : quorumReached.mul(100).div(quorumRequired)
  const quorumVotes = ethers.utils.formatEther(totalWeight.mul(quorumRequired).div(100))
  console.log(
    'weight',
    yesVotesWeight.toString(),
    noVotesWeight.toString(),
    totalWeight.toString(),
    quorum,
    quorumReached.toString(),
    quorumRequired.toString(),
    quorumReached.mul(100).div(quorumRequired).toString(),
    quorumMet,
  )

  return (
    <Card className="p-6">
      <CardContent>
        <div className="flex flex-col space-y-4">
          <div className="flex justify-center items-stretch space-x-4">
            <div className="flex flex-col items-center">
              <span className="text-sm font-medium">Yes</span>
              <span className="text-2xl font-bold">{Number(ethers.utils.formatEther(yesVotesWeight)).toFixed(2)}</span>
              <CheckCircle className="text-green-500 mt-1" />
            </div>
            <div className="flex flex-col items-center">
              <span className="text-sm font-medium">No</span>
              <span className="text-2xl font-bold">{Number(ethers.utils.formatEther(noVotesWeight)).toFixed(2)}</span>
              <XCircle className="text-red-500 mt-1" />
            </div>
          </div>
          <div>
            <span className="text-sm font-medium">Participation</span>
            {!quorumMet && <span className="text-xs text-gray-500">Needs {quorumVotes} more votes</span>}
            <Progress value={Number(quorumProgress.toString())} className="mt-2" />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
