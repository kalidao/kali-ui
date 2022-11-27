import React, { useState, useEffect } from 'react'
import { useAccount, useNetwork } from 'wagmi'
import DaoCard from './DaoCard'
import { Heading, Box, Stack, Card, Button, Skeleton, IconRefresh } from '@kalidao/reality'
import { ethers } from 'ethers'
import { useGetAllUserDaos } from '@graph/queries/getAllUserDaos'
import Search from './Search'

export default function UserDAOs({ address, label = 'Your DAOs' }: { address?: string; label?: string }) {
  const [display, setDisplay] = useState<any[]>([])
  const {
    data: daos,
    isSuccess,
    refetch,
  } = useGetAllUserDaos(address ? (address as string) : ethers.constants.AddressZero)

  useEffect(() => {
    if (isSuccess) {
      if (daos) {
        setDisplay(daos as any[])
      }
    }
  }, [daos, isSuccess])

  const reset = () => {
    refetch()
    setDisplay(daos as any[])
  }

  if (!address) return null

  return (
    <Box
      width="viewWidth"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      gap="3"
      padding="6"
    >
      {display && display?.length != 0 && (
        <Box
          width="full"
          padding="6"
          paddingX={'12'}
          display={'flex'}
          flexDirection={'row'}
          alignItems="center"
          justifyContent="space-between"
        >
          <Heading>{label}</Heading>
          <Stack direction={'horizontal'} align="center">
            <Search daos={daos as any[]} setDisplay={setDisplay} />
            <Button shape="circle" size="small" variant="secondary" onClick={reset}>
              <IconRefresh />
            </Button>
          </Stack>
        </Box>
      )}
      <Stack direction="horizontal" align="center" justify={'center'} wrap>
        {display &&
          display?.length != 0 &&
          display?.map((dao: { [x: string]: any }) => <DaoCard key={dao?.['id']} dao={dao} chain={dao?.chainId} />)}
      </Stack>
    </Box>
  )
}
