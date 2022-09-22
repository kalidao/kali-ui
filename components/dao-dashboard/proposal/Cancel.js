import { useRouter } from 'next/router'
import React, { useCallback } from 'react'
import { useAccount, useContractWrite } from 'wagmi'
import { Button } from '../../../styles/elements'
import DAO_ABI from '../../../abi/KaliDAO.json'

export default function Cancel({ proposal }) {
  const router = useRouter()
  const { dao, chainId } = router.query
  const { data, isError, isLoading, writeAsync } = useContractWrite(
    {
      addressOrName: dao,
      contractInterface: DAO_ABI,
      chainId,
    },
    'cancelProposal',
  )

  const cancel = useCallback(async () => {
    if (!dao || !proposal) return
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
  }, [dao, proposal])

  return (
    <Button variant="cta" onClick={cancel}>
      Cancel
    </Button>
  )
}
