import React, { useState, useMemo } from 'react'
import Link from 'next/link'
import { Box, Stack, Button, Skeleton, IconPencil, IconBookOpen } from '@kalidao/reality'
import Card from './Card'
import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import { getBuiltGraphSDK } from '.graphclient'
import { getName } from '@graph/getName'
import { ethers } from 'ethers'

const sdk = getBuiltGraphSDK()

export default function Timeline() {
  const router = useRouter()
  const { dao, chainId } = router.query
  const {
    data: proposals,
    isLoading,
    error,
  } = useQuery(['', dao, chainId], () =>
    sdk.DaoProposals(
      {
        dao: dao ? dao as string : ethers.constants.AddressZero,
      },
      {
        chainName: getName(chainId ? Number(chainId) : 1),
      },
    ),
  )

  console.log('proposals', proposals)

  const [show, setShow] = useState(2)
  // filtering out cancelled proposals
  const memoizedProposals = useMemo(
    () =>
      proposals?.proposals
        ?.sort((a: { serial: number }, b: { serial: number }) => b.serial - a.serial)
        .filter((p: any) => !(p.cancelled == true)),
    [proposals],
  )

  return (
    <Box display="flex" flexDirection="column" gap="5">
      <Stack direction="horizontal" align="center" justify="space-between">
        <Button prefix={<IconBookOpen />} variant="transparent" size="small" onClick={() => setShow(show + 10)}>
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
          {/*memoizedProposals && (
            <>
              {memoizedProposals.slice(0, show).map((proposal: { [x: string]: React.Key | null | undefined }) => (
                <Card key={proposal['id']} proposal={proposal} />
              ))}
            </>
              )*/}
        </Stack>
      </Skeleton>
    </Box>
  )
}
