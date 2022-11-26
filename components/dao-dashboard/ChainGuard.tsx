import React from 'react'
import { useNetwork, useSwitchNetwork } from 'wagmi'
import { useRouter } from 'next/router'
import { Alert } from '@design/Alert/index'
import { Button } from '@kalidao/reality'

type Props = {
  fallback?: React.ReactNode
  children: React.ReactNode
}

export default function ChainGuard({ fallback, children }: Props) {
  const router = useRouter()
  const daoChainId = Number(router.query.chainId)
  const { chain: userChain } = useNetwork()
  const { chains, switchNetwork } = useSwitchNetwork()
  const daoChainName = chains?.find((chain) => chain.id == daoChainId)?.name

  const isWrongChain = userChain?.id != daoChainId ? true : false

 
  if (isWrongChain) {
    return (
      <Alert
        onClick={() => switchNetwork?.(daoChainId)}
        title="Switch Network!"
        message={`Yes, switch network to ${daoChainName}`}
        description={`Your wallet is connected to ${userChain?.name}. You need to switch to ${daoChainName} in order to submit a transaction to this DAO.`}
      >
        {fallback ? (
          fallback
        ) : (
          <Button variant="secondary" tone="green">
            Switch Network
          </Button>
        )}
      </Alert>
    )
  }

  return <>{children}</>
}
