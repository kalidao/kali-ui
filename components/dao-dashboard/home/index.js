import React from 'react'
import { Box } from '@kalidao/reality'
import Timeline from './timeline/'
import Sidebar from './sidebar'


export default function Dashboard({ proposals }) {
  return (
    <Box display="flex" flexDirection="row" gap="10" paddingY={"8"} maxWidth={{
      sm: 'screenSm',
      md: 'screenMd',
      lg: 'screenLg'
    }}>
      <Timeline proposals={proposals} />
      <Sidebar />
    </Box>
  )
}
