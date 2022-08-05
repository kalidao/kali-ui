import { erc20ABI, useContract, useContractWrite, usePrepareContractWrite, useAccount, useSigner } from 'wagmi'
import { Button } from '../../../styles/elements'

import { addresses } from '../../../constants/addresses'
import { AddressZero } from '@ethersproject/constants'
import { ethers } from 'ethers'

const Approve = ({ info, dao, amount, chainId, purchaseTokenSymbol }) => {
  const { config, error } = usePrepareContractWrite({
      addressOrName: info ? info?.crowdsale?.purchaseToken : AddressZero,
      contractInterface: erc20ABI,
      chainId,
      functionName: 'approve',
      args: [addresses[chainId].extensions.crowdsale2, ethers.utils.parseEther(info?.crowdsale?.personalLimit)],
      cacheTime: 2_000,
  })
  const { writeAsync } = useContractWrite(config)
  const { data: account } = useAccount()
  const { data: signer } = useSigner()
  const erc20 = useContract({
    addressOrName: info ? info?.crowdsale?.purchaseToken : AddressZero,
    contractInterface: erc20ABI,
    signerOrProvider: signer,
  })

  const approve = async () => {
    if (!dao || !amount) return

    try {
      const tx = await writeAsync({
        args: [addresses[chainId].extensions.crowdsale2, ethers.utils.parseEther('1000000000000000000')],
        overrides: {
          gasLimit: 100000,
        },
      })
      console.log(tx)
    } catch (e) {
      console.log(e)
    }
  }
  return (
    <>
      <Button
        disabled={!writeAsync}
        onClick={approve}
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
        Allow KALI to use your {purchaseTokenSymbol}
      </Button>
      {error && (
        <div>An error occurred preparing the transaction: {error.message}</div>
      )}
    </>
  )
}

export default Approve
