import React from 'react'
import { Box, Heading } from '@kalidao/reality'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import NavigationMenu from '@design/Navigation'

type HeaderProps = {
  heading?: string
}

export default function Header({ heading }: HeaderProps) {
  return (
    <Box display="flex" flexDirection={"row"} alignItems="center" justifyContent="space-between" padding="3">
      <Heading
        as="h1"
      >
        {heading}
      </Heading>
      <Box display="flex" flexDirection="row" alignItems="center" justifyContent="center">
        <ConnectButton />
        <NavigationMenu />
      </Box>
    </Box>
  )
}
