import { Stack, Text, IconExclamation } from '@kalidao/reality'

export default function Warning({ warning }: { warning?: string }) {
  if (!warning) return null

  return (
    <Stack direction={'horizontal'} align="center">
      <IconExclamation color="yellow" />
      <Text>{warning}</Text>
    </Stack>
  )
}
