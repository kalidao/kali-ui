import { useRouter } from 'next/router'
import { erc20ABI, useContractRead, useContract, useSigner, useAccount, useBalance } from 'wagmi'
import Swap from './Swap'
import Approve from './Approve'
import CROWDSALE_ABI from '@abi/KaliDAOcrowdsaleV2.json'
import ACCESS_ABI from '@abi/KaliAccessManagerV2.json'
import { useEffect, useState } from 'react'
import { AddressZero } from '@ethersproject/constants'
import { ethers } from 'ethers'
import { addresses } from '@constants/addresses'
import { Stack, Text, Box, Input, Heading, IconArrowDown } from '@kalidao/reality'

export default function Crowdsale({
  crowdsale,
  daoAddress,
  chainId,
}: {
  crowdsale: any
  daoAddress: string
  chainId: number
}) {
  const router = useRouter()
  const { address } = useAccount()
  const { data: signer } = useSigner()

  const { data: ethBalance } = useBalance({
    addressOrName: address,
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
    args: [address, daoAddress],
    chainId: Number(chainId),
  })

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

  // console.log(tempInProgress, isEligible)
  return (
    <>
      {tempInProgress && isEligible ? (
        <Box width="full" marginTop={'24'}>
          <Stack direction={'horizontal'} justify={'space-between'}>
            <Box width="1/2">
              <Stack>
                <Heading level="2">Swap for {daoName}(daoSymbol.toUpperCase())</Heading>
                <Box width={'fit'} alignSelf={'center'} marginRight="20">
                  <Text>Swap allows anyone to swap Ether or ERC20 tokens, e.g., DAI, for KaliDAO tokens.</Text>
                </Box>
                <Text>Enter an amount to swap for {daoSymbol.toUpperCase()}:</Text>
                <Stack>
                  <Stack align="center">
                    <Input
                      type="number"
                      min={0}
                      max={maxInput}
                      defaultValue="0.0"
                      onChange={(e) => handleAmount(e.target.value)}
                      suffix={tempSymbol}
                      width={'2/3'}
                    />
                  </Stack>
                  <Stack align="center">
                    <IconArrowDown />
                  </Stack>
                  <Stack align="center">
                    <Input
                      type="number"
                      disabled={true}
                      min={0}
                      max={maxOutput}
                      // max={ethers.utils.formatUnits(info['crowdsale']['personalLimit'])}
                      value={amountToReceive}
                      suffix={info?.token?.symbol}
                      width={'2/3'}
                    />
                  </Stack>

                  {tempTerms && tempTerms != 'none' && (
                    <Stack direction={'horizontal'} justify="center">
                      <input
                        type="checkbox"
                        width="25px"
                        height="25px"
                        value={clickedTerms}
                        onChange={() => setClickedTerms(!clickedTerms)}
                      />
                      <Text>
                        I agree to the{' '}
                        <a href={'https://ipfs.io/ipfs/' + tempTerms} target="_blank" rel="noreferrer">
                          terms for swapping
                        </a>
                      </Text>
                    </Stack>
                  )}

                  <Box width={'full'}>
                    <Stack>
                      {shouldApprove && (
                        <Stack align={'center'}>
                          <Box width={'2/3'}>
                            <Approve
                              info={info}
                              symbol={tempSymbol}
                              crowdsale={crowdsale}
                              dao={dao}
                              amount={amountToSwap}
                              chainId={chainId}
                            />
                          </Box>
                        </Stack>
                      )}
                      <Stack align="center">
                        {canPurchase &&
                        !shouldApprove &&
                        (tempTerms == 'none' || (tempTerms != 'none' && clickedTerms)) ? (
                          <Box width={'2/3'}>
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
                          </Box>
                        ) : (
                          <Box width={'2/3'}>
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
                          </Box>
                        )}
                      </Stack>
                    </Stack>
                  </Box>
                </Stack>
                {warning && (
                  <Stack>
                    <Text align={'center'} color={'orange'}>
                      {warning}
                    </Text>
                  </Stack>
                )}
              </Stack>
            </Box>
          </Stack>
        </Box>
      ) : (
        <Stack>
          {warning && <Text>{warning}</Text>}
          <Text>Hop into the KALI Discord to learn more about this Extension ✌️</Text>
        </Stack>
      )}
    </>
  )
}
