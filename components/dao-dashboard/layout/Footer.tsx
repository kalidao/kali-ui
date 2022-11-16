import { Box, Stack, Text } from '@kalidao/reality'
import Link from '@design/Link/'

const Footer = () => {
  return (
    <Box padding="6" as="footer" position="relative" zIndex="10">
      <Stack direction={'horizontal'} align="center" justify={'space-between'}>
        <Text color={'foregroundSecondary'}>Built by KaliCo.</Text>
        <Stack direction={'horizontal'}>
          <Link href="/privacy">Privacy Policy</Link>
          <Text color="foregroundSecondary">|</Text>
          <Link href="/tos">Terms of Service</Link>
        </Stack>
      </Stack>
    </Box>
  )
}

export default Footer
