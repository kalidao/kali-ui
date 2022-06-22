import { erc20ABI, useContract, useContractWrite, useAccount, useSigner } from 'wagmi'
import { Button } from '../../../styles/elements'

import { addresses } from '../../../constants/addresses'
import { AddressZero } from '@ethersproject/constants'
import CROWDSALE_ABI from '../../../abi/KaliDAOcrowdsaleV2.json'
import { ethers } from 'ethers'

const Buy = ({ info, dao, amount, chainId }) => {
  const { data, isError, isLoading, writeAsync } = useContractWrite(
    {
      addressOrName: addresses[chainId].extensions.crowdsale2,
      contractInterface: CROWDSALE_ABI,
    },
    'callExtension',
  )
  const { data: account } = useAccount()
  const { data: signer } = useSigner()
  const erc20 = useContract({
    addressOrName: info ? info?.crowdsale?.purchaseToken : AddressZero,
    contractInterface: erc20ABI,
    signerOrProvider: signer,
  })

  const checkAllowance = async () => {
    try {
      const allowance = await erc20.allowance(account?.address, addresses[chainId].extensions.crowdsale2)
      console.log('allowance amount', ethers.utils.formatEther(allowance))

      if (ethers.utils.formatEther(allowance) == '0.0') {
        return false
      } else {
        return true
      }
    } catch (e) {
      console.log(e)
    }
  }

  const buy = async () => {
    if (!dao || !amount || info?.crowdsale?.purchaseToken === AddressZero) return
    if (info?.crowdsale?.purchaseToken === '0x000000000000000000000000000000000000dead') {
      try {
        const res = writeAsync({
          args: [dao, ethers.utils.parseEther(amount)],
          overrides: {
            value: ethers.utils.parseEther(amount),
            gasLimit: 1050000,
          },
        })
      } catch (e) {
        console.log(e)
      }
    } else {
      try {
        const allowance = await checkAllowance()
        console.log('allowance', allowance)
        if (allowance !== undefined && allowance === false) {
          try {
            const approve = await erc20.approve(
              addresses[chainId].extensions.crowdsale2,
              ethers.utils.parseEther(info?.crowdsale?.personalLimit),
            )
            try {
              const res = writeAsync({
                args: [dao, ethers.utils.parseEther(amount)],
                overrides: {
                  gasLimit: 1050000,
                },
              })
            } catch (e) {
              console.log(e)
            }
          } catch (e) {
            console.log(e)
          }
        }

        if (allowance !== undefined && allowance === true) {
          try {
            const res = writeAsync({
              args: [dao, ethers.utils.parseEther(amount)],
              overrides: {
                gasLimit: 1050000,
              },
            })
          } catch (e) {
            console.log(e)
          }
        }
      } catch (e) {
        console.log(e)
      }
    }
  }
  return (
    <Button
      onClick={buy}
      css={{
        fontFamily: 'Regular',
        fontWeight: '800',
        padding: '6px 10px',
        color: '$mauve12',
        background: '$violet8',

        '&:hover': {
          background: '$violet7',
        },
      }}
    >
      Buy Tokens
    </Button>
  )
}

export default Buy
