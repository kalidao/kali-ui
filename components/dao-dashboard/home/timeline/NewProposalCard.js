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
          // width: '100%',
          height: '3rem',
          alignItems: 'center',
          paddingLeft: '1rem',
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
          // padding: '1rem 0.5rem 1rem 0.5rem',
          // justifyContent: 'flex-start',
          // alignItems: 'center',
          // paddingLeft: '1rem',
          // borderRadius: '10px',
          // borderBottom: '1px solid hsla(0, 0%, 90%, 0.1)',
          // borderTop: '1px solid hsla(0, 0%, 90%, 0.1)',
          // fontFamily: 'Regular',
          // background: 'White',
          // color: 'Black',
          // '&:hover': {},
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
