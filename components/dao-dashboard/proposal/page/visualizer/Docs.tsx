import { Box, Text } from '@kalidao/reality'
import Link from '@design/Link'

export default function Docs({ docs }: { docs: string }) {
  return (
    <Box padding="6" width="auto">
      <Text>
        This proposal will update docs to{' '}
        <a href={docs} target="_blank" rel="noopenner noreferrer">
          link
        </a>
        .
      </Text>
    </Box>
  )
}
