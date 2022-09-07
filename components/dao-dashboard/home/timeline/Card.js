import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEnsName } from 'wagmi'
import { truncateAddress } from './../../../../utils/'
import { Flex, Box, Text } from '../../../../styles/elements'
import Tag from '../../../../styles/proposal/Tag'
import Vote from '../../proposal/vote'
import Status from '../../proposal/Status'
import { useFetch } from '../../../hooks/useFetch'

export default function ProposalCard({ proposal }) {
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

  return (
    <Flex
      // dir="row"
      gap="sm"
      css={{
        width: '95%',
        padding: '1rem 0.5rem 1rem 0.5rem',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        border: '2px solid $gray6',
        borderRadius: '20px',
        // borderBottom: '1px solid hsla(0, 0%, 90%, 0.1)',
        // borderTop: '1px solid hsla(0, 0%, 90%, 0.1)',
        fontFamily: 'Regular',
        '&:hover': {
          background: '$violet2',
        },
      }}
    >
      <Flex
        dir="col"
        gap="md"
        width="100%"
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
          gap="md"
          css={{
            width: '100%',
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
          }}
        >
          <Flex
            dir="col"
            gap="md"
            css={{
              // minWidth: '50rem',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
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
                {`#${proposal?.serial} ${details ? details?.title : ''}`}
              </Text>
            </Flex>
            <Flex gap="sm">
              <Box variant="id">{proposer}</Box>
              <Tag type={proposal['proposalType']} />
              {proposal?.sponsored === false && <Status status={'unsponsored'} />}
              {proposal?.status === true && <Status status="passed" />}
              {proposal?.status === false && <Status status="failed" />}
              {canProcess() === true && <Status status="canProcess" />}
            </Flex>
          </Flex>
          <Box>
            {isSchema
              ? 'Expand to read more.'
              : proposal['description'].length > 100
              ? proposal['description'].slice(0, 100) + '...'
              : proposal['description']}
          </Box>
        </Flex>
      </Link>
    </Flex>
  )
}
