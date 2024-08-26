import React from 'react'
import { useAccount, useSwitchChain } from 'wagmi'
import { useParams, useRouter } from 'next/navigation'
import { Alert, AlertDescription, AlertTitle } from '@components/ui/alert'
import { Button } from '@components/ui/button'
import { AlertCircle } from 'lucide-react'
import { Address } from 'viem'

type Props = {
  fallback?: React.ReactNode
  children: React.ReactNode
}

export default function ChainGuard({ fallback, children }: Props) {
  const params = useParams<{ chainId: string; dao: Address }>()
  const router = useRouter()
  const daoChainId = params ? Number(params.chainId) : 1 // default to mainnet
  const { chain: userChain } = useAccount()
  const { chains, switchChain } = useSwitchChain()

  const daoChainName = chains?.find((chain) => chain.id == daoChainId)?.name
  const isWrongChain = userChain?.id != daoChainId

  if (!userChain) {
    return null
  }

  if (isWrongChain) {
    if (daoChainId === 4) {
      return (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Deprecated!</AlertTitle>
          <AlertDescription>
            This DAO is on the deprecated Rinkeby testnet. We have switched to Goerli for testing now.
          </AlertDescription>
          {fallback || (
            <Button variant="outline" onClick={() => router.push('/')}>
              Go Home
            </Button>
          )}
        </Alert>
      )
    }

    return (
      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Switch Network!</AlertTitle>
        <AlertDescription>
          Your wallet is connected to {userChain?.name}. You need to switch to {daoChainName} in order to submit a
          transaction to this DAO.
        </AlertDescription>
        {fallback || (
          <Button variant="outline" onClick={() => switchChain?.({ chainId: daoChainId })}>
            Switch Network
          </Button>
        )}
      </Alert>
    )
  }

  return <>{children}</>
}
