import Link from 'next/link'
import { useRouter } from 'next/router'
import { Flex, Text } from '../../../../../styles/elements'

export default function Escape({ killing }) {
  const router = useRouter()
  const { chainId, dao } = router.query

  return (
    <Flex gap="sm">
      This will kill proposal{' '}
      <Link href={`/daos/${chainId}/${dao}/proposals/${killing}`}>
        <Text
          css={{
            color: '$violet8',

            '&:hover': {
              color: '$violet9',
            },
          }}
        >
          #{killing}
        </Text>
      </Link>
    </Flex>
  )
}
