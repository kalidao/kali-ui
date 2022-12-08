import { Progress } from '@design/Progress'
import { Card, Stack, Text, Heading, Divider, Field, Button, IconTokens, IconCheck } from '@kalidao/reality'
import { prettyDate } from '@utils/prettyDate'
import { ethers } from 'ethers'
import { useCallback, useEffect } from 'react'
import { erc20ABI, useAccount, useContractWrite, usePrepareContractWrite } from 'wagmi'
import ChainGuard from '../ChainGuard'
import { useSwapStore } from './store'

export default function Guide() {
  const swap = useSwapStore((state) => state.swap)
  const token = useSwapStore((state) => state.token)
  const chainId = useSwapStore((state) => state.chainId)
  const setApproved = useSwapStore((state) => state.setApproved)
  const { config } = usePrepareContractWrite({
    addressOrName: token.address,
    contractInterface: erc20ABI,
    functionName: 'approve',
    chainId: chainId,
    args: [swap.address, ethers.constants.MaxUint256],
  })
  const { writeAsync, isSuccess } = useContractWrite(config)
  const { address, isConnected } = useAccount()

  useEffect(() => {
    if (isConnected && address && token.address && swap.address && chainId) {
       setApproved(address, token.address, swap.address, chainId)
    }
  }, [isConnected, address, token.address, swap.address, chainId, setApproved])

  const approve = useCallback(async () => {
    if (!writeAsync || !isConnected || !address) return
    try {
        const tx = await writeAsync()
        tx.wait(1).then(() => {
            setApproved(address, token.address, swap.address, chainId)
        })
    } catch (e) {
        console.error(e)
    }
  }, [writeAsync, setApproved, address, chainId, isConnected, token.address, swap.address])

  return <ChainGuard fallback={<Button width="full">Swap</Button>}>
      <Button width="full" prefix={<IconCheck />} onClick={approve} disabled={!writeAsync || !isConnected || isSuccess}>Approve Kali to use your {token.symbol}</Button>
  </ChainGuard>
}
