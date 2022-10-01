import React from 'react'
import { useNetwork } from 'wagmi'
import { Warning } from '../../styles/elements'
import { useRouter } from 'next/router'
import { Box } from '../../styles/elements'

export default function ChainGuard({ children }) {
  const router = useRouter()
  const daoChainId = router.query.chainId
  const { chain: userChain, chains } = useNetwork()
  const daoChainName = chains?.find((chain) => chain.id == daoChainId)?.name

  const isWrongChain = userChain?.id != daoChainId ? true : false
  const wrongChainWarning = userChain
    ? `Your Web3 wallet is connected to ${userChain?.name}. You need to switch to ${daoChainName} - the native blockchain of this DAO in order to submit transactions to it.`
    : `Your Web3 wallet is disconnected. You need to connect to ${daoChainName} - the native blockchain of this DAO in order to submit transactions to it.`

  return isWrongChain ? <Warning warning={wrongChainWarning} /> : <Box>{children}</Box>
}
