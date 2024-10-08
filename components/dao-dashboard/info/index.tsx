'use client'
import React from 'react'
import { Loader } from 'lucide-react'
import Extensions from './Extensions'
import Governance from './Governance'
import Meta from './Meta'
import Docs from './Docs'
import { useParams } from 'next/navigation'

export default function InfoComponent({ info }: { info: any }) {
  const params = useParams<{ chainId: string }>()
  const chainId = params ? Number(params.chainId) : 1

  return (
    <div className="w-full mt-1">
      {info === undefined ? (
        <div className="flex justify-center items-center h-screen">
          <Loader className="animate-spin h-8 w-8 text-gray-500" />
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-4">
          <Meta
            symbol={info?.['token']?.['symbol']}
            totalSupply={info?.['token']?.['totalSupply']}
            address={info?.['id']}
            chainId={Number(chainId)}
          />
          <Governance
            votingPeriod={Number(info?.['votingPeriod'])}
            quorum={Number(info?.quorum)}
            supermajority={Number(info?.supermajority)}
            paused={Boolean(info?.token?.paused)}
            gracePeriod={Number(info?.gracePeriod)}
          />
          <Extensions tribute={info?.tribute} redemption={info?.redemption} swap={info?.crowdsale} />
          <Docs docs={info?.docs} />
          {/* TODO */}
          {/* <Analytics /> */}
        </div>
      )}
    </div>
  )
}
