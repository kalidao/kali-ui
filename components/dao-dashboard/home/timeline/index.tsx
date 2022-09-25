import React, { useState, useMemo } from 'react'
import { Box, Text, Button, Heading, Skeleton } from '@kalidao/reality'
import Card from './Card'
import NewProposalCard from './NewProposalCard'
import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import { getBuiltGraphSDK } from '.graphclient'
import { getName } from '@graph/getName'
import { ethers } from 'ethers'

const sdk = getBuiltGraphSDK()

export default function Timeline() {
  const router = useRouter();
  const { dao, chainId } = router.query
  const { data: proposals, isLoading, error } = useQuery(['', dao, chainId], () =>
    sdk.Proposals(
      {
        dao: dao ? dao : ethers.constants.AddressZero,
      },
      {
        chainName: getName(chainId ? Number(chainId) : 1),
      },
    ),
  )

  console.table('proposals', proposals)

  const [show, setShow] = useState(2)
  // filtering out cancelled proposals
  const memoizedProposals = useMemo(
    () => proposals?.proposals?.sort((a: { serial: number }, b: { serial: number }) => b.serial - a.serial).filter((p: { cancelled: boolean }) => !(p.cancelled == true)),
    [proposals],
  )


  return (
    <Box display="flex" flexDirection="column" gap="5">
      <NewProposalCard />
      <Skeleton>
        <Box width="96">
          {memoizedProposals && (
            <>
              {memoizedProposals.slice(0, show).map((proposal: { [x: string]: React.Key | null | undefined }) => (
                <Card key={proposal['id']} proposal={proposal} />
              ))}
            </>
          )}
        </Box>
      </Skeleton>
      <Button variant="transparent" size="small" onClick={() => setShow(show + 10)}>
        View All
      </Button>
    </Box>
  )
}
