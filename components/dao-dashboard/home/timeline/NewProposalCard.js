import { Box, Text } from '@kalidao/reality'
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
      <Box display="flex" alignItems="center" justifyContent="flex-start" padding="6" gap="2" borderWidth="0.375">
        <Box 
        >
          <FaPen />
        </Box>
        <Text
          css={{
            fontSize: '16px',
          }}
        >
          Create New Proposal
        </Text>
      </Box>
    </Link>
  )
}
