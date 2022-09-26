import React from 'react'
import { Box, Heading } from '@kalidao/reality'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import NavigationMenu from '@design/Navigation'
import { header } from './layout.css'

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
          <NavigationMenu />
          <ConnectButton />
        </Box>
      </Box>
    )
  }

  return (
    <Box
      display="flex"
      flexDirection={'row'}
      alignItems="center"
      justifyContent={{
        xs: 'space-around',
        lg: 'space-between',
      }}
      padding="3"
      paddingRight={{
        xs: '3',
        lg: '20',
      }}
      height="16"
    >
      <NavigationMenu />
      <ConnectButton />
    </Box>
  )
}
