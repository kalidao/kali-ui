import { erc20ABI, useContract, useContractWrite, usePrepareContractWrite, useAccount, useSigner } from 'wagmi'
import { Flex, Text, Button } from '../../../styles/elements'

import { addresses } from '../../../constants/addresses'
import { AddressZero } from '@ethersproject/constants'
import { ethers } from 'ethers'

const Approve = ({ info, dao, crowdsale, amount, chainId, symbol }) => {
  const { config, error } = usePrepareContractWrite({
    addressOrName: crowdsale.purchaseAsset,
    contractInterface: erc20ABI,
    chainId,
    functionName: 'approve',
    args: [addresses[chainId].extensions.crowdsale2, ethers.utils.parseEther('1000000000000000000')],
    cacheTime: 2_000,
  })
  const { writeAsync: approve, isSuccess } = useContractWrite(config)
  console.log(crowdsale.purchaseAsset)

  const approveToken = async () => {
    if (!dao || !amount) return

    try {
      approve()
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <Flex
      dir="col"
      gap="md"
      css={{
        width: '100%',
        alignItems: 'center',
      }}
    >
      <Button
        disabled={!approve}
        onClick={approveToken}
        css={{
          width: '100%',
          height: '3rem',
          fontFamily: 'Regular',
          fontWeight: '800',
          border: '2px solid $gray4',
          borderRadius: '10px',
          '&:hover': {
            color: 'Black',
            background: '$gray12',
          },
          '&:active': {
            transform: 'translate(1px, 1px)',
          },
        }}
      >
        Allow KALI to use your {symbol.toUpperCase()}
      </Button>
      {isSuccess && (
        <Flex dir="col" gap="sm">
          <Text variant="warning">{symbol.toUpperCase()} has been approved. Please refresh this page.</Text>
        </Flex>
      )}
      {error && <Text variant="warning">An error occurred preparing the transaction: {error.message}</Text>}
    </Flex>
  )
}

export default Approve
