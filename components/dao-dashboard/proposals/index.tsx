import React, { useState, useMemo } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { Button } from '@components/ui/button'
import { Pencil } from 'lucide-react'
import Card from '@components/dao-dashboard/timeline/Card'
import { useGetProposals } from '@graph/queries/getProposals'
import { Address, zeroAddress } from 'viem'

const Proposals = () => {
  const params = useParams<{ chainId: string; dao: Address }>()
  const chainId = params ? Number(params.chainId) : 1
  const dao = params?.dao as Address

  const { data } = useGetProposals(chainId ? Number(chainId) : 1, dao ? (dao as string) : zeroAddress)

  const [show, setShow] = useState(5)

  const memoizedProposals = useMemo(
    () =>
      data
        ?.sort((a: { serial: number }, b: { serial: number }) => b.serial - a.serial)
        .filter((p: any) => !(p.cancelled == true)),
    [data],
  )

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-end mb-4">
        <Link
          href={{
            pathname: '/daos/[chainId]/[dao]/propose',
            query: {
              dao: dao,
              chainId: chainId,
            },
          }}
          passHref
        >
          <Button asChild>
            <a className="flex items-center">
              <Pencil className="mr-2 h-4 w-4" />
              New Proposal
            </a>
          </Button>
        </Link>
      </div>
      <div className="space-y-4">
        {memoizedProposals && (
          <>
            {memoizedProposals.slice(0, show).map((proposal: { [x: string]: any }) => (
              <Card key={proposal['id']} proposal={proposal} />
            ))}
          </>
        )}
      </div>
      <div className="mt-4">
        <Button variant="outline" onClick={() => setShow(show + 5)}>
          View More
        </Button>
      </div>
    </div>
  )
}

export default Proposals
