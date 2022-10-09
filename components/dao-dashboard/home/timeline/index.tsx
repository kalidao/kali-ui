import React, { useState, useMemo, useEffect } from 'react'
import Link from 'next/link'
import { Box, Stack, Button, Skeleton, IconPencil, IconBookOpen } from '@kalidao/reality'
import Card from './Card'
import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import { getName } from '@graph/getName'
import { getBuiltGraphSDK } from '../../../../.graphclient'
import { ethers } from 'ethers'
import { useGetProposals } from '@graph/queries/getProposals';

export default function Timeline() {
  const router = useRouter()
  const { dao, chainId } = router.query
  const { data, isLoading } = useGetProposals(Number(chainId), dao ? dao as string : ethers.constants.AddressZero);

  // filtering out cancelled proposals
  const memoizedProposals = useMemo(
    () =>
      data?.data?.proposals?.sort((a: { serial: number }, b: { serial: number }) => b.serial - a.serial).filter((p: any) => !(p.cancelled == true)),
    [data],
  )

  console.log('proposals', data?.data?.proposals)

  useEffect(() => {
    router.prefetch(`/daos/${chainId}/${dao}/proposals`)
  }, [chainId, dao, router])

  const gotoProposals = () => {
    router.push(`/daos/${chainId}/${dao}/proposals`)
  }

  return (
    <Box display="flex" flexDirection="column" gap="5">
      <Stack direction="horizontal" align="center" justify="space-between">
        <Button prefix={<IconBookOpen />} variant="transparent" size="small" onClick={gotoProposals}>
          View All
        </Button>
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
          <Button prefix={<IconPencil />} as="a">
            New Proposal
          </Button>
        </Link>
      </Stack>
      <Skeleton>
        <Stack>
            {memoizedProposals && memoizedProposals.slice(0, 2).map((proposal: any) => (
              <Card key={proposal['id']} proposal={proposal} />
            ))}
        </Stack>
      </Skeleton>
    </Box>
  )
}
