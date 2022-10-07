import { useRouter } from 'next/router'
import React, { useCallback } from 'react'
import { useAccount, useContractWrite } from 'wagmi'
import { Button } from '../../../styles/elements'
import DAO_ABI from '../../../abi/KaliDAO.json'

export default function Sponsor({ proposal }) {
  const router = useRouter()
  const { dao, chainId } = router.query
  const { writeAsync } = useContractWrite({
    mode: 'recklesslyUnprepared',
    addressOrName: dao,
    contractInterface: DAO_ABI,
    functionName: 'sponsorProposal',
    chainId: Number(chainId),
  })

  const sponsor = useCallback(async () => {
    // if (!account || !dao || !proposal) return
    // console.log('sponsor', proposal['serial'])
    try {
      const tx = await writeAsync({
        recklesslySetUnpreparedArgs: [proposal['serial']],
        recklesslySetUnpreparedOverrides: {
          gasLimit: 1050000,
        },
      })
    } catch (e) {
      console.log('error', e)
    }
  }, [])

  return (
    <Button variant="cta" onClick={sponsor}>
      Sponsor
    </Button>
  )
}
