import { useState, useEffect } from 'react'
import { Flex, Text } from '../../../styles/elements'
import { styled } from '../../../styles/stitches.config'
import { Cross2Icon, InfoCircledIcon } from '@radix-ui/react-icons'
import { Popover, PopoverTrigger, PopoverContent, PopoverArrow, PopoverClose } from '../../../styles/elements/Popover'
import { ethers } from 'ethers'
import { prettyDate } from '../../../utils'
const Icon = styled(InfoCircledIcon, {
  color: '$mauve12',

  '&:hover': {
    color: '$mauve10',
  },
})

export default function Header({ info }) {
  console.log(info)

  const [saleType, setSaleType] = useState(null)
  const [personalLimit, setPersonalLimit] = useState(null)
  const [purchaseLimit, setPurchaseLimit] = useState(null)

  useEffect(() => {
    const getSaleType = () => {
      switch (info?.crowdsale?.listId) {
        case '0':
          setSaleType('Public')
          break
        case '1':
          setSaleType('Accredited Investors')
          break
        default:
          setSaleType('Private')
      }
    }

    const getPersonalLimit = () => {
      const limit = ethers.utils.formatEther(info?.crowdsale?.personalLimit)
      setPersonalLimit(limit)
    }

    const getPurchaseLimit = () => {
      const limit = ethers.utils.formatEther(info?.crowdsale?.purchaseLimit)
      setPurchaseLimit(limit)
    }

    getSaleType()
    getPersonalLimit()
    getPurchaseLimit()
  }, [])

  return (
    <Flex
      css={{
        justifyContent: 'space-between',
        alignItems: 'center',
        color: '$mauve12',
      }}
    >
      <Text
        css={{
          fontSize: '18px',
          fontFamily: 'Regular',
        }}
      >
        Buy
      </Text>
      <Popover>
        <PopoverTrigger asChild>
          <Icon aria-label="Crowdsale Information" />
        </PopoverTrigger>
        <PopoverContent>
          <Flex>
            <Flex align="separate">
              <Text>Type: </Text>
              <Text>{saleType}</Text>
            </Flex>
          </Flex>
          <Flex>
            <Flex align="separate">
              <Text>Personal Limit: </Text>
              <Text>
                {personalLimit} ${info?.token?.symbol}
              </Text>
            </Flex>
          </Flex>
          <Flex>
            <Flex align="separate">
              <Text>Total Limit: </Text>
              <Text>
                {purchaseLimit} ${info?.token?.symbol}
              </Text>
            </Flex>
          </Flex>
          <Flex>
            <Flex align="center">
              <Text>Ends: </Text>
              <Text>{prettyDate(new Date(ethers.BigNumber.from(info?.crowdsale?.saleEnds * 1000).toNumber()))}</Text>
            </Flex>
          </Flex>
          <PopoverArrow />
          <PopoverClose aria-label="Close">
            <Cross2Icon />
          </PopoverClose>
        </PopoverContent>
      </Popover>
    </Flex>
  )
}
