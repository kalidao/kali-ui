import React from 'react'
import { useNetwork } from 'wagmi'
import Layout from '../../components/layout'
import Ricardian from '../../components/ricardian'
import SwitchChain from '../../components/SwitchChain'

export default function index() {
  const { activeChain } = useNetwork()

  return <Layout heading="Ricardian">{activeChain?.id != 4 ? <SwitchChain chainId={4} /> : <Ricardian />}</Layout>
}
