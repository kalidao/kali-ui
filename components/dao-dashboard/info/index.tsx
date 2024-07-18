import React from 'react'
import { Loader } from 'lucide-react'
import Extensions from './Extensions'
import Governance from './Governance'
import Meta from './Meta'
import Docs from './Docs'
import { useRouter } from 'next/router'

export default function InfoComponent({ info }: { info: any }) {
  const router = useRouter()
  const { chainId } = router.query

  return (
    <div className="container mx-auto px-4">
      {info === undefined ? (
        <div className="flex justify-center items-center h-screen">
          <Loader className="animate-spin h-8 w-8 text-gray-500" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
