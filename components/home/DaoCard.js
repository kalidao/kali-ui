import { useRouter } from 'next/router'
import { styled } from '../../styles/stitches.config'
import { truncateAddress } from '../../utils/'
import { Flex, Box, Button } from '../../styles/elements'
import { getDaoChain } from '../../utils'
import { useNetwork } from 'wagmi'
import { getRandomEmoji } from '../../utils/'
import { Avatar, AvatarImage, AvatarFallback } from '@radix-ui/react-avatar'
import { useState } from 'react'
import { Spinner } from '../elements'

const Name = styled('div', {
  fontFamily: 'Bold',
})

const Address = styled('div', {
  fontFamily: 'Screen',
})

// disable when not active chain
export default function DaoCard({ dao, chain, side }) {
  const router = useRouter()
  const { activeChain, chains } = useNetwork()
  const [loading, setLoading] = useState(false)

  const gotoDAO = async () => {
    setLoading(true)
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
    setLoading(false)
  }

  const getChainName = (chainId) => {
    switch (chainId) {
      case '1':
        return 'Ethereum'
      case '137':
        return 'Polygon'
      case '42161':
        return 'Arbitrum'
      case '10':
        return 'Optimism'
      case '4':
        return 'Rinkeby'
      case '5':
        return 'Goerli'
    }
  }
  return (
    <Flex
      css={{
        width: '15rem',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        fontSize: '16px',
        border: '1px solid $gray3',
        background: side ? 'none' : '$gray2',
        padding: '10px',
        borderRadius: side ? 0 : '20px',
        gap: '10px',
        width: 'fit-content',

        '@media (max-width: 540px)': {
          width: '15rem',
        },

        '&:hover': {
          background: side ? '$gray2' : '$gray3',
          border: side ? '1px solid $gray4' : '1px solid $gray5',
        },
        '&:active': {
          background: side ? '$gray3' : '$gray4',
          border: side ? '1px solid $gray5' : '1px solid $gray6',
        },
        '&:focus': {
          background: side ? '$gray3' : '$gray4',
          border: side ? '1px solid $gray5' : '1px solid $gray6',
        },
      }}
      as="a"
      onClick={gotoDAO}
    >
      <Box
        css={{
          background: '$gray3',
          borderRadius: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '25px',
          width: '25px',
        }}
      >
        {getRandomEmoji(dao['id'])}
      </Box>
      <Flex
        dir="col"
        gap="md"
        css={{
          width: '15rem',
        }}
      >
        <Name>{dao['token']['name']}</Name>
        {dao['members'] != undefined && (
          <Box
            css={{
              fontFamily: 'Regular',
            }}
          >
            {dao['members'].length} Members
          </Box>
        )}

        <Box
          css={{
            fontFamily: 'Regular',
          }}
        >
          {getChainName(chain)}
        </Box>
      </Flex>
    </Flex>
  )
}
