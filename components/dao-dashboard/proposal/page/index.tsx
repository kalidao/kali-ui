import React from 'react'
import { Box, Button, Heading, Stack, Text, Tag, IconClose } from '@kalidao/reality'
import InfoCard from './InfoCard'
import Results from './Results'
import Description from './Description'
import Vote from '../vote'
import InfoBar from '../InfoBar'
import Sponsor from '../Sponsor'
import { useAccount } from 'wagmi'
import Cancel from '../Cancel'
import Process from '../Process'
import { useRouter } from 'next/router'
import Visualizer from './visualizer'
import { useQuery } from '@tanstack/react-query'
import { fetcher } from '@utils/fetcher'

type Props = {
  proposal: any
}

export default function ProposalView({ proposal }: Props) {
  const router = useRouter()
  const { chainId, dao, proposalId } = router.query
  const { address } = useAccount()
  const isSchema = proposal?.description.slice(0, 7) == 'prop://' ? true : false
  // const url = isURL(proposal?.description)
  const url = `https://content.wrappr.wtf/ipfs/${proposal?.description}`
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
    <Stack>
      <Stack direction="horizontal" align="center">
        <Heading responsive>
          {`#${proposalId} `}
          {details && details?.title}
          {proposal?.['proposalType'] === 'DOCS' && 'Update Docs'}
        </Heading>
        <Tag>{proposal['proposalType']}</Tag>
      </Stack>
      <InfoBar proposalId={Number(proposalId)} proposer={proposal['proposer']} />
      <Stack
        direction={{
          xs: 'vertical',
          md: 'horizontal',
        }}
      >
        <Stack>
          {proposal && proposal?.['proposalType'] !== 'DOCS' && (
            <Description
              description={details ? details?.description : proposal?.description}
              isSchema={details ? true : false}
            />
          )}
          <Visualizer proposal={proposal} />
        </Stack>
        <Stack>
          {proposal && (
            <InfoCard start={Number(proposal['votingStarts'])} votingPeriod={Number(proposal['dao']['votingPeriod'])} />
          )}
          {proposal && <Results votes={proposal['votes']} />}
        </Stack>
      </Stack>
      <Stack direction="horizontal">
        <Vote proposal={proposal} />
        {proposal['sponsored'] == false &&
          (address?.toLowerCase() === proposal['proposer'] ? (
            <Cancel proposalId={Number(proposal?.serial)} />
          ) : (
            <Sponsor proposalId={Number(proposal?.serial)} />
          ))}
        {canProcess() && (
          <>
            <Process chainId={Number(chainId)} dao={dao as string} proposalId={proposal?.serial} />
            <Button
              variant="secondary"
              tone="red"
              prefix={<IconClose />}
              onClick={() =>
                router.push(
                  `/daos/${encodeURIComponent(chainId as string)}/${encodeURIComponent(
                    dao as string,
                  )}/proposals/${encodeURIComponent(proposalId as string)}/delete`,
                )
              }
            >
              Delete
            </Button>
          </>
        )}
      </Stack>
    </Stack>
  )
}
