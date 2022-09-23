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
          width: '90%',
          height: '3rem',
          alignItems: 'center',
          // paddingLeft: '1rem',
          justifyContent: 'flex-start',
          fontFamily: 'Regular',
          fontWeight: '800',
          border: '2px solid $gray4',
          borderRadius: '10px',
          background: 'White',
          color: 'Black',
          '&:hover': {
            background: '$gray10',
          },
          '&:active': {
            transform: 'translate(1px, 1px)',
          },
        }}
      >
        <Flex
          dir="col"
          gap="md"
          height="100%"
          css={{
            minWidth: '10%',
            paddingLeft: '1rem',
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
