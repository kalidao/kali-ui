import { useRouter } from 'next/router'
import { erc20ABI, useContractRead } from 'wagmi'
import { Flex, Text, Button } from '../../../styles/elements'
import { styled } from '../../../styles/stitches.config'
import Buy from './Buy'
import DAO_ABI from '../../../abi/KaliDAO.json'
import { useState } from 'react'
import { Input } from '../../../styles/form-elements'
import { ArrowDownIcon } from '@radix-ui/react-icons'
import Header from './Header'
import { AddressZero } from '@ethersproject/constants'
import { ethers } from 'ethers'

const Arrow = styled(ArrowDownIcon, {
  color: '$mauve6',
})

// TODO: Add error messages toasts here
export default function Crowdsale({ info }) {
  const router = useRouter()
  const { dao, chainId } = router.query
  const { data: purchaseTokenSymbol, isLoading } = useContractRead(
    {
      addressOrName: info ? info['crowdsale']['purchaseToken'] : AddressZero,
      contractInterface: erc20ABI,
    },
    'symbol',
    {
      chainId: Number(chainId),
    },
  )
  const [amount, setAmount] = useState(0)
  const willPurchase = amount * info['crowdsale']['purchaseMultiplier']

  console.log('personalLimit', ethers.utils.parseEther(info['crowdsale']['personalLimit']))
  return (
    <Flex
      dir="col"
      gap="md"
      css={{
        width: '20rem',
        height: 'auto',
        justifyContent: 'center',
        background: '$mauve2',
        border: '1px solid $mauve6',
        borderRadius: '20px',
        padding: '1rem',
      }}
    >
      <Header info={info} />
      <Flex
        dir="col"
        css={{
          alignItems: 'center',
        }}
      >
        <Flex
          css={{
            width: '18rem',
            flexDirection: 'column',
            background: '$mauve3',
            border: '1px solid $mauve6',
            borderRadius: '20px',
            padding: '1rem',
          }}
        >
          <Flex
            css={{
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Input
              name="amount"
              type="number"
              min={0}
              max={ethers.utils.formatUnits(info['crowdsale']['personalLimit'])}
              defaultValue={amount}
              placeholder="0.0"
              onChange={(e) => setAmount(e.target.value)}
              css={{
                all: 'unset',
                color: '$mauve12',
                '&:hover': {
                  background: 'none',
                  border: 'none',
                },
                '&:focus': {
                  background: 'none',
                  border: 'none',
                },
              }}
            />
            <Text>{purchaseTokenSymbol}</Text>
          </Flex>
        </Flex>
        <Arrow />
        <Flex
          css={{
            width: '18rem',
            flexDirection: 'column',
            background: '$mauve3',
            border: '1px solid $mauve6',
            borderRadius: '20px',
            padding: '1rem',
          }}
        >
          <Flex
            css={{
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Text
              css={{
                color: '$mauve11',
              }}
            >
              {willPurchase}
            </Text>
            <Text>{info?.token?.symbol}</Text>
          </Flex>
        </Flex>
      </Flex>
      <Buy info={info} dao={dao} amount={amount} chainId={chainId} />
    </Flex>
  )
}
