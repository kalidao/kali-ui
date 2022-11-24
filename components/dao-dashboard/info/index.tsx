import React from 'react'
import { Box, Spinner } from '@kalidao/reality'
import Extensions from './Extensions'
import Governance from './Governance'
import Meta from './Meta'
import Docs from './Docs'
import Analytics from './Analytics'
import { container, infoGrid } from './styles.css'
import { useRouter } from 'next/router'

export default function InfoComponent({ info }: { info: any }) {
  const router = useRouter()
  const { chainId } = router.query
  return (
    <Box className={container}>
      {info === undefined ? (
        <Spinner />
      ) : (
        <Box className={infoGrid}>
          <Meta
            symbol={info['token']['symbol']}
            totalSupply={info['token']['totalSupply']}
            address={info['id']}
            chainId={Number(chainId)}
          />
          {/* <Governance info={info} />
          <Extensions info={info} />
          <Docs info={info} />
          <Analytics info={info} /> */}
        </Box>
      )}
    </Box>
  )
}
