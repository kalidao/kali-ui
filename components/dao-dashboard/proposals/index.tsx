import React, { useState, useMemo } from 'react'
import Link from 'next/link'
import { Box, Stack, Button, Skeleton, IconPencil, IconBookOpen } from '@kalidao/reality'
import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import Card from '@components/dao-dashboard/home/timeline/Card'
import { getName } from '@graph/getName'
import { getBuiltGraphSDK } from '../../../.graphclient'
import { ethers } from 'ethers'
import { container, timeline } from './proposals.css'

const sdk = getBuiltGraphSDK()

const Proposals = () => {
  const router = useRouter()
  const { dao, chainId } = router.query
  const {
    data: proposals,
    isLoading,
    error,
  } = useQuery(['', dao, chainId], () =>
    sdk.DaoProposals(
      {
        dao: dao ? (dao as string) : ethers.constants.AddressZero,
      },
      {
        chainName: getName(chainId ? Number(chainId) : 1),
      },
    ),
  )

  console.log('proposals', proposals)
  const [show, setShow] = useState(10)
  // filtering out cancelled proposals
  const memoizedProposals = useMemo(
    () =>
      proposals?.proposals
        ?.sort((a: { serial: number }, b: { serial: number }) => b.serial - a.serial)
        .filter((p: any) => !(p.cancelled == true)),
    [proposals],
  )

  return (
    <Box className={container}>
      <Stack direction="horizontal" align="center" justify="flex-end">
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
        <Box className={timeline}>
          {memoizedProposals && (
            <>
              {memoizedProposals.slice(0, show).map((proposal) => (
                <Card key={proposal['id']} proposal={proposal} />
              ))}
            </>
          )}
        </Box>
      </Skeleton>
      <Button variant="transparent" onClick={() => setShow(show + 10)}>
        View More
      </Button>
    </Box>
  )
}

export default Proposals
