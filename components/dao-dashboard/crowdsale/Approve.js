import { erc20ABI, useContract, useContractWrite, useAccount, useSigner } from 'wagmi'
import { Button } from '../../../styles/elements'

import { addresses } from '../../../constants/addresses'
import { AddressZero } from '@ethersproject/constants'
import { ethers } from 'ethers'

const Approve = ({ info, dao, amount, chainId, purchaseTokenSymbol }) => {
  const { writeAsync } = useContractWrite(
    {
      addressOrName: info ? info?.crowdsale?.purchaseToken : AddressZero,
      contractInterface: erc20ABI,
    },
    'approve',
    {
      args: [addresses[chainId].extensions.crowdsale2, ethers.utils.parseEther(info?.crowdsale?.personalLimit)],
    },
  )
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
    <Button
      variant="primary"
      onClick={approve}
      css={{
        width: '100%',
        fontFamily: 'Regular',
        fontWeight: '800',
        // padding: '1rem',
        paddingTop: '1rem',
        paddingBottom: '1rem',
        border: '2px solid $gray4',
        borderRadius: '10px',
        // color: '$mauve12',
        // background: '$violet8',

        '&:hover': {
          background: '$gray12',
        },
      }}
    >
      Allow KALI to use your {purchaseTokenSymbol}
    </Button>
  )
}

export default Approve
