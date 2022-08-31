import { useRouter } from 'next/router'
import { erc20ABI, useContractRead, useContract, useSigner, useAccount } from 'wagmi'
import { fetchCrowdsaleDataHash, fetchCrowdsaleTermsHash, fetchCrowdsaleReceiptHash } from '../../tools/ipfsHelpers'
import { Flex, Text, Button } from '../../../styles/elements'
import { styled } from '../../../styles/stitches.config'
import Buy from './Buy'
import Approve from './Approve'
import DAO_ABI from '../../../abi/KaliDAO.json'
import { useEffect, useState } from 'react'
import { Input } from '../../../styles/form-elements'
import { ArrowDownIcon } from '@radix-ui/react-icons'
import Header from './Header'
import { AddressZero } from '@ethersproject/constants'
import { ethers } from 'ethers'
import { addresses } from '../../../constants/addresses'

const Arrow = styled(ArrowDownIcon, {
  color: '$mauve6',
})

// TODO: Add error messages toasts here
export default function Crowdsale({ info }) {
  const router = useRouter()
  const { dao, chainId } = router.query
  const { data: account } = useAccount()
  const { data: signer } = useSigner()

  const [crowdsale, setCrowdsale] = useState({})
  const [background, setBackground] = useState('')
  const [clickedTerms, setClickedTerms] = useState(null)
  const [success, setSuccess] = useState(false)
  const [tx, setTx] = useState(null)

  const { data: purchaseTokenSymbol } = useContractRead(
    {
      addressOrName: info ? info['crowdsale']['purchaseToken'] : AddressZero,
      contractInterface: erc20ABI,
    },
    'symbol',
    {
      chainId: Number(chainId),
    },
  )

  const { data: decimals } = useContractRead(
    {
      addressOrName: info ? info['crowdsale']['purchaseToken'] : AddressZero,
      contractInterface: erc20ABI,
    },
    'decimals',
    {
      chainId: Number(chainId),
    },
  )

  const symbol =
    info?.crowdsale?.purchaseToken === '0x0000000000000000000000000000000000000000' ||
    info?.crowdsale?.purchaseToken.toLowerCase() === '0x000000000000000000000000000000000000dead'
      ? 'ETH'
      : purchaseTokenSymbol
  const [amount, setAmount] = useState(0)
  const willPurchase = amount * info['crowdsale']['purchaseMultiplier']
  const [shouldApprove, setShouldApprove] = useState(null)
  const [canPurchase, setCanPurchase] = useState(false)

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
        setShouldApprove(true)
        setCanPurchase(false)
      } else {
        setShouldApprove(false)
        setCanPurchase(true)
      }
    } catch (e) {
      console.log(e)
    }
  }

  const handleAmount = (_amount) => {
    setAmount(_amount)

    if (_amount === 0) {
      setCanPurchase(false)
      setShouldApprove(false)
    }

    if (symbol != 'ETH') {
      checkAllowance()
    }

    setCanPurchase(true)
  }

  useEffect(() => {
    const getCrowdsaleData = async () => {
      const data = await fetchCrowdsaleDataHash(dao)
      const response = await fetch(data)
      const responseJson = await response.json()
      setCrowdsale(responseJson)

      try {
        const _background = responseJson.background ? responseJson.background.content[0].content[0].text : ''
        setBackground(_background)
      } catch (e) {
        console.log(e)
        setBackground('Pick an amount to contribute:')
      }
    }

    getCrowdsaleData()
  }, [])

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
      {background && <Text>{background}</Text>}
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
              onChange={(e) => handleAmount(e.target.value)}
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
            <Text>{symbol}</Text>
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
      {shouldApprove && (
        <Approve info={info} dao={dao} amount={amount} chainId={chainId} purchaseTokenSymbol={purchaseTokenSymbol} />
      )}
      {crowdsale.terms && crowdsale.terms != 'none' && (
        <Flex dir="row" gap="md">
          <Input
            type={'checkbox'}
            variant="checkbox"
            value={clickedTerms}
            onChange={() => setClickedTerms(!clickedTerms)}
          />
          <Text>
            I agree to the <a href={'https://ipfs.io/ipfs/' + crowdsale.terms}>contribution terms</a>{' '}
          </Text>
        </Flex>
      )}

      {canPurchase || (crowdsale.terms != 'none' && clickedTerms) ? (
        <Buy
          dao={dao}
          symbol={symbol}
          decimals={decimals ? decimals : 18}
          amount={amount}
          chainId={chainId}
          buttonText={`Contribute ${symbol}`}
          shouldDisable={false}
          setSuccess={setSuccess}
          setTx={setTx}
        />
      ) : (
        <Buy
          dao={dao}
          symbol={symbol}
          decimals={decimals ? decimals : 18}
          amount={amount}
          chainId={chainId}
          buttonText={`Contribute ${symbol}`}
          shouldDisable={true}
          setSuccess={setSuccess}
          setTx={setTx}
        />
      )}
      {success && tx && (
        <Flex>
          <Text>
            <a
              href={crowdsale.receipt == 'none' ? null : 'https://ipfs.io/ipfs/' + crowdsale.receipt}
              target="_blank"
              rel="noreferrer noopener"
            >
              {crowdsale.receiptMessage ? crowdsale.receiptMessage : 'Thank you~.'}
            </a>{' '}
            (
            <a href={addresses[chainId]['blockExplorer'] + '/tx/' + tx} target="_blank" rel="noreferrer noopener">
              Link
            </a>
            ){' '}
          </Text>
        </Flex>
      )}
    </Flex>
  )
}
