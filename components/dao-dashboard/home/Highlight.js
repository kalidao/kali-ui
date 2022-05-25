import React from 'react'
import { useRouter } from 'next/router';
import { Text } from '../../../styles/elements';
import { Box } from './Profile';
import Link from 'next/link';
export default function Highlight() {
  const router = useRouter();
  const daoAddress = router.query.dao
  return (
    <Box >
      <Link 
            href={{
              pathname: '/daos/[dao]/crowdsale',
              query: { dao: daoAddress}
            }}>
        <Text size="lg">
          
              Crowdsale
            
        </Text>
        </Link>
    </Box>
  )
}
