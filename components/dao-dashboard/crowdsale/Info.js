import { useRouter } from 'next/router'
import { erc20ABI, useContractRead, useSigner } from 'wagmi'
import { Flex, Text } from '../../../styles/elements'
import { AddressZero } from '@ethersproject/constants'
import { ethers } from 'ethers'
import { prettyDate } from '../../../utils'
import { addresses } from '../../../constants/addresses'

export default function Info({ info }) {
  const router = useRouter()
  const { chainId } = router.query
  const { data: signer } = useSigner()

  const { data: purchaseTokenSymbol } = useContractRead(
    {
      addressOrName: info ? info['crowdsale']['purchaseToken'] : AddressZero,
      contractInterface: erc20ABI,
    },
    'symbol',
    {
      chainId: Number(chainId),
    },
  )

  const symbol =
    info?.crowdsale?.purchaseToken === '0x0000000000000000000000000000000000000000' ||
    info?.crowdsale?.purchaseToken.toLowerCase() === '0x000000000000000000000000000000000000dead'
      ? 'ETH'
      : purchaseTokenSymbol

  let type = ''
  switch (info?.crowdsale?.listId) {
    case '0':
      type = 'Public'
      break
    case '1':
      type = 'Accredited Investors'
      break
    default:
      type = 'Private'
      break
  }

  let progress = 0
  progress =
    (ethers.utils.formatEther(info?.crowdsale?.amountPurchased) /
      ethers.utils.formatEther(info?.crowdsale?.purchaseLimit)) *
    100
  const personalLimit = ethers.utils.formatEther(info?.crowdsale?.personalLimit)
  const purchaseLimit = ethers.utils.formatEther(info?.crowdsale?.purchaseLimit)

  return (
    <Flex dir="col" gap="md">
      <Text variant="subheading">Contribution Info</Text>
      <Flex dir="col" gap="md">
        <Flex dir="row" align="separate">
          <Text>Progress: </Text>
          <Text>{progress.toFixed(2)}%</Text>
        </Flex>
      </Flex>
      <Flex dir="col" gap="md">
        <Flex dir="row" align="separate">
          <Text>Type: </Text>
          <Text>{type}</Text>
        </Flex>
      </Flex>
      <Flex dir="col" gap="md">
        <Flex dir="row" align="separate">
          <Text>Contribution token: </Text>
          <Text
            as="a"
            href={addresses[chainId]['blockExplorer'] + '/address/' + info['crowdsale']['purchaseToken']}
            target="_blank"
            css={{
              color: '$amber11',
            }}
          >
            {symbol}
          </Text>
        </Flex>
      </Flex>
      <Flex dir="col" gap="md">
        <Flex dir="row" align="separate">
          <Text>Contribution Multiplier: </Text>
          <Text>x{info?.crowdsale?.purchaseMultiplier}</Text>
        </Flex>
      </Flex>
      <Flex dir="col" gap="md">
        <Flex dir="row" align="separate">
          <Text>Personal Limit: </Text>
          <Text>
            {personalLimit} {info?.token?.symbol}
          </Text>
        </Flex>
      </Flex>
      <Flex dir="col" gap="md">
        <Flex dir="row" align="separate">
          <Text>Total Limit: </Text>
          <Text>
            {purchaseLimit} {info?.token?.symbol}
          </Text>
        </Flex>
      </Flex>
      <Flex dir="col" gap="lg">
        <Flex dir="row" align="separate">
          <Text>Ends: </Text>
          <Text>{prettyDate(new Date(ethers.BigNumber.from(info?.crowdsale?.saleEnds * 1000).toNumber()))}</Text>
        </Flex>
      </Flex>
    </Flex>
  )
}
