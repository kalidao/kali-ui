import { Card, Stack, Text } from '@kalidao/reality'
import Link from '@design/Link'
import { convertIpfsHash } from '@utils/convertIpfsHash'

export default function Docs({ docs }: { docs: string }) {
  return (
    <Card padding="6">
      <Text>
        This proposal will update docs to <Link href={convertIpfsHash(docs)}>link</Link>.
      </Text>
    </Card>
  )
}
