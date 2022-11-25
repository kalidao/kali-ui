import Link from 'next/link'
import { useRouter } from 'next/router'
import { Stack, Text } from '@kalidao/reality'

export default function Escape({ killing }: { killing: string }) {
  const router = useRouter()
  const { chainId, dao } = router.query

  return (
    <Stack>
      <Text>
        This will kill proposal{' '}
        <Link href={`/daos/${chainId}/${dao}/proposals/${killing}`} passHref>
          #{killing}
        </Link>
      </Text>
    </Stack>
  )
}
