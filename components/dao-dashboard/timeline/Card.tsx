import React, { useMemo } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEnsName } from 'wagmi'
import { truncateAddress } from '@utils/truncateAddress'
import Vote from '../proposal/vote'
import { useFetch } from '../../hooks/useFetch'
import { Heading, Box, Text, Tag, Card } from '@kalidao/reality'
import { linkStyle, proposalCard } from './ProposalCard.css'
import { isURL } from '@utils/proposals'
import Description from '../proposal/page/Description'

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
  } = useFetch(
    url ? proposal?.description : isSchema ? `https://content.wrappr.wtf/ipfs/${proposal?.description.slice(7)}` : null,
  )
  console.log('details', details)
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
    <Box className={proposalCard}>
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
        <a className={linkStyle}>
          <Box display="flex" alignItems="center" justifyContent="space-between">
            <Box display="flex" alignItems="center" gap="1">
              <Heading responsive>{`#${proposal?.serial} ${details ? details?.title : ''}`}</Heading>
              <Tag tone="secondary" size="small">
                {proposer}
              </Tag>
            </Box>
            <Tag label={proposal['proposalType']} tone={color!} size="medium">
              {text}
            </Tag>
          </Box>
          <Description
            description={details ? details?.description : proposal?.description}
            isSchema={details ? true : false}
            short
          />
        </a>
      </Link>
      <Box display="flex">
        <Vote proposal={proposal} />
      </Box>
    </Box>
  )
}
