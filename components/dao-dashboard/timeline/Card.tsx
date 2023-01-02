import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEnsName } from 'wagmi'
import { truncateAddress } from '@utils/truncateAddress'
import Vote from '../proposal/vote'
import { Box, Text, Tag, Stack } from '@kalidao/reality'
import { linkStyle, proposalCard } from './ProposalCard.css'
import Description from '../proposal/page/Description'
import { useQuery } from '@tanstack/react-query'
import { fetcher } from '@utils/fetcher'

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
          <Stack
            direction={{
              xs: 'horizontal',
            }}
            align={{ xs: 'flex-start', md: 'center' }}
            justify={'space-between'}
          >
            <Stack direction={{ xs: 'vertical', md: 'horizontal' }} align={{ xs: 'flex-start', md: 'center' }}>
              <Text size="extraLarge" color="foreground">{`#${proposal?.serial} ${
                details ? details?.title : ''
              }`}</Text>
              <Tag tone="secondary" size="small">
                {proposer}
              </Tag>
            </Stack>
            <Tag label={proposal['proposalType']} tone={color!} size="medium">
              {text}
            </Tag>
          </Stack>
          <Description
            type={proposal['proposalType']}
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
