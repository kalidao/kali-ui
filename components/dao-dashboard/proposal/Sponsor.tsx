import { useRouter } from 'next/router'
import React, { useCallback, useState } from 'react'
import { useContractWrite } from 'wagmi'
import { Button } from '@kalidao/reality'
import DAO_ABI from '@abi/KaliDAO.json'
import { ethers } from 'ethers'
import ChainGuard from '@components/dao-dashboard/ChainGuard'

export default function Sponsor({ proposalId }: { proposalId: number }) {
  const router = useRouter()
  const { dao, chainId } = router.query
  const { writeAsync } = useContractWrite({
    mode: 'recklesslyUnprepared',
    addressOrName: dao ? (dao as string) : ethers.constants.AddressZero,
    contractInterface: DAO_ABI,
    functionName: 'sponsorProposal',
    chainId: Number(chainId),
  })
  const [loading, setLoading] = useState(false)

  const sponsor = useCallback(async () => {
    setLoading(true)
    if (!dao || !proposalId) return

    try {
      const tx = await writeAsync({
        recklesslySetUnpreparedArgs: [proposalId],
      })
    } catch (e) {
      console.log('error', e)
    }
    setLoading(false)
  }, [])

  return (
    <ChainGuard>
      <Button onClick={sponsor} loading={loading}>
        Sponsor
      </Button>
    </ChainGuard>
  )
}
