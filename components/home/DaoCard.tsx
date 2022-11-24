import { useRouter } from 'next/router'
import { getDaoChain } from '../../utils'
import { useNetwork } from 'wagmi'
import { useState } from 'react'
import { Text, Stack, Box, Tag, Avatar } from '@kalidao/reality'
import * as styles from './styles.css'
import getExplorerLink from '@utils/getExplorerLink'
import ALL_CHAINS from '@constants/chains.json'

type Props = {
  dao: any
  chain: number
}

// disable when not active chain
export default function DaoCard({ dao, chain }: Props) {
  const router = useRouter()
  const chainObj = ALL_CHAINS.find((c) => c.chainId == chain)
  const [loading, setLoading] = useState(false)

  const gotoDAO = async () => {
    setLoading(true)
    if (!dao || !chain) return

    if (chain != null) {
      router.push(`/daos/${chain}/${dao['id']}`)
    } else {
      const chainId = await getDaoChain(dao['id'])
      if (chainId) {
        router.push(`/daos/${chainId}/${dao['id']}`)
      }
    }
    setLoading(false)
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
