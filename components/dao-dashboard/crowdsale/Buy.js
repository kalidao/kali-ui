import { erc20ABI, useContractRead, useContractWrite } from 'wagmi'
import { Button } from '../../../styles/elements'
import { addresses } from '../../../constants/addresses'
import CROWDSALE_ABI from '../../../abi/KaliDAOcrowdsaleV2.json'
import { ethers } from 'ethers'

const Buy = ({ dao, symbol, decimals, amount, chainId, buttonText, shouldDisable, setSuccess, setTx }) => {
  const { writeAsync: callExtension } = useContractWrite(
    {
      addressOrName: addresses[chainId].extensions.crowdsale2,
      contractInterface: CROWDSALE_ABI,
    },
    'callExtension',
    {
      onSuccess(data) {
        setSuccess(true)
        setTx(data.hash)
      },
      onError(data) {
        console.log(data)
      },
    },
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
      // variant="cta"
      disabled={shouldDisable}
      onClick={buy}
      css={{
        width: '100%',
        height: '3rem',
        fontFamily: 'Regular',
        fontWeight: '800',
        border: '2px solid $gray4',
        borderRadius: '10px',
        '&:hover': {
          color: shouldDisable ? '$none' : 'Black',
          background: shouldDisable ? 'none' : '$gray12',
        },
      }}
    >
      {buttonText}
    </Button>
  )
}

export default Buy
