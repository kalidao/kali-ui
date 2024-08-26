import React from 'react'
import { Button } from '@components/ui/button'
import { Card } from '@components/ui/card'
import { Badge } from '@components/ui/badge'
import { X } from 'lucide-react'
import InfoCard from './InfoCard'
import Results from './Results'
import Description from './Description'
import Vote from '../vote'
import InfoBar from '../InfoBar'
import Sponsor from '../Sponsor'
import { useAccount } from 'wagmi'
import Cancel from '../Cancel'
import Process from '../Process'
import { useParams, useRouter } from 'next/navigation'
import Visualizer from './visualizer'
import { useQuery } from '@tanstack/react-query'
import { fetcher } from '@utils/fetcher'
import { Address } from 'viem'

type Props = {
  proposal: any
}

export default function ProposalView({ proposal }: Props) {
  const router = useRouter()
  const params = useParams<{ chainId: string; dao: Address; proposalId: string }>()
  const chainId = params ? Number(params.chainId) : 1
  const dao = params?.dao as Address
  const proposalId = params ? Number(params.proposalId) : 0

  const { address } = useAccount()
  const isSchema = proposal?.description.slice(0, 7) == 'prop://' ? true : false

  const url = `https://content.wrappr.wtf/ipfs/${proposal?.description}`
  const { data: details } = useQuery(['proposalDetails', url, proposal], async () =>
    fetcher(
      url
        ? proposal?.description
        : isSchema
        ? `https://content.wrappr.wtf/ipfs/${proposal?.description.slice(7)}`
        : null,
    ),
  )

  const canProcess = () => {
    const timeLeft =
      new Date().getTime() - new Date(proposal?.dao?.votingPeriod * 1000 + proposal?.votingStarts * 1000).getTime()

    if (proposal?.sponsored === true) {
      if (timeLeft > 0) {
        if (proposal?.status === null) {
          return true
        }
      }
    }
    return false
  }

  return (
    <Card className="w-full flex flex-col p-6 space-y-4">
      <div className="flex flex-row gap-1 items-center">
        <p className="text-lg">
          {`#${proposalId} `}
          {details && details?.title}
          {proposal?.['proposalType'] === 'DOCS' && 'Update Docs'}
        </p>
        <Badge>{proposal?.['proposalType']}</Badge>
      </div>
      <InfoBar proposer={proposal?.['proposer']} />
      <div className="relative flex flex-col md:flex-row items-start justify-center">
        <div className="w-full flex flex-col gap-5 justify-between">
          {proposal && proposal?.['proposalType'] !== 'DOCS' && (
            <Description
              type={proposal?.['proposalType']}
              description={details ? details?.description : proposal?.description}
              isSchema={details ? true : false}
            />
          )}
          <Visualizer proposal={proposal} />
        </div>
        <div className="flex flex-col gap-2">
          {proposal && (
            <InfoCard
              start={Number(proposal?.['votingStarts'])}
              votingPeriod={Number(proposal?.['dao']?.['votingPeriod'])}
            />
          )}
          {proposal && (
            <Results
              votes={proposal['votes']}
              totalSupply={proposal?.['dao']?.['token']?.['totalSupply']}
              quorum={Number(proposal?.['dao']?.['quorum'])}
            />
          )}
        </div>
      </div>
      <div className="flex flex-row gap-2">
        <Vote proposal={proposal} />
        {proposal?.['sponsored'] == false &&
          (address?.toLowerCase() === proposal?.['proposer'] ? (
            <Cancel proposalId={Number(proposal?.serial)} />
          ) : (
            <Sponsor proposalId={Number(proposal?.serial)} />
          ))}
        {canProcess() && (
          <>
            <Process chainId={Number(chainId)} dao={dao as string} proposalId={proposal?.serial} />
            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                router.push(
                  `/daos/${encodeURIComponent(chainId)}/${encodeURIComponent(
                    dao as string,
                  )}/proposals/${encodeURIComponent(proposalId)}/delete`,
                )
              }
            >
              <X className="w-4 h-4 mr-2" />
              Delete
            </Button>
          </>
        )}
      </div>
    </Card>
  )
}
