import React from 'react'
import { useAccount, useNetwork } from 'wagmi'
import { useGraph } from '../hooks/useGraph'
import { USER_DAOS } from '../../graph'
import DaoCard from './DaoCard'
import { AddressZero } from '@ethersproject/constants'
import { Heading, Box, Skeleton } from '@kalidao/reality'
import { useUserDaos } from '@graph/queries/getUserDaos'

export default function UserDAOs() {
  const { address } = useAccount()
  const { chain } = useNetwork()
  const { data, isLoading, error } = useUserDaos(Number(chain?.id) as number, address as string)

  console.log('data', data)
  return (<Box width="viewWidth" display="flex" flexDirection="column" alignItems="center" justifyContent="center" gap="3" paddingBottom="3">
    <Skeleton>
      <Heading>{chain?.name}</Heading>
    </Skeleton>
    <Skeleton>
      <Box display="flex" flex="auto" gap="2" flexWrap="wrap">
        {data &&
          data.map((dao: { [x: string]: any }) => (
            <DaoCard key={dao['dao']['id']} dao={dao['dao']} chain={chain?.id.toString()} side={true} />
          ))}
      </Box>
    </Skeleton>
  </Box >)
}
