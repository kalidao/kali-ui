import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEnsName } from 'wagmi'
import { truncateAddress } from '@utils/truncateAddress'
import Vote from '../proposal/vote'
import Description from '../proposal/page/Description'
import { useQuery } from '@tanstack/react-query'
import { fetcher } from '@utils/fetcher'
import { Badge } from '@components/ui/badge'

type Status = {
  text: string
  color: 'accent' | 'green' | 'red' | 'blue' | 'orange' | 'pink' | 'purple' | 'violet' | 'secondary' | undefined
  icon: React.ReactNode
}

// TODO
type PropCardProp = {
  proposal: any
}

export default function ProposalCard({ proposal }: PropCardProp) {
  const router = useRouter()
  const { chainId, dao } = router.query
  const ensName = useEnsName({
    address: proposal['proposer'],
    chainId: 1,
  })
  const isSchema = proposal?.description.slice(0, 7) == 'prop://' ? true : false
  // const url = isURL(proposal?.description)

  const url = `https://content.wrappr.wtf/ipfs/${proposal?.description.substring(7)}`
  const {
    data: details,
    isLoading,
    error,
  } = useQuery(['proposalDetails', url, proposal], async () =>
    fetcher(
      url
        ? proposal?.description
        : isSchema
        ? `https://content.wrappr.wtf/ipfs/${proposal?.description.slice(7)}`
        : null,
    ),
  )

  const proposer = ensName.data != null ? ensName.data : truncateAddress(proposal['proposer'])

  const currentStatus = (): Status => {
    // unsponsored
    if (!proposal?.sponsored) {
      return {
        color: 'secondary',
        icon: <></>,
        text: 'Unsponsored',
      }
    }
    // voting
    const timeLeft =
      new Date().getTime() - new Date(proposal?.dao?.votingPeriod * 1000 + proposal?.votingStarts * 1000).getTime()
    if (proposal?.sponsored === true) {
      if (timeLeft > 0) {
        if (proposal?.status === null) {
          return {
            color: 'accent',
            icon: <></>,
            text: 'Process',
          }
        } else {
          return {
            color: proposal?.status ? 'green' : 'red',
            icon: <></>,
            text: proposal?.status ? 'Passed' : 'Failed',
          }
        }
      } else {
        return {
          color: 'accent',
          icon: <></>,
          text: 'Voting',
        }
      }
    }
    // execute

    return {
      color: undefined,
      icon: <></>,
      text: '...',
    }
  }

  const { color, text } = currentStatus()

  return (
    <div className="border-2 border-border rounded-lg mx-1 mb-2 bg-secondary">
      <Link
        href={{
          pathname: '/daos/[chainId]/[dao]/proposals/[proposalId]',
          query: {
            dao: dao as string,
            chainId: chainId as string,
            proposalId: proposal?.serial,
          },
        }}
        passHref
      >
        <div className="flex flex-col w-full rounded-lg hover:bg-blue-50 border-4  hover:border-4 hover:border-blue-500 hover:dark:bg-blue-950 p-1">
          <div className="flex flex-row items-center space-between w-full">
            <p className="text-2xl text-foreground">{`#${proposal?.serial} ${details ? details?.title : ''}`}</p>
            <div>
              <Badge variant="secondary">{proposer}</Badge>
              <Badge>{text}</Badge>
            </div>
          </div>
          <Description
            type={proposal['proposalType']}
            description={details ? details?.description : proposal?.description}
            isSchema={details ? true : false}
            short
          />
        </div>
      </Link>
      <Vote proposal={proposal} />
    </div>
  )
}
