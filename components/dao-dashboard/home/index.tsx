import React from 'react'
import { Box } from '@kalidao/reality'
import Timeline from './timeline'
import Sidebar from './sidebar'

export default function Dashboard() {
  return (
    <Box
      display="flex"
      flexDirection="row"
      alignItems={"center"}
      justifyContent="center"
      gap="10"
      paddingY={'8'}
      maxWidth={{
        sm: 'screenSm',
        md: 'screenMd',
        lg: 'screenLg',
      }}
    >
      <Timeline />
      <Sidebar />
    </Box>
  )
}
