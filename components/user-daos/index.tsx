import React, { useState, useEffect } from 'react'
import { useNetwork } from 'wagmi'
import { GRAPH_URL } from '@graph/index'
import DaoCard from '../home/DaoCard'
import { Card, Avatar, Stack, Text, Tag } from '@kalidao/reality'
import { useQuery } from '@tanstack/react-query'
import { getLensProfile } from '@graph/queries/getLensProfile'
import { useGetAllUserDaos } from '@graph/queries/getAllUserDaos'

type Props = {
  address: string
}

export default function UserDAOs({ address }: Props) {
  // const [daos, setDaos] = useState([])
  const { data: lensProfile} = useQuery(["lensProfile", address], () => getLensProfile(address), {
    enabled: !!address,
  })
  const { data, error, isLoading } = useGetAllUserDaos(address)
  console.log('daos', data, isLoading, error)

  return (
    <Stack direction={"horizontal"}>
      <Card padding="6">
      <Stack direction={"horizontal"}>
        <Avatar size="24" label={`${address} profile pic`} src={lensProfile?.picture?.original?.url}   />
        <pre style={{
          color: "white"
        }}>{JSON.stringify(lensProfile)}</pre>
        <Stack direction={"vertical"} align="center">
          <Text size="headingOne">{lensProfile?.name}</Text>
          <Tag>@{lensProfile?.handle}</Tag>
          <Text>{lensProfile?.bio}</Text>
        </Stack>
       
      </Stack>
      </Card>
      {/* {daos != undefined ? (
        <Stack>
          {daos.length > 1 ? (
            <Text> They are are in {daos.length} DAOs </Text>
          ) : daos.length === 1 ? (
            <Text>They are in {daos.length} DAO</Text>
          ) : (
            <Text>They are not in any DAO!</Text>
          )}
          <Stack direction={"horizontal"} wrap>
            {daos &&
              daos.map((dao) => <DaoCard key={dao['dao']['id']} dao={dao['dao']} chain={Number(activeChain?.id)} />)}
          </Stack>
        </Stack>
      ) : null} */}
    </Stack>
  )
}
