import { useRouter } from 'next/router'
import { erc20ABI, useContractRead, useContract, useSigner, useAccount } from 'wagmi'
import { Flex, Text, Button } from '../../../styles/elements'
import { styled } from '../../../styles/stitches.config'
import Buy from './Buy'
import Approve from './Approve'
import ACCESS_ABI from '../../../abi/KaliAccessManagerV2.json'
import { useEffect, useState } from 'react'
import { Input } from '../../../styles/form-elements'
import { ArrowDownIcon } from '@radix-ui/react-icons'
import { AddressZero } from '@ethersproject/constants'
import { ethers } from 'ethers'
import { addresses } from '../../../constants/addresses'
import Info from './Info'
import Background from './Background'
import History from './History'

const Arrow = styled(ArrowDownIcon, {
  color: 'White',
})

export default function Crowdsale({ info }) {
  const router = useRouter()
  const { dao, chainId } = router.query
  const { data: account } = useAccount()
  const { data: signer } = useSigner()

  // Contract interaction
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

  const erc20 = useContract({
    addressOrName: info ? info?.crowdsale?.purchaseToken : AddressZero,
    contractInterface: erc20ABI,
    signerOrProvider: signer,
  })

  const accessManager = useContract({
    addressOrName: addresses[chainId]['access2'],
    contractInterface: ACCESS_ABI,
    signerOrProvider: signer,
  })

  // Crowdsale data
  let type
  const isActive = info?.crowdsale?.active
  const isExpired = info?.crowdsale?.saleEnds * 1000 > Date.now() ? true : false
  const terms = info?.crowdsale?.details
  const symbol =
    info?.crowdsale?.purchaseToken === '0x0000000000000000000000000000000000000000' ||
    info?.crowdsale?.purchaseToken.toLowerCase() === '0x000000000000000000000000000000000000dead'
      ? 'ETH'
      : purchaseTokenSymbol
  const personalLimit = ethers.utils.formatEther(info?.crowdsale?.personalLimit)
  const purchaseLimit = ethers.utils.formatEther(info?.crowdsale?.purchaseLimit)

  // States
  const [clickedTerms, setClickedTerms] = useState(null)
  const [warning, setWarning] = useState(null)
  const [success, setSuccess] = useState(false)
  const [tx, setTx] = useState(null)
  const [amountToContribute, setAmountToContribute] = useState(0)
  const [amountToReceive, setAmountToReceive] = useState(0)
  const [shouldApprove, setShouldApprove] = useState(null)
  const [canPurchase, setCanPurchase] = useState(false)
  const [isEligible, setIsEligible] = useState(false)
  const [totalDistributed, setTotalDistributed] = useState(0)

  // Helper functions
  const checkAllowance = async () => {
    try {
      const allowance = await erc20.allowance(account?.address, addresses[chainId].extensions.crowdsale2)
      // console.log('allowance amount', ethers.utils.formatEther(allowance))

      if (ethers.utils.formatEther(allowance) == '0.0') {
        setShouldApprove(true)
      } else {
        setShouldApprove(false)
      }
    } catch (e) {
      console.log(e)
    }
  }

  const handleAmount = async (_amountToContribute) => {
    let _canPurchase
    const _amountToReceive = _amountToContribute * info['crowdsale']['purchaseMultiplier']

    setAmountToContribute(_amountToContribute)
    setAmountToReceive(_amountToReceive)

    if (symbol != 'ETH') {
      checkAllowance()
    }

    if (_amountToReceive > Number(personalLimit)) {
      _canPurchase = false
      setWarning('Max contribution reached')
    } else {
      setWarning('')
      _canPurchase = true
    }

    if (_amountToReceive + totalDistributed > Number(purchaseLimit)) {
      _canPurchase = false
      setWarning('Max contribution reached')
    } else {
      setWarning('')
      _canPurchase = true
    }

    if (_amountToReceive == 0) {
      _canPurchase = false
    }

    setCanPurchase(_canPurchase)
  }

  // Check access lists
  useEffect(() => {
    const getEligibilty = async () => {
      let eligibility
      try {
        switch (info?.crowdsale?.listId) {
          case '0':
            type = 'Public'
            setIsEligible(true)
            break
          case '1':
            type = 'Accredited Investors'
            eligibility = await accessManager.balanceOf(account.address, 1)
            if (Number(ethers.utils.formatEther(eligibility)) > 0) {
              setIsEligible(true)
            } else {
              setIsEligible(false)
            }
            break
          default:
            type = 'Private'
            eligibility = await accessManager.balanceOf(account.address, Number(info?.crowdsale?.listId))
            if (Number(ethers.utils.formatEther(eligibility)) > 0) {
              setIsEligible(true)
            } else {
              setIsEligible(false)
            }
            break
        }
      } catch (e) {
        console.log(e)
      }
    }

    getEligibilty()
  }, [])

  // Check total purchase limit
  useEffect(() => {
    const getPastPurchasers = () => {
      const contributors = info?.crowdsale?.purchase
      let _totalDistributed = 0

      for (let i = 0; i < contributors.length; i++) {
        const contribution = Number(ethers.utils.formatEther(contributors[i].purchased))
        _totalDistributed = contribution + _totalDistributed
        setTotalDistributed(_totalDistributed)
      }
    }

    getPastPurchasers()
  }, [])

  return (
    <>
      {isActive && isExpired && isEligible ? (
        <Flex
          gap="lg"
          css={{
            width: '100%',
            margin: '1rem',
            marginTop: '1.2rem',
          }}
        >
          <Flex
            dir="col"
            gap="lg"
            css={{
              width: '50%',
              // background: 'Blue',
              borderRadius: '10px',
            }}
          >
            <Flex
              dir="col"
              gap="md"
              css={{
                // background: 'Blue',
                width: '100%',
                height: 'auto',
              }}
            >
              <Text variant="subheading">Contribute to {info['token']['name']}</Text>
              <Text>
                Enter an amount to swap {symbol} for {info?.token?.symbol} tokens
              </Text>
              <Flex
                dir="col"
                css={{
                  width: '100%',
                  // background: 'red',
                  alignItems: 'center',
                }}
              >
                <Flex
                  css={{
                    width: '100%',
                    height: '100%',
                    alignItems: 'center',
                    background: '$gray7',
                    borderRadius: '10px',
                    paddingTop: '1rem',
                    paddingBottom: '1rem',
                    margin: '1rem',
                  }}
                >
                  <Flex
                    css={{
                      width: '20%',
                      height: '100%',
                      alignItems: 'center',
                    }}
                  ></Flex>
                  <Flex
                    css={{
                      width: '50%',
                    }}
                  >
                    <Input
                      name="amount"
                      type="number"
                      min={0}
                      max={
                        ethers.utils.formatUnits(info['crowdsale']['personalLimit']) /
                        info['crowdsale']['purchaseMultiplier']
                      }
                      defaultValue="0.0"
                      onChange={(e) => handleAmount(e.target.value)}
                      css={{
                        fontSize: '1.5em',
                        width: '100%',
                        color: '$mauve12',
                        // background: 'Purple',
                        border: 'none',
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
                  </Flex>
                  <Text
                    css={{
                      width: '25%',
                      fontSize: '1.5rem',
                      // background: 'Purple',
                      alignItems: 'center',
                    }}
                  >
                    {symbol}
                  </Text>
                </Flex>
                <Flex>
                  <Arrow />
                </Flex>
                <Flex
                  css={{
                    width: '100%',
                    height: '100%',
                    alignItems: 'center',
                    background: '$gray7',
                    borderRadius: '10px',
                    paddingTop: '1rem',
                    paddingBottom: '1rem',
                    margin: '1rem',
                  }}
                >
                  <Flex
                    css={{
                      width: '20%',
                      height: '100%',
                      // background: 'Red',
                      alignItems: 'center',
                    }}
                  ></Flex>
                  <Flex
                    css={{
                      width: '50%',
                      // background: 'Red',
                    }}
                  >
                    <Input
                      name="amount"
                      type="number"
                      disabled={true}
                      min={0}
                      max={ethers.utils.formatUnits(info['crowdsale']['personalLimit'])}
                      value={amountToReceive}
                      defaultValue="0.0"
                      css={{
                        fontSize: '1.5em',
                        width: '100%',
                        color: '$mauve12',
                        // background: 'Purple',
                        border: 'none',
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
                  </Flex>
                  <Text
                    css={{
                      fontSize: '1.5em',
                      width: '25%',
                      // background: 'Yellow',
                    }}
                  >
                    {info?.token?.symbol}
                  </Text>
                </Flex>
                {terms && terms != 'none' && (
                  <Flex dir="row" css={{ paddingTop: '1rem', paddingBottom: '1rem', alignItems: 'center' }}>
                    <Input
                      type={'checkbox'}
                      variant="checkbox"
                      value={clickedTerms}
                      onChange={() => setClickedTerms(!clickedTerms)}
                    />
                    <Text>
                      I agree to the{' '}
                      <Text
                        as="a"
                        href={'https://ipfs.io/ipfs/' + terms}
                        target="_blank"
                        css={{
                          color: '$amber11',
                        }}
                      >
                        contribution terms
                      </Text>
                    </Text>
                  </Flex>
                )}
                {shouldApprove && (
                  <Approve
                    info={info}
                    dao={dao}
                    amount={amountToContribute}
                    chainId={chainId}
                    purchaseTokenSymbol={purchaseTokenSymbol}
                  />
                )}
                <Flex
                  css={{
                    width: '100%',
                    paddingTop: '1rem',
                    paddingBottom: '1rem',
                  }}
                >
                  {canPurchase && !shouldApprove && terms != 'none' && clickedTerms ? (
                    <Buy
                      dao={dao}
                      symbol={symbol}
                      decimals={decimals ? decimals : 18}
                      amount={amountToContribute}
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
                      amount={amountToContribute}
                      chainId={chainId}
                      buttonText={`Contribute ${symbol}`}
                      shouldDisable={true}
                      setSuccess={setSuccess}
                      setTx={setTx}
                    />
                  )}
                </Flex>
              </Flex>
              {success && tx && (
                <Flex>
                  <Text
                    as="a"
                    href={addresses[chainId]['blockExplorer'] + '/tx/' + tx}
                    target="_blank"
                    css={{
                      fontFamily: 'Regular',
                      color: '$amber11',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'flex-start',
                      gap: '0.2rem',
                    }}
                  >
                    Etherscan
                  </Text>
                </Flex>
              )}
              {warning && (
                <Flex css={{ justifyContent: 'center' }}>
                  <Text variant="warning">{warning}</Text>
                </Flex>
              )}
            </Flex>
          </Flex>
          <Flex
            dir="col"
            gap="lg"
            css={{
              width: '40%',
            }}
          >
            <Flex dir="col" gap="md">
              <Info info={info} />
              <Flex></Flex>
              <Flex></Flex>
              <Background />
              <Flex></Flex>
              <Flex></Flex>
              <History info={info} symbol={symbol} />
            </Flex>
          </Flex>
        </Flex>
      ) : (
        <Flex
          dir="col"
          gap="md"
          css={{
            width: '100%',
            margin: '1rem',
            marginTop: '3rem',
            alignItems: 'center',
          }}
        >
          <Text variant="warning">🤔 Your account is ineligible to contribute</Text>
          <Text variant="warning">Please contact KaliDAO members for more</Text>
        </Flex>
      )}
    </>
  )
}
