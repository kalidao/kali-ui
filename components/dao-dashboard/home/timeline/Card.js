import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEnsName } from 'wagmi'
import { truncateAddress } from './../../../../utils/'
import { Flex, Box, Text } from '../../../../styles/elements'
import Tag from '../../../../styles/proposal/Tag'
import Vote from '../../proposal/vote'
import Status from '../../proposal/Status'

export default function ProposalCard({ proposal }) {
  const router = useRouter()
  const ensName = useEnsName({
    address: proposal['proposer'],
    chainId: 1,
  })

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

  return (
    <Flex
      dir="row"
      gap="sm"
      css={{
        padding: '1rem 0.5rem 1rem 0.5rem',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        borderBottom: '1px solid hsla(0, 0%, 90%, 0.1)',
        borderTop: '1px solid hsla(0, 0%, 90%, 0.1)',
        fontFamily: 'Regular',
        '&:hover': {
          background: '$violet2',
        },
      }}
    >
      <Flex
        dir="col"
        gap="md"
        minWidth="10%"
        height="100%"
        css={{
          paddingRight: '1rem',
        }}
      >
        <Vote proposal={proposal} />
      </Flex>
      <Link
        href={{
          pathname: `/daos/[chainId]/[dao]/proposals/${proposal['serial']}`,
          query: {
            chainId: router.query.chainId,
            dao: router.query.dao,
          },
        }}
        passHref
      >
        <Flex
          dir="col"
          gap="sm"
          css={{
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
          }}
        >
          <Flex
            gap="md"
            css={{
              minWidth: '50rem',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Flex
              color="foreground"
              gap="sm"
              dir="row"
              css={{
                justifyContent: 'flex-start',
                alignItems: 'center',
              }}
            >
              <Text
                css={{
                  fontFamily: 'Regular',
                  color: '$gray12',
                }}
              >
                #{proposal?.serial}
              </Text>
              <Box variant="id">{proposer}</Box>
            </Flex>
            <Flex gap="sm">
              {proposal?.sponsored === false && <Status status={'unsponsored'} />}
              {canProcess() === true && <Status status="canProcess" />}
              {proposal?.status === true && <Status status="passed" />}
              {proposal?.status === false && <Status status="failed" />}
              <Tag type={proposal['proposalType']} />
            </Flex>
          </Flex>
          <Box>
            {proposal['description'].length > 100
              ? proposal['description'].slice(0, 100) + '...'
              : proposal['description']}
          </Box>
        </Flex>
      </Link>
    </Flex>
  )
}
