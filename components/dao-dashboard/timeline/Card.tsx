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
    <div>
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
        <div className="flex xs:flex-col md:flex-row w-full justify-between items-start md:items-center">
          <div className="flex flex-col md:flex-row items-start md:items-center">
            <p className="text-2xl text-foreground">{`#${proposal?.serial} ${details ? details?.title : ''}`}</p>
            <Badge variant="secondary">{proposer}</Badge>
          </div>
          <Badge>{text}</Badge>
        </div>
        <Description
          type={proposal['proposalType']}
          description={details ? details?.description : proposal?.description}
          isSchema={details ? true : false}
          short
        />
      </Link>
      <div className="flex">
        <Vote proposal={proposal} />
      </div>
    </div>
  )
}
