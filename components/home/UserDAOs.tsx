import React from 'react'
import { useAccount, useNetwork } from 'wagmi'
import DaoCard from './DaoCard'
import { Heading, Box, Stack, Skeleton } from '@kalidao/reality'
import { getName } from '@graph/getName'
import { getBuiltGraphSDK } from '../../.graphclient'
import { useQuery } from '@tanstack/react-query'
import { ethers } from 'ethers'

const sdk = getBuiltGraphSDK()

export default function UserDAOs() {
  const { address } = useAccount()
  const { chain } = useNetwork()
  const { data, error, isLoading } = useQuery(['UserDAOs', chain, address], () =>
    sdk.UserDAOs(
      {
        address: address ? address : ethers.constants.AddressZero,
      },
      {
        chainName: getName(chain ? chain.id : 1),
      },
    ),
  )

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
        <Heading>{chain?.name}</Heading>
      </Skeleton>
      <Skeleton>
        <Stack direction="horizontal" wrap>
          {data &&
            !error &&
            data?.members?.map((dao: { [x: string]: any }) => (
              <DaoCard key={dao?.['dao']['id']} dao={dao?.['dao']} chain={chain ? chain.id : 1} />
            ))}
        </Stack>
      </Skeleton>
    </Box>
  )
}
