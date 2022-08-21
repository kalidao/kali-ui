import { erc20ABI, useContractRead, useContractWrite } from 'wagmi'
import { Button } from '../../../styles/elements'
import { addresses } from '../../../constants/addresses'
import CROWDSALE_ABI from '../../../abi/KaliDAOcrowdsaleV2.json'
import { ethers } from 'ethers'

const Buy = ({ dao, symbol, decimals, amount, chainId, buttonText, shouldDisable }) => {
  const { writeAsync: callExtension } = useContractWrite(
    {
      addressOrName: addresses[chainId].extensions.crowdsale2,
      contractInterface: CROWDSALE_ABI,
    },
    'callExtension',
  )

  const buy = async () => {
    console.log(dao, amount, decimals)

    if (!dao || !amount || !decimals) return

    amount = amount.toString()
    if (symbol === 'ETH') {
      try {
        const res = callExtension({
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
        const res = callExtension({
          args: [dao, ethers.utils.parseUnits(amount, decimals)],
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
      {buttonText}
    </Button>
  )
}

export default Buy
