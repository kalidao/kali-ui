import React, { useEffect, useState } from 'react'
import { NextPage } from 'next'
import Layout from '@components/dao-dashboard/layout'
import { useReadContract } from 'wagmi'
import { useRouter } from 'next/router'
import { AddressZero } from '@ethersproject/constants'
import DATAROOM_ABI from '@abi/DataRoom.json'
import { addresses } from '@constants/addresses'
import Link from 'next/link'
import { Button } from '@components/ui/button'
import { Plus } from 'lucide-react'
import { Badge } from '@components/ui/badge'

interface Data {
  tags: string[]
  docs: string
  name: string
}

const DataRoom: NextPage = () => {
  const router = useRouter()
  const daoAddress = router.query.dao ? (router.query.dao as string) : AddressZero
  const chainId = Number(router.query.chainId)

  const [file, setFile] = useState<Data[]>()

  const { data: room } = useReadContract({
    address: chainId ? addresses?.[chainId]?.['extensions']['dataRoom'] : AddressZero,
    abi: DATAROOM_ABI,
    chainId: chainId,
    functionName: 'getRoom',
    args: [daoAddress],
  })

  useEffect(() => {
    const getRoomData = async () => {
      let data_room: Array<Data> = []
      const _room: Array<string> = Array.isArray(room) ? room : [room]

      if (room && _room.length > 0) {
        for (let i = 0; i < _room.length; i++) {
          const url = new URL(_room[i])
          const response = await fetch(url)
          const responseJson = await response.json()
          data_room.push({
            tags: responseJson.tags,
            docs: responseJson.docs,
            name: responseJson.name,
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
      <div className="flex flex-col items-center justify-center gap-3 p-3 w-full">
        <div className="flex justify-end w-full">
          <Link
            href={{
              pathname: '/daos/[chainId]/[dao]/propose',
              query: {
                dao: daoAddress as string,
                chainId: chainId,
              },
            }}
            passHref
          >
            <Button size="icon">
              <Plus className="h-4 w-4" />
            </Button>
          </Link>
        </div>
        <div className="flex flex-wrap justify-start">
          {file?.map((item, index) => {
            return (
              <button
                key={index}
                className="p-6 w-96 bg-red-500 text-white m-2 rounded-lg hover:bg-red-600 transition-colors"
                onClick={() => router.push(item.docs)}
              >
                <div className="flex flex-col items-center justify-center">
                  <p className="text-lg font-semibold mb-2">{item.name}</p>
                  <div className="flex flex-wrap gap-2">
                    {item.tags?.map((tag, index) => (
                      <Badge key={index} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </button>
            )
          })}
        </div>
      </div>
    </Layout>
  )
}

export default DataRoom
