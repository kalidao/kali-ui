import { useRouter } from 'next/router'
import React, { useCallback } from 'react'
import { useAccount, useContractWrite } from 'wagmi'
import { Button } from '../../../styles/elements'
import DAO_ABI from '../../../abi/KaliDAO.json'

export default function Sponsor({ proposal }) {
  const router = useRouter()
  const { dao } = router.query
  const { data: account } = useAccount()
  const { data, isError, isLoading, writeAsync } = useContractWrite(
    {
      addressOrName: dao,
      contractInterface: DAO_ABI,
    },
    'sponsorProposal',
  )

  const sponsor = useCallback(async () => {
    // if (!account || !dao || !proposal) return
    console.log('sponsor', proposal['serial'])
    try {
      const tx = await writeAsync({
        args: [proposal['serial']],
        overrides: {
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
