import { useRouter } from 'next/router'
import { styled } from '../../styles/stitches.config'
import { truncateAddress } from '../../utils/formatters'
import { Flex, Box } from '../../styles/elements'
import { getDaoChain } from '../../utils'
import { useState, useEffect } from 'react'
import { useNetwork } from 'wagmi'
import { getRandomEmoji } from '../../utils/'

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
      <Box
        css={{
          background: '$gray9',
          borderRadius: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '30px',
          width: '30px',
        }}
      >
        {getRandomEmoji(dao['id'])}
      </Box>
      <Flex dir="col" gap="sm">
        <Name>{dao['token']['name']}</Name>
        {dao['members'] != undefined && <Name>{dao['members'].length} Members</Name>}
        <Address>{truncateAddress(dao['id'])}</Address>
      </Flex>
    </Box>
  )
}
