import { Box, Text, Link } from '@chakra-ui/react'
import { truncateAddress, fromDecimals } from '../../utils/formatters'

export default function Sale({ purchaser, purchased, key, symbol }) {
  return (
    <Box
      bg="hsl(0, 92%, 6%, 20%)"
      color="kali.900"
      p="2"
      pl="6"
      mb="4"
      borderRadius="3xl"
      key={key}
      display="flex"
      justifyContent="flex-start"
      alignItems="center"
    >
      <Text>
        <Link href={`https://etherscan.io/address/${purchaser}`} isExternal fontWeight="600">
          {truncateAddress(purchaser)}
        </Link>{' '}
        bought <b>{fromDecimals(purchased, 18)}</b> {symbol}
      </Text>
    </Box>
  )
}
