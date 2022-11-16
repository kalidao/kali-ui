import React from 'react'
import { Box, Spinner } from '@kalidao/reality'
import Extensions from './Extensions'
import Governance from './Governance'
import Meta from './Meta'
import Docs from './Docs'
import Analytics from './Analytics'
import { container, infoGrid } from './styles.css'

export default function InfoComponent({ info }: {
  info: any
}) {
  return (
    <Box className={container}>
      {info === undefined ? (
        <Spinner />
      ) : (
        <Box className={infoGrid}>
          <Meta info={info} />
          <Governance info={info} />
          <Extensions info={info} />
          <Docs info={info} />
          <Analytics info={info} />
        </Box>
      )}
    </Box>
  )
}
