import { useRouter } from 'next/router'
import { erc20ABI, useContractRead, useContract, useSigner, useAccount } from 'wagmi'
import { Flex, Text, Button } from '../../../styles/elements'
import { styled } from '../../../styles/stitches.config'
import Buy from './Buy'
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
  const { data: account } = useAccount()
  const { data: signer } = useSigner()

  // Contract interaction
  const { data: crowdsale } = useContractRead(
    {
      addressOrName: addresses[chainId].extensions.crowdsale2,
      contractInterface: CROWDSALE_ABI,
    },
    'crowdsales',
    {
      args: [dao],
      chainId: Number(chainId),
    },
  )

  const { data: purchaseTokenSymbol } = useContractRead(
    {
      addressOrName: crowdsale ? crowdsale.purchaseAsset : AddressZero,
      contractInterface: erc20ABI,
    },
    'symbol',
    {
      chainId: Number(chainId),
    },
  )

  const { data: decimals } = useContractRead(
    {
      addressOrName: crowdsale ? crowdsale.purchaseAsset : AddressZero,
      contractInterface: erc20ABI,
    },
    'decimals',
    {
      chainId: Number(chainId),
    },
  )

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

  const crowdsaleV2 = useContract({
    addressOrName: addresses[chainId]['extensions']['crowdsale2'],
    contractInterface: CROWDSALE_ABI,
    signerOrProvider: signer,
  })

  // const { data: crowdsalePurchasers } = useContractRead(
  //   {
  //     addressOrName: addresses[chainId]['extensions']['crowdsale2'],
  //     contractInterface: CROWDSALE_ABI,
  //   },
  //   'checkPurchasers',
  //   {
  //     args: [dao],
  //     chainId: Number(chainId),
  //   },
  // )
  const { data: accountPurchased } = useContractRead(
    {
      addressOrName: addresses[chainId]['extensions']['crowdsale2'],
      contractInterface: CROWDSALE_ABI,
    },
    'checkPersonalPurchased',
    {
      args: [account?.address, dao],
      chainId: Number(chainId),
    },
  )

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
  const [success, setSuccess] = useState(false)
  const [tx, setTx] = useState(null)
  const [amountToSwap, setAmountToSwap] = useState(0)
  const [amountToReceive, setAmountToReceive] = useState(0)
  const [shouldApprove, setShouldApprove] = useState(null)
  const [canPurchase, setCanPurchase] = useState(false)
  const [isEligible, setIsEligible] = useState(false)
  const [totalDistributed, setTotalDistributed] = useState(0)

  // Temp states
  // const symbol =
  //   crowdsale.purchaseAsset === '0x0000000000000000000000000000000000000000' ||
  //   crowdsale.purchaseAsset.toLowerCase() === '0x000000000000000000000000000000000000dead'
  //     ? 'ETH'
  //     : purchaseTokenSymbol
  const [tempSymbol, setTempSymbol] = useState(null)
  const [tempListId, setTempListId] = useState(0)
  const [tempPurchaseAsset, setTempPurchaseAsset] = useState(null)
  const [tempMultiplier, setTempMultiplier] = useState(0)
  const [tempPersonalLimit, setTempPersonalLimit] = useState(0)
  const [tempPurchaseLimit, setTempPurchaseLimit] = useState(0)
  const [tempPurchaseTotal, setTempPurchaseTotal] = useState(0)
  const [tempPurchaseDeadline, setTempPurchaseDeadline] = useState(null)
  const [tempPurchasers, setTempPurchasers] = useState([])
  const [tempInProgress, setTempInProgress] = useState(false)
  const [tempTerms, setTempTerms] = useState('')

  // Helper functions
  const checkAllowance = async () => {
    try {
      const allowance = await erc20.allowance(account?.address, addresses[chainId].extensions.crowdsale2)
      console.log('allowance amount', ethers.utils.formatEther(allowance))

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
    const _amountToReceive = _amountToSwap * crowdsale.purchaseMultiplier
    // const _amountToReceive = _amountToSwap * info['crowdsale']['purchaseMultiplier']

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

    setCanPurchase(_canPurchase)
  }

  // Check access lists
  useEffect(() => {
    const getEligibilty = async () => {
      let eligibility
      try {
        switch (Number(ethers.utils.formatEther(tempListId)).toString()) {
          case '0':
            type = 'Public'
            setIsEligible(true)
            break
          case '1':
            type = 'Accredited Investors'
            eligibility = await accessManager.balanceOf(account.address, 1)
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
            eligibility = await accessManager.balanceOf(account.address, Number(crowdsale.listId))
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
    // const getTotalDistributed = async () => {
    //   const purchasers = crowdsalePurchasers ? crowdsalePurchasers : []
    //   console.log(purchasers)
    //   let _purchasers = []
    //   let _totalDistributed = 0

    //   try {
    //     for (let i = 0; i < purchasers.length; i++) {
    //       const _purchaser = purchasers[i]
    //       const _swap = await crowdsaleV2.checkPersonalPurchased(_purchaser, dao)
    //       _totalDistributed = _totalDistributed + Number(ethers.utils.formatEther(_swap))

    //       _purchasers.push({
    //         purchaser: _purchaser,
    //         purchased: Number(ethers.utils.formatEther(_swap)),
    //       })
    //     }

    //     console.log(_purchasers)
    //     setTempPurchasers(_purchasers)
    //   } catch (e) {
    //     console.log(e)
    //   }
    //   // const contributors = info?.crowdsale?.purchase ? info?.crowdsale?.purchase : [{ purchaser: '', purchased: '0' }]
    //   // for (let id = 0; i < contributors.length; i++) {
    //   //   const swap = Number(ethers.utils.formatEther(contributors[i].purchased))
    //   //   _totalDistributed = swap + _totalDistributed
    //   //   setTotalDistributed(_totalDistributed)
    //   // }
    // }

    const checkExpiry = () => {
      if (!tempInProgress) {
        setWarning(
          'Swap enables KaliDAOs to atomically swap KaliDAO tokens with ETH or ERC20s and to diversify their treasury holding. Add the  extension and get started!',
        )
      } else {
        setWarning('')
      }
    }

    // getTotalDistributed()
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
  }, [])

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

  return (
    <>
      {tempInProgress && isEligible ? (
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
              width: '45%',
              // background: 'Blue',
              borderRadius: '10px',
              marginRight: '20px',
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
                      max={
                        Number(ethers.utils.formatEther(tempPersonalLimit)) / tempMultiplier -
                        Number(ethers.utils.formatEther(accountPurchased)) / tempMultiplier
                      }
                      // max={
                      //   ethers.utils.formatUnits(info['crowdsale']['personalLimit']) /
                      //   info['crowdsale']['purchaseMultiplier']
                      // }
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
                      max={
                        Number(ethers.utils.formatEther(tempPersonalLimit)) -
                        Number(ethers.utils.formatEther(accountPurchased))
                      }
                      // max={ethers.utils.formatUnits(info['crowdsale']['personalLimit'])}
                      value={amountToReceive}
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
                {tempTerms && tempTerms != 'none' && (
                  <Flex dir="row" css={{ paddingTop: '1rem', paddingBottom: '1rem', alignItems: 'center' }}>
                    <Input
                      type={'checkbox'}
                      variant="checkbox"
                      value={clickedTerms}
                      onChange={() => setClickedTerms(!clickedTerms)}
                      // onChange={(e) => handleClickwrap(e.target.value)}
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
                  <Approve
                    info={info}
                    crowdsale={crowdsale}
                    dao={dao}
                    amount={amountToSwap}
                    chainId={chainId}
                    purchaseTokenSymbol={purchaseTokenSymbol}
                  />
                )}
                <Flex
                  css={{
                    width: '80%',
                    paddingTop: '1rem',
                    paddingBottom: '1rem',
                  }}
                >
                  {/* {canPurchase && !shouldApprove && tempTerms == 'none' && (
                    <Buy
                      dao={dao}
                      symbol={tempSymbol}
                      decimals={decimals ? decimals : 18}
                      amount={amountToSwap}
                      chainId={chainId}
                      buttonText={`Swap ${tempSymbol} for ${info?.token?.symbol.toUpperCase()}`}
                      shouldDisable={false}
                      setSuccess={setSuccess}
                      setTx={setTx}
                    />
                  )} */}
                  {canPurchase && !shouldApprove && (tempTerms == 'none' || (tempTerms != 'none' && clickedTerms)) ? (
                    <Buy
                      dao={dao}
                      symbol={tempSymbol}
                      decimals={decimals ? decimals : 18}
                      amount={amountToSwap}
                      chainId={chainId}
                      buttonText={`Swap ${tempSymbol} for ${info?.token?.symbol.toUpperCase()}`}
                      shouldDisable={false}
                      setSuccess={setSuccess}
                      setTx={setTx}
                    />
                  ) : (
                    <Buy
                      dao={dao}
                      symbol={tempSymbol}
                      decimals={decimals ? decimals : 18}
                      amount={amountToSwap}
                      chainId={chainId}
                      buttonText={`Swap ${tempSymbol} for ${info?.token?.symbol.toUpperCase()}`}
                      shouldDisable={true}
                      setSuccess={setSuccess}
                      setTx={setTx}
                    />
                  )}
                </Flex>
              </Flex>
              {success && tx && (
                <Flex dir="col" gap="sm">
                  <Text>
                    Congratulations! You've swapped {amountToSwap} {tempSymbol.toUpperCase()} for {amountToReceive}{' '}
                    {info?.token?.symbol.toUpperCase()}.{' '}
                  </Text>
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
                    View on Explorer
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
              <Info info={info} crowdsale={crowdsale} />
              <Flex></Flex>
              <Flex></Flex>
              <Background />
              <Flex></Flex>
              <Flex></Flex>
              <History info={info} crowdsale={crowdsale} purchasers={tempPurchasers} symbol={tempSymbol} />
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
