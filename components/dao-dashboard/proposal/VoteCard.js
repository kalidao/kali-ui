import React from 'react'
import { Box } from '../../../styles/elements'
import { truncateAddress } from '../../../utils/'
import { useBalance, useEnsName } from 'wagmi'
import { CheckIcon, Cross2Icon } from '@radix-ui/react-icons'
import { useRouter } from 'next/router'
import { AddressZero } from '@ethersproject/constants'
import { Row, Data } from '../../../styles/Table'

export default function VoteCard({ vote }) {
  const router = useRouter()
  const daoAddress = router.query.dao
  const daoChain = router.query.chainId
  const { data: ensName } = useEnsName({
    address: vote.voter,
    chainId: 1,
  })

  const { data: balance } = useBalance({
    addressOrName: vote.voter,
    token: daoAddress ? daoAddress : AddressZero,
    chainId: Number(daoChain),
  })

  console.log('balance', daoAddress, daoChain)
  return (
    <Row>
      <Data
        css={{
          minWidth: '60px',
        }}
      >
        {ensName ? ensName : truncateAddress(vote.voter)}
      </Data>
      <Data
        css={{
          minWidth: '20px',
        }}
      >
        {vote.vote === true ? <CheckIcon color="green" /> : <Cross2Icon color="red" />}
      </Data>
      <Data
        css={{
          gap: '10px',
        }}
      >
        {Number(balance?.formatted).toFixed(2)}
        {'  '}
        {balance?.symbol}
      </Data>
    </Row>
  )
}
