import React from 'react'
import { useAccount, useNetwork } from 'wagmi'
import DaoCard from './DaoCard'
import { Heading, Box, Stack, Skeleton } from '@kalidao/reality'
import { ethers } from 'ethers'
import { useGetUserDaos } from '@graph/queries/getUserDaos'

export default function UserDAOs() {
  const { address, isConnected } = useAccount()
  const { chain } = useNetwork()
  const { data, error, isLoading } = useGetUserDaos(
    address ? (address as string) : ethers.constants.AddressZero,
    chain ? Number(chain.id) : 1,
  )

  console.log('deta', address, data, error)

  return (
    <Box
      width="viewWidth"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      gap="3"
      paddingBottom="3"
    >
      <Skeleton>
        {isConnected && data?.length != 0 && (
          <Stack direction={'horizontal'}>
            <Heading>Yours ~ </Heading>
            <Heading color="foregroundSecondary">{chain?.name}</Heading>
          </Stack>
        )}
      </Skeleton>
      <Skeleton>
        <Stack direction="horizontal" wrap>
          {data &&
            isConnected &&
            !error &&
            data?.map((dao: { [x: string]: any }) => (
              <DaoCard key={dao?.['dao']['id']} dao={dao?.['dao']} chain={chain ? chain.id : 1} />
            ))}
        </Stack>
      </Skeleton>
    </Box>
  )
}
