import { useRouter } from 'next/router'
import { erc20ABI, useContractRead, useContract, useSigner, useAccount, useBalance } from 'wagmi'
import { Flex, Text, Button } from '../../../styles/elements'
import { styled } from '../../../styles/stitches.config'
import Swap from './Swap'
import Approve from './Approve'
import DAO_ABI from '../../../abi/KaliDAO.json'
import CROWDSALE_ABI from '../../../abi/KaliDAOcrowdsaleV2.json'
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
import { fetchPurchasers } from './fetchPurchasers'

const Arrow = styled(ArrowDownIcon, {
  color: 'White',
})
export default function Crowdsale({ info }) {
  const router = useRouter()
  const { dao, chainId } = router.query
  const { address } = useAccount()
  const { data: signer } = useSigner()

  const { data: ethBalance } = useBalance({
    addressOrName: address,
  })

  // Contract interaction
  const { data: crowdsale } = useContractRead({
    addressOrName: addresses[chainId].extensions.crowdsale2,
    contractInterface: CROWDSALE_ABI,
    functionName: 'crowdsales',
    args: [dao],
    chainId: Number(chainId),
  })

  const { data: purchaseTokenSymbol } = useContractRead({
    addressOrName: crowdsale ? crowdsale.purchaseAsset : AddressZero,
    contractInterface: erc20ABI,
    functionName: 'symbol',
    chainId: Number(chainId),
  })

  const { data: purchaseTokenBalance } = useContractRead({
    addressOrName: crowdsale ? crowdsale.purchaseAsset : AddressZero,
    contractInterface: erc20ABI,
    functionName: 'balanceOf',
    args: [address],
    chainId: Number(chainId),
  })

  const { data: decimals } = useContractRead({
    addressOrName: crowdsale ? crowdsale.purchaseAsset : AddressZero,
    contractInterface: erc20ABI,
    functionName: 'decimals',
    chainId: Number(chainId),
  })

  const erc20 = useContract({
    addressOrName: crowdsale ? crowdsale.purchaseAsset : AddressZero,
    contractInterface: erc20ABI,
    signerOrProvider: signer,
  })

  const accessManager = useContract({
    addressOrName: addresses[chainId]['access2'],
    contractInterface: ACCESS_ABI,
    signerOrProvider: signer,
  })

  const { data: accountPurchased } = useContractRead({
    addressOrName: addresses[chainId].extensions.crowdsale2,
    contractInterface: CROWDSALE_ABI,
    functionName: 'checkPersonalPurchased',
    args: [address, dao],
    chainId: Number(chainId),
  })

  // Crowdsale data
  let type
  // const isActive = info?.crowdsale?.active
  // const inProgress = info?.crowdsale?.saleEnds * 1000 > Date.now() ? true : false
  // const terms = info?.crowdsale?.details
  // const symbol =
  //   info?.crowdsale?.purchaseToken === '0x0000000000000000000000000000000000000000' ||
  //   info?.crowdsale?.purchaseToken.toLowerCase() === '0x000000000000000000000000000000000000dead'
  //     ? 'ETH'
  //     : purchaseTokenSymbol
  // const personalLimit = ethers.utils.formatEther(
  //   info?.crowdsale?.personalLimit ? info?.crowdsale?.personalLimit : '1000000000000000000',
  // )
  // const purchaseLimit = ethers.utils.formatEther(
  //   info?.crowdsale?.purchaseLimit ? info?.crowdsale?.purchaseLimit : '1000000000000000000',
  // )

  // States
  const [clickedTerms, setClickedTerms] = useState(false)
  const [warning, setWarning] = useState(null)
  const [amountToSwap, setAmountToSwap] = useState(0)
  const [amountToReceive, setAmountToReceive] = useState(0)
  const [shouldApprove, setShouldApprove] = useState(null)
  const [canPurchase, setCanPurchase] = useState(false)
  const [isEligible, setIsEligible] = useState(false)
  const [totalDistributed, setTotalDistributed] = useState(0)

  // Temp states
  const [tempSymbol, setTempSymbol] = useState(null)
  const [tempListId, setTempListId] = useState(null)
  const [tempPurchaseAsset, setTempPurchaseAsset] = useState(null)
  const [tempMultiplier, setTempMultiplier] = useState(0)
  const [tempPersonalLimit, setTempPersonalLimit] = useState(0)
  const [tempPurchaseLimit, setTempPurchaseLimit] = useState(0)
  const [tempPurchaseTotal, setTempPurchaseTotal] = useState(0)
  const [tempPurchaseDeadline, setTempPurchaseDeadline] = useState(null)
  const [tempPurchasers, setTempPurchasers] = useState([])
  const [tempInProgress, setTempInProgress] = useState(false)
  const [tempTerms, setTempTerms] = useState('')
  const [maxInput, setMaxInput] = useState(null)
  const [maxOutput, setMaxOutput] = useState(null)

  // Helper functions
  const checkAllowance = async () => {
    try {
      const allowance = await erc20.allowance(address, addresses[chainId].extensions.crowdsale2)
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

  const handleAmount = async (_amountToSwap) => {
    let _canPurchase
    let _amountToReceive

    if (decimals < 18) {
      _amountToReceive = _amountToSwap * Number(ethers.utils.formatUnits(crowdsale.purchaseMultiplier, 18 - decimals))
    } else {
      _amountToReceive = _amountToSwap * Number(ethers.utils.formatUnits(crowdsale.purchaseMultiplier, 'wei'))
    }

    setAmountToSwap(_amountToSwap)
    setAmountToReceive(_amountToReceive)

    if (tempSymbol != 'ETH') {
      checkAllowance()
    }

    if (_amountToReceive + totalDistributed > Number(ethers.utils.formatEther(crowdsale.purchaseLimit))) {
      _canPurchase = false
      setWarning('Max swap reached')
    } else {
      setWarning('')
      _canPurchase = true
    }

    if (
      _amountToReceive + Number(ethers.utils.formatEther(accountPurchased)) >
      Number(ethers.utils.formatEther(crowdsale.personalLimit))
    ) {
      _canPurchase = false
      setWarning('Max swap reached')
    } else {
      setWarning('')
      _canPurchase = true
    }

    if (_amountToReceive == 0) {
      _canPurchase = false
    }

    if (tempSymbol != 'ETH') {
      if (Number(_amountToSwap) > Number(ethers.utils.formatUnits(purchaseTokenBalance, decimals))) {
        setWarning('Insufficient token balance.')
        _canPurchase = false
      }
    } else {
      if (Number(_amountToSwap) > Number(ethBalance?.formatted)) {
        setWarning('Insufficient ETH balance.')
        _canPurchase = false
      }
    }

    setCanPurchase(_canPurchase)
  }

  // Check access lists
  useEffect(() => {
    const getEligibilty = async () => {
      let eligibility

      try {
        switch (Number(ethers.utils.formatEther(tempListId).toString())) {
          case 0:
            type = 'Public'
            setIsEligible(true)
            break
          case 1:
            type = 'Accredited Investors'

            eligibility = await accessManager.balanceOf(address, 1)
            if (Number(ethers.utils.formatEther(eligibility)) > 0) {
              setIsEligible(true)
              setWarning('')
            } else {
              setIsEligible(false)
              setWarning('🤔 Swap is available to accredited investors only')
            }
            break
          default:
            type = 'Private'
            try {
              eligibility = await accessManager.balanceOf(address, Number(crowdsale.listId))
            } catch (e) {
              console.log(e)
            }
            if (Number(ethers.utils.formatEther(eligibility)) > 0) {
              setIsEligible(true)
              setWarning('')
            } else {
              setIsEligible(false)
              setWarning('🤔 Swap is available to a select collective of addresses only')
            }
            break
        }
      } catch (e) {
        console.log(e)
      }
    }

    // console.log(info)
    getEligibilty()
  }, [tempListId])

  // Check total purchase limit
  useEffect(() => {
    const checkExpiry = () => {
      if (!tempInProgress) {
        setWarning(
          'Swap enables KaliDAOs to atomically swap KaliDAO tokens with ETH or ERC20s and to diversify their treasury holding. Add the  extension and get started!',
        )
      } else {
        setWarning('')
      }
    }

    checkExpiry()
  }, [tempInProgress])

  // Temp helper function to get crowdsale until subgraph is updated
  useEffect(() => {
    const extractCrowdsaleData = async () => {
      const symbol =
        crowdsale.purchaseAsset === '0x0000000000000000000000000000000000000000' ||
        crowdsale.purchaseAsset.toLowerCase() === '0x000000000000000000000000000000000000dead'
          ? 'ETH'
          : purchaseTokenSymbol
      setTempSymbol(symbol)

      const _inProgress = crowdsale.saleEnds * 1000 > Date.now() ? true : false

      console.log(accountPurchased)

      if (decimals < 18) {
        setMaxInput(
          Number(ethers.utils.formatEther(crowdsale.personalLimit)) /
            Number(ethers.utils.formatUnits(crowdsale.purchaseMultiplier, 18 - decimals)) -
            Number(ethers.utils.formatEther(accountPurchased)) /
              Number(ethers.utils.formatUnits(crowdsale.purchaseMultiplier, 18 - decimals)),
        )
      } else {
        setMaxInput(
          Number(ethers.utils.formatEther(crowdsale.personalLimit)) / crowdsale.purchaseMultiplier -
            Number(ethers.utils.formatEther(accountPurchased)) / crowdsale.purchaseMultiplier,
        )
      }

      setMaxOutput(
        Number(ethers.utils.formatEther(crowdsale.personalLimit)) - Number(ethers.utils.formatEther(accountPurchased)),
      )

      setTempInProgress(_inProgress)
      setTempListId(crowdsale.listId)
      setTempMultiplier(crowdsale.purchaseMultiplier)
      setTempPersonalLimit(crowdsale.personalLimit)
      setTempPurchaseLimit(crowdsale.purchaseLimit)
      setTempPurchaseTotal(crowdsale.purchaseTotal)
      setTempTerms(crowdsale.details)
      setTempPurchaseAsset(crowdsale.purchaseAsset)
      setTempPurchaseDeadline(crowdsale.saleEnds)
    }

    if (crowdsale) {
      extractCrowdsaleData()
    }
  }, [crowdsale])

  useEffect(() => {
    const getPurchasers = async () => {
      const data = await fetchPurchasers(dao, chainId)
      const purchasers = [...new Map(data._purchasers.map((p) => [p.purchaser, p])).values()]
      purchasers.sort((a, b) => b.purchased - a.purchased)
      // console.log(data._purchasers, purchasers)

      setTempPurchasers(purchasers)
      // setTotalDistributed(data._totalDistributed)
    }

    getPurchasers()
  }, [])

  // console.log(tempInProgress, isEligible)
  return (
    <>
      {tempInProgress && isEligible ? (
        <Flex
          gap="lg"
          css={{
            width: '100%',
            margin: '1rem',
            marginTop: '1.2rem',

            '@media (max-width: 640px)': {
              flexDirection: 'column',
              justifyContent: 'center',
            },
          }}
        >
          <Flex
            dir="col"
            gap="lg"
            css={{
              width: '45%',
              borderRadius: '10px',
              marginRight: '20px',

              '@media (max-width: 640px)': {
                width: '100%',
                justifyContent: 'center',
              },
            }}
          >
            <Flex
              dir="col"
              gap="md"
              css={{
                width: '100%',
                height: 'auto',

                '@media (max-width: 640px)': {
                  flexDirection: 'column',
                  justifyContent: 'center',
                },
              }}
            >
              <Text variant="subheading">Swap for KaliDAO Tokens</Text>
              <Text>Swap allows anyone to swap Ether or ERC20 tokens, e.g., DAI, for KaliDAO tokens.</Text>
              <Text>Enter an amount to swap for DAO tokens, {info?.token?.symbol.toUpperCase()}:</Text>
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
                    width: '80%',
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
                      max={maxInput}
                      defaultValue="0.0"
                      onChange={(e) => handleAmount(e.target.value)}
                      css={{
                        fontSize: '1.5em',
                        width: '100%',
                        color: '$mauve12',
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
                      alignItems: 'center',
                    }}
                  >
                    {tempSymbol}
                  </Text>
                </Flex>
                <Flex>
                  <Arrow />
                </Flex>
                <Flex
                  css={{
                    width: '80%',
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
                      disabled={true}
                      min={0}
                      max={maxOutput}
                      // max={ethers.utils.formatUnits(info['crowdsale']['personalLimit'])}
                      value={amountToReceive}
                      css={{
                        fontSize: '1.5em',
                        width: '100%',
                        color: '$mauve12',
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
                {tempTerms && tempTerms != 'none' && (
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
                        href={'https://ipfs.io/ipfs/' + tempTerms}
                        target="_blank"
                        css={{
                          color: '$amber11',
                        }}
                      >
                        terms for swapping
                      </Text>
                    </Text>
                  </Flex>
                )}
                {shouldApprove && (
                  <Flex
                    css={{
                      width: '80%',
                      paddingTop: '1rem',
                      // paddingBottom: '1rem',
                    }}
                  >
                    <Approve
                      info={info}
                      symbol={tempSymbol}
                      crowdsale={crowdsale}
                      dao={dao}
                      amount={amountToSwap}
                      chainId={chainId}
                    />
                  </Flex>
                )}
                <Flex
                  css={{
                    width: '80%',
                    paddingTop: '1rem',
                    paddingBottom: '1rem',
                  }}
                >
                  {canPurchase && !shouldApprove && (tempTerms == 'none' || (tempTerms != 'none' && clickedTerms)) ? (
                    <Swap
                      info={info}
                      dao={dao}
                      symbol={tempSymbol}
                      decimals={decimals ? decimals : 18}
                      amount={amountToSwap}
                      amountToReceive={amountToReceive}
                      chainId={chainId}
                      buttonText={`Swap ${tempSymbol} for ${info?.token?.symbol.toUpperCase()}`}
                      shouldDisable={false}
                    />
                  ) : (
                    <Swap
                      info={info}
                      dao={dao}
                      symbol={tempSymbol}
                      decimals={decimals ? decimals : 18}
                      amount={amountToSwap}
                      chainId={chainId}
                      buttonText={`Swap ${tempSymbol} for ${info?.token?.symbol.toUpperCase()}`}
                      shouldDisable={true}
                    />
                  )}
                </Flex>
              </Flex>
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

              '@media (max-width: 640px)': {
                width: '100%',
                justifyContent: 'center',
              },
            }}
          >
            <Flex dir="col" gap="md">
              <Info info={info} decimals={decimals} crowdsale={crowdsale} symbol={tempSymbol} />
              <Flex></Flex>
              <Flex></Flex>
              <Background />
              <Flex></Flex>
              <Flex></Flex>
              <History
                info={info}
                crowdsale={crowdsale}
                decimals={decimals}
                purchasers={tempPurchasers}
                symbol={tempSymbol}
              />
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
          {warning && (
            <Text variant="warning" css={{ width: '70%' }}>
              {warning}
            </Text>
          )}
          <Text variant="warning" css={{ width: '70%' }}>
            Hop into the KALI Discord to learn more about this Extension ✌️
          </Text>
        </Flex>
      )}
    </>
  )
}
