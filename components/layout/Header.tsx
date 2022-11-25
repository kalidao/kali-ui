import React from 'react'
import { Box, Heading } from '@kalidao/reality'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { Menu } from '@design/Menu'
import { header } from './layout.css'
import { dashboardHeader } from '@components/dao-dashboard/layout/layout.css'

type HeaderProps = {
  heading?: string
  show?: boolean
}

export default function Header({ heading, show }: HeaderProps) {
  if (show) {
    return (
      <Box
        display="flex"
        flexDirection={'row'}
        alignItems="center"
        justifyContent="space-between"
        paddingX="3"
        className={header}
      >
        {show && <Heading as="h1">{heading}</Heading>}
        <Box display="flex" flexDirection="row" alignItems="center" justifyContent={'space-between'}>
          <Menu />
          <ConnectButton />
        </Box>
      </Box>
    )
  }

  return (
    <Box className={dashboardHeader}>
      <Menu />
      <ConnectButton />
    </Box>
  )
}
