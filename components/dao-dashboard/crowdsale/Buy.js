import { useSigner, erc20ABI, useContract, useContractRead, useContractWrite } from 'wagmi'
import { Button } from '../../../styles/elements'
import { addresses } from '../../../constants/addresses'
import CROWDSALE_ABI from '../../../abi/KaliDAOcrowdsaleV2.json'
import { ethers } from 'ethers'

const Buy = ({ dao, symbol, decimals, amount, chainId, buttonText, shouldDisable, setSuccess, setTx }) => {
  const { data: signer } = useSigner()

  const crowdsale = useContract({
    addressOrName: addresses[chainId].extensions.crowdsale2,
    contractInterface: CROWDSALE_ABI,
    signerOrProvider: signer,
  })

  const buy = async () => {
    console.log(dao, amount, decimals)

    if (!dao || !amount || !decimals) return

    amount = amount.toString()
    if (symbol === 'ETH') {
      try {
        const res = crowdsale.callExtension(dao, ethers.utils.parseEther(amount))
      } catch (e) {
        console.log(e)
      }
    } else {
      try {
        const res = crowdsale.callExtension(dao, ethers.utils.parseUnits(amount, decimals))
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
