import { Flex, Box, Text } from '../../../../styles/elements'
import { FaPen } from 'react-icons/fa'
import Link from 'next/link'
import { useRouter } from 'next/router'

export default function NewProposalTrigger() {
  const router = useRouter()
  const { chainId, dao } = router.query

  return (
    <Link
      href={{
        pathname: '/daos/[chainId]/[dao]/propose',
        query: {
          dao: dao,
          chainId: chainId,
        },
      }}
      passHref
    >
      <Flex
        dir="row"
        gap="sm"
        css={{
          flexDirection: 'row',
          padding: '1rem 0.5rem 1rem 0.5rem',
          justifyContent: 'flex-start',
          alignItems: 'center',
          gap: '5px',
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
          height="100%"
          css={{
            minWidth: '10%',
            paddingRight: '1rem',
          }}
        >
          <FaPen />
        </Flex>

        <Text
          css={{
            fontSize: '16px',
          }}
        >
          Create New Proposal
        </Text>
      </Flex>
    </Link>
  )
}
