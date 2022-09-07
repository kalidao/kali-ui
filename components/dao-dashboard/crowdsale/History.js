import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { Flex, Text } from '../../../styles/elements'
import { ethers } from 'ethers'
import { truncateAddress } from '../../../utils'

export default function History({ info, symbol }) {
  const [purchasers, setPurchasers] = useState(null)

  useEffect(() => {
    const getPastPurchasers = () => {
      setPurchasers(info['crowdsale']['purchase'])
    }

    getPastPurchasers()
  }, [])

  return (
    <Flex
      dir="col"
      gap="md"
      css={{
        width: '100%',
        height: '100%',
        alignItems: 'flex-start',
      }}
    >
      <Text variant="subheading">Past Contributions:</Text>
      {purchasers &&
        purchasers.map((purchaser, index) => (
          <Flex
            key={index}
            gap="lg"
            css={{
              width: '100%',
              height: '2rem',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Text
              css={{
                width: '5%',
              }}
            >
              {index + 1}.
            </Text>
            <Text
              css={{
                width: '40%',
              }}
            >
              {truncateAddress(purchaser.purchaser)}
            </Text>
            <Text
              css={{
                width: '40%',
              }}
            >
              {Number(ethers.utils.formatEther(purchaser.purchased) / info['crowdsale']['purchaseMultiplier']).toFixed(
                3,
              )}{' '}
              {symbol}
            </Text>
          </Flex>
        ))}
    </Flex>
  )
}
