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
