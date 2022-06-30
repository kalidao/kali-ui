import React from 'react'
import { useAccount, useNetwork } from 'wagmi'
import Layout from '../../components/layout'
import Ricardian from '../../components/ricardian'
import SwitchChain from '../../components/SwitchChain'

export default function index() {
  const { activeChain } = useNetwork()
  const { data: account } = useAccount()
  return (
    <Layout heading="Ricardian">{account && activeChain?.id != 4 ? <SwitchChain chainId={4} /> : <Ricardian />}</Layout>
  )
}
