import React, { useEffect, useState } from 'react'
import { NextPage } from 'next'
import Layout from '@components/dao-dashboard/layout'
import { Stack, Text, Box, Tag, Button, IconPencil } from '@kalidao/reality'
import { useContractRead } from 'wagmi'
import { useRouter } from 'next/router'
import { AddressZero } from '@ethersproject/constants'
import DATAROOM_ABI from '@abi/DataRoom.json'
import { addresses } from '@constants/addresses'
import * as styles from '../../../../components/home/styles.css'
import Link from 'next/link'

const DataRoom: NextPage = () => {
  const router = useRouter()
  const daoAddress = router.query.dao ? (router.query.dao as string) : AddressZero
  const chainId = Number(router.query.chainId)

  const [file, setFile] = useState<{}[]>()

  const {
    data: room,
  } = useContractRead({
    addressOrName: chainId ? addresses?.[chainId]?.['extensions']['dataRoom'] : AddressZero,
    contractInterface: DATAROOM_ABI,
    chainId: chainId,
    functionName: 'getRoom',
    args: [daoAddress],
  })

  useEffect(() => {
    const getRoomData = async () => {
      let data_room: {}[] = []
      
      if (room && room.length > 0) {
        for (let i = 0; i < room.length; i++) {
          const response = await fetch(room[i])
          const responseJson = await response.json();
          data_room.push({
            tags: responseJson.tags,
            docs: responseJson.docs,
            name: responseJson.name
          })
          setFile(data_room)

          console.log(data_room)
        }
      }
    }

    getRoomData()
  }, [room])

  return (
    <Layout title={`Data Room`} content="View and add DAO ratified activities.">
      <Link
          href={{
            pathname: '/daos/[chainId]/[dao]/propose',
            query: {
              dao: daoAddress as string,
              chainId: chainId as string,
            },
          }}
          passHref
        >
          <Button as="a" shape="circle">
            <IconPencil />
          </Button>
        </Link>
      <Box
        width="viewWidth"
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        gap="3"
        padding="3"
      >
        <Stack direction={'horizontal'} justify={'flex-start'} wrap>
          {file?.map((item, index) => {
            return (
              <Box key={index} color={"red"} as="button" padding="6" width="96" onClick={() => router.push(item.docs)} backgroundColor="red" className={styles.card}>
                <Stack align="center" justify={'center'}>
                  <Text>{item.name}</Text>
                  <Stack direction={'horizontal'}>
                    {item.tags?.map((i, index) => {
                      return (
                        <Tag key={index}>{i}</Tag>
                      )
                    })}
                  </Stack>
                </Stack>
              </Box>
            )
          })}
        </Stack>
      </Box>
    </Layout>
  )
}

export default DataRoom
