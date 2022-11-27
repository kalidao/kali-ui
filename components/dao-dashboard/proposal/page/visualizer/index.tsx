import React from 'react'
import Member from './Member'
import Extension from './Extension'
import Escape from './Escape'
import Call from './Call'

import {
  Box,
  Stack,
  Text,
  Divider,
  IconUserGroupSolid,
  IconCode,
  IconHand,
  IconFlag,
  IconUsersSolid,
  IconTokens,
  IconLightningBolt,
  IconExclamationCircleSolid,
  IconDocumentAdd,
} from '@kalidao/reality'
import { useRouter } from 'next/router'
import Internal from './Internal'
import { formatVotingPeriod } from '@utils/votingPeriod'

export default function Visualizer({ proposal }: { proposal: any }) {
  const router = useRouter()
  const { dao, chainId } = router.query

  let heading, icon, component
  switch (proposal?.proposalType) {
    case 'MINT':
      heading = 'Add Member'
      icon = <IconUserGroupSolid />
      component = <Member accounts={proposal?.accounts} amounts={proposal?.amounts} />
      break
    case 'BURN':
      heading = 'Remove Member'
      icon = <IconUserGroupSolid />
      component = <Member accounts={proposal?.accounts} amounts={proposal?.amounts} />
      break
    case 'CALL':
      heading = 'Contract Call'
      icon = <IconCode />
      component = <Call accounts={proposal?.accounts} amounts={proposal?.amounts} payloads={proposal?.payloads} />
      break
    case 'VPERIOD':
      heading = 'Update Voting Period'
      icon = <IconHand />
      component = (
        <Internal
          message={`This proposal will update voting period to ${formatVotingPeriod(Number(proposal?.amounts?.[0]))}`}
          type={proposal?.proposalType}
          dao={dao?.toString()}
          chainId={Number(chainId)}
        />
      )
      break
    case 'GPERIOD':
      heading = 'Update Grace Period'
      icon = <IconHand />
      component = <Internal message="This proposal will update the grace period." />
      break
    case 'QUORUM':
      heading = 'Update Participation Required'
      icon = <IconFlag />
      component = <Internal message={`This proposal will update quorum to ${proposal?.amounts?.[0]}%`} />
      break
    case 'SUPERMAJORITY':
      heading = 'Update Approval Required'
      icon = <IconUsersSolid />
      component = <Internal message={`This proposal will update supermajority to ${proposal?.amounts?.[0]}%`} />
      break
    case 'TYPE':
      heading = 'Update Voting Types'
      icon = <IconFlag />
      component = <Internal message={`This proposal will update the voting type.`} />
      break
    case 'PAUSE':
      heading = 'Update Token Transferability'
      icon = <IconTokens />
      component = (
        <Internal
          message={`This proposal will flip transferability.`}
          type={proposal?.proposalType}
          dao={dao?.toString()}
          chainId={Number(chainId)}
        />
      )
      break
    case 'EXTENSION':
      heading = 'Update Extension'
      icon = <IconLightningBolt />
      component = <Extension accounts={proposal?.accounts} amounts={proposal?.amounts} payloads={proposal?.payloads} />
      break
    case 'ESCAPE':
      heading = 'Escaping'
      icon = <IconExclamationCircleSolid />
      component = <Escape killing={proposal?.amounts?.[0]} />
      break
    case 'DOCS':
      heading = 'Update Docs'
      icon = <IconDocumentAdd />
      component = (
        <Internal
          message={`This proposal will update the docs.`}
          amount={proposal?.description}
          type={proposal?.proposalType}
        />
      )
      break
  }

  return (
    <Box
      boxShadow={'1'}
      boxShadowColor="foregroundSecondary"
      borderRadius={'2xLarge'}
      padding="6"
      maxWidth={{
        xs: 'full',
        md: '96',
      }}
      display={'flex'}
      flexDirection="column"
      gap="6"
    >
      <Stack direction={'horizontal'} align="center">
        <Box color="foreground">{icon}</Box>
        <Text color="foreground" size="large">
          {heading}
        </Text>
      </Stack>
      <Divider />
      {component}
    </Box>
  )
}
