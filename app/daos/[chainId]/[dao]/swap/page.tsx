'use client'
import { useParams } from 'next/navigation'
import { Address } from 'viem'
import { Approve, Why, Swapper, useSwapStore } from '@components/dao-dashboard/swap/'
import { useEffect } from 'react'
import { useAccount } from 'wagmi'
import Confetti from '@components/tools/Confetti'

export default function CrowdsalePage() {
  const params = useParams<{ chainId: string; dao: Address }>()
  const chainId = params ? Number(params.chainId) : 1
  const daoAddress = params?.dao as Address

  const setChainId = useSwapStore((state) => state.setChainId)
  const stateChain = useSwapStore((state) => state.chainId)
  const setToken = useSwapStore((state) => state.setToken)
  const setSwap = useSwapStore((state) => state.setSwap)
  const setDAO = useSwapStore((state) => state.setDAO)
  const dao = useSwapStore((state) => state.dao)
  const swap = useSwapStore((state) => state.swap)
  const token = useSwapStore((state) => state.token)
  const user = useSwapStore((state) => state.user)
  const { address, isConnected } = useAccount()
  const setUser = useSwapStore((state) => state.setUser)
  const success = useSwapStore((state) => state.success)

  useEffect(() => {
    if (swap && chainId) {
      setToken(swap.purchaseAsset, chainId)
    }
  }, [swap, chainId, setToken])

  useEffect(() => {
    if (daoAddress && chainId) {
      setSwap(daoAddress, chainId)
    }
  }, [daoAddress, chainId, setSwap])

  useEffect(() => {
    if (daoAddress && chainId) {
      setDAO(daoAddress, chainId)
    }
  }, [daoAddress, chainId, setDAO])

  useEffect(() => {
    if (daoAddress && chainId) {
      setSwap(daoAddress, chainId)
    }
  }, [daoAddress, chainId, setSwap])

  useEffect(() => {
    if (chainId) {
      setChainId(chainId)
    }
  }, [chainId, setChainId])

  useEffect(() => {
    if (isConnected && address && token.address != '' && chainId) {
      setUser(token.address, address as string, chainId)
    }
  }, [isConnected, address, chainId, setUser, token.address])

  console.log('swap', stateChain, dao, swap, token, user)
  return (
    <>
      <div>
        <div className="relative w-full">
          <Why />
          <Approve />
        </div>
        <Swapper />
      </div>
      {success == true && <Confetti />}
    </>
  )
}
