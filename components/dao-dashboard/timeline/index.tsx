import React, { useState, useMemo, useEffect } from 'react'
import Link from 'next/link'
import { PencilIcon, BookOpenIcon } from 'lucide-react'
import ProposalCard from './Card'
import { Button } from '@components/ui/button'
import { useRouter } from 'next/router'
import { ethers } from 'ethers'
import { useGetProposals } from '@graph/queries/getProposals'
import { useContractRead } from 'wagmi'
import DAO_ABI from '@abi/KaliDAO.json'
import { Card, CardHeader, CardTitle, CardContent } from '@components/ui/card'
import { Skeleton } from '@components/ui/skeleton'
import { cn } from '@utils/util'

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
    <div
      className={cn(
        'flex flex-col space-y-4',
        memoizedProposals && memoizedProposals.length != 0
          ? 'md:flex-row md:justify-between'
          : 'md:flex-col md:justify-end',
      )}
    >
      <div>
        {memoizedProposals && memoizedProposals.length != 0 ? (
          <Button variant="ghost" onClick={gotoProposals}>
            <BookOpenIcon className="mr-2" />
            <span>View All</span>
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
          className="p-2 text-blue-500 hover:underline rounded-lg flex items-center space-x-1 cursor-pointer w-fit"
        >
          <PencilIcon className="h-5 w-5" />
          <p className="font-bold text-lg">Propose</p>
        </Link>
      </div>

      <div>
        {memoizedProposals && memoizedProposals.length != 0 ? (
          <>
            {memoizedProposals.slice(0, show).map((proposal: { [x: string]: any }) => (
              <ProposalCard key={proposal['id']} proposal={proposal} />
            ))}
          </>
        ) : (
          <Card>
            <CardHeader>
              <CardTitle>We could not find any proposals for {name}.</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="break-words">
                You can create proposals to add and remove members, interact with external contracts and install apps
                like Swap and Redemption.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
