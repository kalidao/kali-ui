import { useContractWrite } from 'wagmi'
import { Button } from '../../../styles/elements'

import { addresses } from '../../../constants/addresses'
import CROWDSALE_ABI from '../../../abi/KaliDAOcrowdsaleV2.json'
import { ethers } from 'ethers'

const Buy = ({ info, dao, amount, chainId, text, shouldDisable }) => {
  const { writeAsync } = useContractWrite(
    {
      addressOrName: addresses[chainId].extensions.crowdsale2,
      contractInterface: CROWDSALE_ABI,
    },
    'callExtension',
  )

  const buy = async () => {
    if (!dao || !amount) return

    amount = amount.toString()
    if (
      info?.crowdsale?.purchaseToken === '0x0000000000000000000000000000000000000000' ||
      info?.crowdsale?.purchaseToken === '0x000000000000000000000000000000000000dead'
    ) {
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
  }
  return (
    <Button
      disabled={shouldDisable}
      onClick={buy}
      css={{
        fontFamily: 'Regular',
        fontWeight: '800',
        padding: '6px 10px',
        color: '$mauve12',
        background: '$violet8',
        border: '1px solid $mauve7',

        '&:hover': {
          background: '$violet7',
        },
      }}
    >
      {text}
    </Button>
  )
}

export default Buy
