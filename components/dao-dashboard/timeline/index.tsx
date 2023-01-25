import React, { useState, useMemo, useEffect } from 'react'
import Link from 'next/link'
import {
  Stack,
  Button,
  Skeleton,
  Heading,
  Card as CardComponent,
  IconPencil,
  IconBookOpen,
  Text,
} from '@kalidao/reality'
import Card from './Card'
import { useRouter } from 'next/router'
import { ethers } from 'ethers'
import { useGetProposals } from '@graph/queries/getProposals'
import { useContractRead } from 'wagmi'
import DAO_ABI from '@abi/KaliDAO.json'

export default function Timeline() {
  const router = useRouter()
  const { dao, chainId } = router.query
  const { data: name } = useContractRead({
    address: dao ? (dao as `0xstring`) : ethers.constants.AddressZero,
    abi: DAO_ABI,
    functionName: 'name',
    chainId: Number(chainId),
  })
  const { data } = useGetProposals(chainId ? Number(chainId) : 1, dao ? (dao as string) : ethers.constants.AddressZero)

  console.log('proposals', data)

  const [show] = useState(2)

  // filtering out cancelled proposals
  const memoizedProposals = useMemo(() => data?.filter((p: any) => !(p.cancelled == true)), [data])

  useEffect(() => {
    router.prefetch(`/daos/${chainId}/${dao}/proposals`)
  }, [chainId, dao, router])

  const gotoProposals = () => {
    router.push(`/daos/${chainId}/${dao}/proposals`)
  }

  return (
    <Stack>
      <Stack
        direction="horizontal"
        align="center"
        justify={memoizedProposals && memoizedProposals.length != 0 ? 'space-between' : 'flex-end'}
      >
        {memoizedProposals && memoizedProposals.length != 0 ? (
          <Button prefix={<IconBookOpen />} variant="transparent" onClick={gotoProposals}>
            View All
          </Button>
        ) : null}
        <Link
          href={{
            pathname: '/daos/[chainId]/[dao]/propose',
            query: {
              dao: dao as string,
              chainId: chainId as string,
            },
          }}
          passHref
        >
          <Button as="a" shape="circle">
            <IconPencil />
          </Button>
        </Link>
      </Stack>
      <Skeleton>
        <Stack>
          {memoizedProposals && memoizedProposals.length != 0 ? (
            <>
              {memoizedProposals.slice(0, show).map((proposal: { [x: string]: any }) => (
                <Card key={proposal['id']} proposal={proposal} />
              ))}
            </>
          ) : (
            <CardComponent padding="6">
              <Stack>
                <Heading level="2">
                  <>We could not find any proposals for {name}.</>
                </Heading>
                <Text wordBreak="break-word">
                  You can create proposals to add and remove members, interact with external contracts and install apps
                  like Swap and Redemption.
                </Text>
              </Stack>
            </CardComponent>
          )}
        </Stack>
      </Skeleton>
    </Stack>
  )
}
