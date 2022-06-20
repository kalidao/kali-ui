import React from 'react'
import { useAccount, useContractWrite } from 'wagmi'
import { Button } from '../../styles/elements'

// create a react component called Claim that renders a button that when clicked calls the claim function
export default function Claim() {
  const { data: account } = useAccount()
  const { isLoading: isClaimPending, writeAsync } = useContractWrite(
    {
      addressOrName: '',
      contractInterface: '',
    },
    'claim',
  )

  const claim = async () => {
    // claim function calls the claim function in the KaliToken contract on polygon using wagmi's useContractWrite hook
    if (!account) return
  }
  return (
    <Button
      variant="cta"
      onClick={claim}
      css={{
        fontFamily: 'Screen',
        width: '100%',
        height: '1.7rem',
      }}
      disabled={!account || isClaimPending}
    >
      Claim
    </Button>
  )
}
