import React, { useState, useMemo } from 'react'
import Link from 'next/link'
import { Box, Stack, Button, Skeleton, IconPencil, IconBookOpen } from '@kalidao/reality'
import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import Card from '@components/dao-dashboard/timeline/Card'
import { getName } from '@graph/getName'
import { ethers } from 'ethers'
import { container, timeline } from './proposals.css'
import { useGetProposals } from '@graph/queries/getProposals'

const Proposals = () => {
  const router = useRouter()
  const { dao, chainId } = router.query
  const { data, isLoading, error } = useGetProposals(
    chainId ? Number(chainId) : 1,
    dao ? (dao as string) : ethers.constants.AddressZero,
  )

  // console.log('proposals', proposals)
  const [show, setShow] = useState(5)
  // filtering out cancelled proposals
  const memoizedProposals = useMemo(
    () =>
      data
        ?.sort((a: { serial: number }, b: { serial: number }) => b.serial - a.serial)
        .filter((p: any) => !(p.cancelled == true)),
    [data],
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
              {memoizedProposals.slice(0, show).map((proposal: { [x: string]: any }) => (
                <Card key={proposal['id']} proposal={proposal} />
              ))}
            </>
          )}
        </Box>
      </Skeleton>
      <Button variant="transparent" onClick={() => setShow(show + 5)}>
        View More
      </Button>
    </Box>
  )
}

export default Proposals
