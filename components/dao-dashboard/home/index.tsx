import React from 'react'
import { Box } from '@kalidao/reality'
import Timeline from './timeline'
import Sidebar from './sidebar'

export default function Dashboard() {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems={'center'}
      justifyContent="center"
      gap={{
        xs: '1',
        sm: '2',
        md: '5',
        lg: '7',
        xl: '10',
      }}
    >
      {/* <Sidebar /> */}
      <Timeline />
    </Box>
  )
}
