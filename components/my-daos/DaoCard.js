import { useRouter } from 'next/router'
import { styled } from '../../styles/stitches.config'
import { truncateAddress } from '../../utils/formatters'
import { Box } from '../../styles/elements'
import { getDaoChain } from '../../utils'
import { useState, useEffect } from 'react'
import { useNetwork } from 'wagmi'

const Name = styled('div', {
  fontFamily: 'Bold',
})

const Address = styled('div', {
  fontFamily: 'Screen',
})

// disable when not active chain
export default function DaoCard({ dao, chain }) {
  const router = useRouter()
  const { activeChain } = useNetwork()

  const gotoDAO = async () => {
    if (chain != null) {
      router.push(`/daos/${chain}/${dao['id']}`)
    } else {
      if (activeChain) {
        router.push(`/daos/${activeChain?.id}/${dao['id']}`)
      } else {
        const chainId = await getDaoChain(dao['id'])
        if (chainId) {
          router.push(`/daos/${chainId}/${dao['id']}`)
        }
      }
    }
  }

  return (
    <Box as="a" variant="card" onClick={gotoDAO}>
      <Name>{dao['token']['name']}</Name>
      {dao['members'] != undefined && <Name>{dao['members'].length} Members</Name>}
      <Address>{truncateAddress(dao['id'])}</Address>
    </Box>
  )
}
