import React from 'react'
import { useAccount, useNetwork } from 'wagmi'
import DaoCard from './DaoCard'
import { Heading, Box, Skeleton } from '@kalidao/reality'
import { useUserDaos } from '@graph/queries/getUserDaos'

export default function UserDAOs() {
  const { address } = useAccount()
  const { chain } = useNetwork()
  const { data, error, isError } = useUserDaos(chain ? chain.id : 1, address as string)

  return (<Box width="viewWidth" display="flex" flexDirection="column" alignItems="center" justifyContent="center" gap="3" paddingBottom="3">
    <Skeleton>
      <Heading>{chain?.name}</Heading>
    </Skeleton>
    <Skeleton>
      <Box display="flex" flex="auto" gap="2" flexWrap="wrap">
        {data && !error && data?.map((dao: { [x: string]: any }) => (
          <DaoCard key={dao?.['dao']['id']} dao={dao?.['dao']} chain={chain ? chain.id : 1} />
        ))}
      </Box>
    </Skeleton>
  </Box >)
}
