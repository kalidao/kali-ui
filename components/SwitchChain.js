import React from 'react'
import { useNetwork } from 'wagmi'
import { Flex, Button } from '../styles/elements'
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
} from '../styles/Alert'

export default function SwitchChain({ chainId }) {
  const { chains, switchNetwork } = useNetwork()
  const chain = chains.find((c) => c.id == chainId)
  console.log('chain', chain)
  return (
    <AlertDialog defaultOpen={true}>
      <AlertDialogContent>
        <AlertDialogTitle>Switch Network</AlertDialogTitle>
        <AlertDialogDescription>This action will switch your network to {chain?.name}</AlertDialogDescription>
        <Flex gap="sm">
          <AlertDialogCancel asChild>
            <Button>Close</Button>
          </AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button variant="cta" onClick={() => switchNetwork(Number(chainId))}>
              Switch to {chain?.name}
            </Button>
          </AlertDialogAction>
        </Flex>
      </AlertDialogContent>
    </AlertDialog>
  )
}
