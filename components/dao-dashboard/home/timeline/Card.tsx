import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEnsName } from 'wagmi'
import { truncateAddress } from '../../../../utils'
import Vote from '../../proposal/vote'
import { useFetch } from '../../../hooks/useFetch'
import { Heading, Box, Text, Tag, Card } from '@kalidao/reality'

type Status = {
  text: string
  color: "accent" | "green" | "red" | "blue" | "orange" | "pink" | "purple" | "violet" | "secondary" | undefined
  icon: React.ReactNode
}

// TODO
type PropCardProp = {
  proposal: any
}
export default function ProposalCard({ proposal }: PropCardProp) {
  const router = useRouter()
  const ensName = useEnsName({
    address: proposal['proposer'],
    chainId: 1,
  })
  const { data: details, isLoading, error } = useFetch(`https://${proposal?.description.slice(7)}.ipfs.dweb.link/`)
  const isSchema = proposal?.description.slice(0, 7) == 'prop://' ? true : false

  const proposer = ensName.data != null ? ensName.data : truncateAddress(proposal['proposer'])

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

  const currentStatus = (): Status => {
    // unsponsored 
    if (!proposal?.sponsored) {
      return {
        color: 'secondary',
        icon: <></>,
        text: 'Unsponsored'
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
            text: 'Process'
          }
        } else {
          return {
            color: proposal?.status ? 'green' : 'red',
            icon: <></>,
            text: proposal?.status ? 'Passed' : 'Failed'
          }
        }
      } else {
        return {
          color: 'accent',
          icon: <></>,
          text: 'Voting'
        }
      }
    }
    // execute 

    return {
      color: undefined,
      icon: <></>,
      text: '...'
    }
  }

  const { color, icon, text } = currentStatus()

  return (
    <Box display="flex" flexDirection="column" padding="6" backgroundColor="background" borderWidth="0.375" gap="3" >
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Box display="flex" alignItems="center" gap="1">
          <Heading>
            {`#${proposal?.serial} ${details ? details?.title : ''}`}
          </Heading>
          <Tag tone="secondary">{proposer}</Tag>
        </Box>
        <Tag label={proposal["proposalType"]} tone={color!} >{text}</Tag>
      </Box>
      <Text as="p" ellipsis >
        {isSchema
          ? 'Expand to read more.'
          : (proposal['description'].length == 0 ? 'No description.' : proposal['description'])
        }
      </Text>
      <Box display="flex">
        <Vote proposal={proposal} />
      </Box>
    </Box >
  )
}
