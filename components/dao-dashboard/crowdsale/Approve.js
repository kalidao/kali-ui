import { erc20ABI, useContract, useContractWrite, useAccount, useSigner } from 'wagmi'
import { Button } from '../../../styles/elements'

import { addresses } from '../../../constants/addresses'
import { AddressZero } from '@ethersproject/constants'
import { ethers } from 'ethers'

const Approve = ({ info, crowdsale, dao, amount, chainId, purchaseTokenSymbol }) => {
  const { writeAsync } = useContractWrite(
    {
      addressOrName: crowdsale.purchaseAsset,
      contractInterface: erc20ABI,
    },
    'approve',
  )
  const { data: account } = useAccount()
  const { data: signer } = useSigner()
  console.log(crowdsale.purchaseAsset)
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
      onClick={approve}
      // variant="cta"
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
      Allow KALI to use your {purchaseTokenSymbol}
    </Button>
  )
}

export default Approve
