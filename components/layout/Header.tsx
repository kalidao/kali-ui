import React from 'react'
import { Box, Heading } from '@kalidao/reality'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { Menu } from '@design/Menu'
import { header } from '@components/dao-dashboard/layout/layout.css'

export default function Header() {
  return (
    <Box className={header}>
      <ConnectButton />
      <Menu />
    </Box>
  )
}
