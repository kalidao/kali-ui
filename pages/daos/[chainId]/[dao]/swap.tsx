import Layout from '@components/dao-dashboard/layout'
import { Box, Stack } from '@kalidao/reality'
import { useRouter } from 'next/router'
import { AddressZero } from '@ethersproject/constants'
import { Guide, Why, Swapper, useSwapStore } from '@components/dao-dashboard/swap/'
import { useEffect } from 'react'
import { useAccount } from 'wagmi'

export default function CrowdsalePage() {
  const router = useRouter()
  const daoAddress = router.query.dao ? (router.query.dao as string) : AddressZero
  const chainId = Number(router.query.chainId)
  const setChainId = useSwapStore((state) => state.setChainId)
  const stateChain = useSwapStore((state) => state.chainId)
  const setToken = useSwapStore((state) => state.setToken)
  const setSwap = useSwapStore((state) => state.setSwap)
  const setDAO = useSwapStore((state) => state.setDAO)
  const dao = useSwapStore((state) => state.dao)
  const swap = useSwapStore((state) => state.swap)
  const token = useSwapStore((state) => state.token)
  const { address, isConnected } = useAccount()
  const setUser = useSwapStore((state) => state.setUser)

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

  console.log('swap', stateChain, dao, swap, token)
  return (
    <Layout title="Swap" content="Swap Eth or tokens">
      <Box position="relative" display={'flex'}>
        <Stack>
          <Why />
          <Guide />
        </Stack>
        <Swapper />
      </Box>
    </Layout>
  )
}
