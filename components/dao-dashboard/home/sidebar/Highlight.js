import React from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { Text } from '../../../../styles/elements'
import { Box } from './Profile'

export default function Highlight() {
  const router = useRouter()
  const daoAddress = router.query.dao
  return null
  // <Box >
  //   <Link
  //         href={{
  //           pathname: '/daos/[dao]/crowdsale',
  //           query: { dao: daoAddress}
  //         }}>
  //     <Text size="lg">
  //           Crowdsale
  //     </Text>
  //     </Link>
  // </Box>
}
