import { useRouter } from 'next/router'
import { useState } from 'react'
import { Text, Stack, Box, Tag, Avatar } from '@kalidao/reality'
import * as styles from './styles.css'
import ALL_CHAINS from '@constants/chains.json'

type Props = {
  dao: any
  chain: number
}

// disable when not active chain
export default function DaoCard({ dao, chain }: Props) {
  const router = useRouter()
  const chainObj = ALL_CHAINS.find((c) => c.chainId == chain)
 

  const gotoDAO = async () => {
    if (!dao || !chain) return

    router.push(`/daos/${chain}/${dao['id']}`)
  }

  return (
    <Box as="button" padding="6" width="96" onClick={gotoDAO} className={styles.card}>
      <Stack align="center" justify={'center'}>
        <Avatar label="DAO Avatar" address={dao?.['id']} placeholder />
        <Text ellipsis>{dao?.['token']?.['name']}</Text>
        <Tag>{chainObj?.name}</Tag>
      </Stack>
    </Box>
  )
}
