import React, { useState, useMemo, useEffect } from 'react'
import ProposalCard from './Card'
import { Button } from '@components/ui/button'
import { useParams, useRouter } from 'next/navigation'
import { ethers } from 'ethers'
import { useGetProposals } from '@graph/queries/getProposals'
import { useReadContract } from 'wagmi'
import { KALIDAO_ABI } from '@abi/KaliDAO'
import { Card, CardHeader, CardTitle, CardContent } from '@components/ui/card'
import { cn } from '@utils/util'
import { Address, zeroAddress } from 'viem'

export default function Timeline() {
  const router = useRouter()
  const params = useParams<{ chainId: string; dao: Address }>()
  const chainId = params ? Number(params.chainId) : 1
  const dao = params?.dao as Address

  const { data: name } = useReadContract({
    address: dao ? (dao as `0xstring`) : zeroAddress,
    abi: KALIDAO_ABI,
    functionName: 'name',
    chainId: Number(chainId),
  })
  const { data } = useGetProposals(chainId ? Number(chainId) : 1, dao ? (dao as string) : zeroAddress)
  const [show] = useState(2)

  // filtering out cancelled proposals
  const memoizedProposals = useMemo(() => data?.filter((p: any) => !(p.cancelled == true)), [data])

  useEffect(() => {
    router.prefetch(`/daos/${chainId}/${dao}/proposals`)
  }, [chainId, dao, router])

  const gotoProposals = () => {
    router.push(`/daos/${chainId}/${dao}/proposals`)
  }

  const gotoPropose = () => {
    router.push(`/daos/${chainId}/${dao}/propose`)
  }

  return (
    <div
      className={cn(
        'flex flex-col space-y-4 md:flex-col p-1',
        memoizedProposals && memoizedProposals.length != 0 ? 'md:justify-between' : 'md:justify-end',
      )}
    >
      <div className="mt-2 flex flex-row items-center justify-start space-x-2">
        {memoizedProposals && memoizedProposals.length != 0 ? (
          <Button variant="link" onClick={gotoProposals}>
            View All
          </Button>
        ) : null}
        <Button variant="link" onClick={gotoPropose}>
          Propose
        </Button>
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
              <CardTitle>{`We could not find any proposals for ${name}.`}</CardTitle>
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
