import { useRouter } from 'next/router'
import React, { useCallback, useState, useEffect } from 'react'
import { useContractWrite } from 'wagmi'
import { Button } from '../../../styles/elements'
import DAO_ABI from '../../../abi/KaliDAO.json'

export default function Process({ proposal }) {
  const router = useRouter()
  const { chainId, dao } = router.query
  const { data, isError, isLoading, writeAsync } = useContractWrite(
    {
      addressOrName: dao,
      contractInterface: DAO_ABI,
    },
    'processProposal',
  )

  const process = useCallback(async () => {
    if (!dao || !proposal) return
    console.log('sponsor', proposal['serial'])
    try {
      const tx = await writeAsync({
        args: [proposal['serial']],
        overrides: {
          gasLimit: 2050000,
        },
      })
    } catch (e) {
      console.log('error', e)
    }
  }, [dao, proposal])

  return (
    <Button variant="cta" onClick={process} disabled={isLoading}>
      Process
    </Button>
  )
}
