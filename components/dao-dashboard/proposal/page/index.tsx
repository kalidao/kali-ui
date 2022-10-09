import React from 'react'
import { Box, Button, Heading, Stack, Text, Tag, IconClose } from '@kalidao/reality'
import InfoCard from './InfoCard'
import Results from './Results'
import Votes from './Votes'
import Description from './Description'
import Vote from '../vote'
import InfoBar from '../InfoBar'
import Sponsor from '../Sponsor'
import { useAccount } from 'wagmi'
import Cancel from '../Cancel'
import Process from '../Process'
import { useRouter } from 'next/router'
import Visualizer from './visualizer'
import { useFetch } from '../../../hooks/useFetch'
import { cleanProposalDescription, isURL } from '@utils/proposals'
type Props = {
  proposal: any
}

export default function ProposalView({ proposal }: Props) {
  const router = useRouter()
  const { chainId, dao, proposalId } = router.query
  const { address } = useAccount()
  const { type, description } = cleanProposalDescription(proposal?.description) 
  const isSchema = proposal?.description.slice(0, 7) == 'prop://' ? true : false
  const url = isURL(proposal?.description)
  const {
    data: details,
    isLoading,
    error,
  } = useFetch(
    url ? proposal?.description : isSchema ? `https://content.wrappr.wtf/ipfs/${proposal?.description.slice(7)}` : null,
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

  console.log('details',  url ? proposal?.description : isSchema ? `https://content.wrappr.wtf/ipfs/${proposal?.description.slice(7)}` : null, details?.body)

  return (
    <Box
      display="flex"
      flexDirection="column"
      gap="2"
      maxWidth={{
        xs: 'screenSm',
        xl: '320',
      }}
    >
      <Stack direction="horizontal" align="center">
        <Heading responsive>
          {`#${proposalId} `}
          {details && details?.title}
        </Heading>
        <Tag>{proposal['proposalType']}</Tag>
      </Stack>
      <InfoBar proposal={proposal} />
      <Stack
        direction={{
          xs: 'vertical',
          md: 'horizontal',
        }}
      >
        <Stack>
          {proposal && (
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
            <Cancel proposal={proposal} />
          ) : (
            <Sponsor proposal={proposal} />
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
    </Box>
  )
}
