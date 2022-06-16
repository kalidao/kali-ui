import React, { useState, useEffect, useCallback } from 'react'
import { Flex, Text, Button } from '../../../styles/elements'
import { useRouter } from 'next/router'
import { ethers } from 'ethers'
import { useContract, useSigner, useContractRead, useContractWrite, useAccount, useNetwork } from 'wagmi'
import { Form, FormElement, Label, Input, Checkbox } from '../../../styles/form-elements'
import KALIDAO_ABI from '../../../abi/KaliDAO.json'
import CROWDSALE_ABI from '../../../abi/KaliDAOcrowdsaleV2.json'
import KALIACCESS_ABI from '../../../abi/KaliAccessManagerV2.json'
import ERC20_ABI from '../../../abi/ERC20.json'
import { Warning } from '../../../styles/elements'
import { getTokenName } from '../../../utils/fetchTokenInfo'
import { CROWDSALE } from '../../../graph/dao-queries'
import { useGraph } from '../../hooks'
import { addresses } from '../../../constants/addresses'
import { AddressZero } from '@ethersproject/constants'

export default function Crowdsale() {
  const router = useRouter()
  const daoAddress = router.query.dao
  const daoChainId = router.query.chainId
  const crowdsaleAddress = addresses[daoChainId]['extensions']['crowdsale2']
  const accessAddress = addresses[daoChainId]['access2']
  const { data: signer } = useSigner()
  const { data: account } = useAccount()
  const { activeChain, chains } = useNetwork()
  const { data: graph } = useGraph(daoChainId, CROWDSALE, {
    dao: daoAddress,
  })
  const [purchaseAmount, setPurchaseAmount] = useState(0) // amount to be spent on shares, not converted to wei/decimals
  const [purchaseTokenContract, setPurchaseTokenContract] = useState(null)
  const [purchaseTokenSymbol, setPurchaseTokenSymbol] = useState(null)
  const [purchaseTokenExplorer, setPurchaseTokenExplorer] = useState(null)
  const [purchaseTokenDecimals, setPurchaseTokenDecimals] = useState(null)
  const [purchaseMultipler, setPurchaseMultiplier] = useState(0)
  const [purchaseLimit, setPurchaseLimit] = useState(0)
  const [personalLimit, setPersonalLimit] = useState(0)
  const [totalPurchase, setTotalPurchase] = useState(0)
  const [purchaseTerms, setPurchaseTerms] = useState(null)
  const [purchaseList, setPurchaseList] = useState(null)
  const [personalPurchased, setPersonalPurchased] = useState(0)
  const [didCheckTerms, setDidCheckTerms] = useState(false)
  const [canPurchase, setCanPurchase] = useState(false)
  const [approveButton, setApproveButton] = useState(false)
  const [eligibleBuyer, setEligibleBuyer] = useState(null)
  const [remainingTime, setRemainingTime] = useState(0)
  const [timeLeft, setTimeLeft] = useState(0)
  const [warning, setWarning] = useState(null)

  const { data: daoName, isLoading } = useContractRead(
    {
      addressOrName: daoAddress,
      contractInterface: KALIDAO_ABI,
    },
    'name',
    {
      chainId: Number(daoChainId),
    },
  )

  const { data: crowdsale_, isLoading: isCrowdsaleLoading } = useContractRead(
    {
      addressOrName: crowdsaleAddress ? crowdsaleAddress : AddressZero,
      contractInterface: CROWDSALE_ABI,
    },
    'crowdsales',
    {
      args: daoAddress,
      chainId: Number(daoChainId),
    },
  )

  const {
    data: callKalidaoData,
    writeAsync: callKalidaoAsync,
    isLoading: isCallKalidaoPending,
    isSuccess: isCallKalidaoSuccess,
    isCallKalidaoError,
    callKalidaoError,
  } = useContractWrite(
    {
      addressOrName: daoAddress,
      contractInterface: KALIDAO_ABI,
    },
    'callExtension',
    {
      onSuccess(data) {
        console.log('success!', data)
      },
    },
  )

  const {
    data: callCrowdsaleData,
    writeAsync: callCrowdsaleAsync,
    isLoading: isCallCrowdsalePending,
    isSuccess: isCallCrowdsaleSuccess,
    isCallCrowdsaleError,
    callCrowdsaleError,
  } = useContractWrite(
    {
      addressOrName: crowdsaleAddress,
      contractInterface: CROWDSALE_ABI,
    },
    'callExtension',
    {
      onSuccess(data) {
        console.log('success!', data)
      },
    },
  )

  const kalidao = useContract({
    addressOrName: daoAddress,
    contractInterface: KALIDAO_ABI,
    signerOrProvider: signer,
  })

  const crowdsaleInstance = useContract({
    addressOrName: crowdsaleAddress,
    contractInterface: CROWDSALE_ABI,
    signerOrProvider: signer,
  })

  const accessInstance = useContract({
    addressOrName: accessAddress,
    contractInterface: KALIACCESS_ABI,
    signerOrProvider: signer,
  })

  const erc20 = useContract({
    addressOrName: purchaseTokenContract ? purchaseTokenContract : AddressZero,
    contractInterface: ERC20_ABI,
    signerOrProvider: signer,
  })

  useEffect(() => {
    const getCrowdsale = async () => {
      try {
        const crowdsale = await crowdsaleInstance.crowdsales(daoAddress)
        // const crowdsale = graph['crowdsales'][0]
        console.log(crowdsale)

        // Purchase token
        setPurchaseTokenContract(crowdsale.purchaseAsset)

        // Access
        console.log(ethers.utils.formatUnits(crowdsale.listId, 'wei'))
        switch (ethers.utils.formatUnits(crowdsale.listId, 'wei')) {
          case '0':
            setPurchaseList('Public')
            setEligibleBuyer(true)
            break
          case '1':
            setPurchaseList('Accredited')
            break
          default:
            setPurchaseList('Private')
            checkEligibility(crowdsale.listId)
            break
        }

        // Terms
        if (crowdsale.details != 'none') {
          const terms = 'https://ipfs.io/ipfs/' + crowdsale.details
          setPurchaseTerms(terms)
        } else {
          setPurchaseTerms(null)
        }

        // Personal limit
        setPersonalLimit(ethers.utils.formatEther(crowdsale.personalLimit))
        // if (typeof crowdsale.personalLimit === 'string') {
        //   setPersonalLimit(ethers.utils.formatEther(crowdsale.personalLimit))
        // }

        // Total purchase limit
        setPurchaseLimit(ethers.utils.formatEther(crowdsale.purchaseLimit))
        // if (typeof crowdsale.purchaseLimit === 'string') {
        //   setPurchaseLimit(ethers.utils.formatEther(crowdsale.purchaseLimit))
        // }

        // Purchase token
        switch (crowdsale.purchaseAsset) {
          case '0x0000000000000000000000000000000000000000':
            setPurchaseTokenSymbol('ETH')
            break
          default:
            getPurchaseTokenInfo(crowdsale.purchaseAsset)
            checkPurchaseTokenAllowance(crowdsale.purchaseAsset)
            break
        }

        // Purchase ratio
        setPurchaseMultiplier(crowdsale.purchaseMultiplier)

        // Limits
        checkPersonalLimit()
        setTotalPurchase(ethers.utils.formatEther(crowdsale.purchaseTotal))

        // Crowdsale ends
        setRemainingTime(parseInt(crowdsale.saleEnds) * 1000 - Date.now())
      } catch (e) {
        console.log(e)
      }
    }

    if (activeChain.id === parseInt(daoChainId)) {
      console.log(crowdsale_)
      getCrowdsale()
      setCanPurchase(true)
      setWarning(null)
    } else {
      setCanPurchase(false)
      setWarning(`Please connect to the correct network.`)
    }
  }, [graph])

  useEffect(() => {
    const timer = setTimeout(() => {
      const remain = calculateTimeLeft(remainingTime)
      setTimeLeft(remain)
    }, 1000)

    return () => clearTimeout(timer)
  })

  const getPurchaseTokenInfo = async (_contract) => {
    try {
      const symbol = await erc20.symbol()
      console.log(symbol)
      setPurchaseTokenSymbol(symbol.toUpperCase())
    } catch (e) {
      console.log("Can't find purchase token symbol")
    }

    try {
      const decimals = await erc20.decimals()
      setPurchaseTokenDecimals(decimals)
    } catch (e) {
      console.log("Can't find purchase token decimal")
    }

    const url = addresses[daoChainId]['blockExplorer'] + '/token/' + _contract
    setPurchaseTokenExplorer(url)
  }

  const checkPurchaseTokenAllowance = async (_contract) => {
    console.log(_contract)

    try {
      const allowance = await erc20.allowance(account.address, crowdsaleAddress)
      const result = ethers.utils.formatEther(allowance)
      console.log(result)
      if (result == 0) {
        setApproveButton(true)
        console.log('Token contract not yet approved')
      } else {
        setApproveButton(false)
        console.log('Token contract already approved')
      }
    } catch (e) {
      console.log("Can't find token allowance")
    }
  }

  function calculateTimeLeft(duration) {
    let seconds = Math.floor((duration / 1000) % 60),
      minutes = Math.floor((duration / (1000 * 60)) % 60),
      hours = Math.floor((duration / (1000 * 60 * 60)) % 24),
      days = Math.floor((duration / (1000 * 60 * 60 * 24)) % 365)

    const timeleft = seconds + minutes + hours + days

    days = hours < 10 ? 0 + days : days
    hours = hours < 10 ? 0 + hours : hours
    minutes = minutes < 10 ? 0 + minutes : minutes
    seconds = seconds < 10 ? 0 + seconds : seconds

    if (timeleft < 0) {
      return 'SALE ENDED'
    } else {
      return days + ' days ' + hours + ' hr ' + minutes + ' min ' + seconds + ' sec '
    }
  }

  const approveSpend = async () => {
    let allowance_ = 1000000000
    const approvalAmount = ethers.utils.parseEther(allowance_.toString()).toString()

    try {
      console.log(purchaseTokenContract, approvalAmount)
      const tx = await erc20.approve(crowdsaleAddress, approvalAmount)
      console.log(tx)
      setApproveButton(false)
      setCanPurchase(true)
    } catch (e) {
      console.log(e)
    }
  }

  const checkPersonalLimit = async () => {
    try {
      const tx = await crowdsaleInstance.checkPersonalPurchased(account.address, daoAddress)
      tx = ethers.utils.formatEther(tx)
      setPersonalPurchased(tx)
    } catch (e) {
      console.log('Error retrieving personal purchased amount.')
    }
  }

  const checkEligibility = async (listId) => {
    listId = ethers.utils.formatUnits(listId, 'wei')
    console.log(listId, account.address)
    try {
      let tx = await accessInstance.balanceOf(account.address, listId)
      console.log(tx)
      if (tx > 0) setEligibleBuyer(true)
      else setWarning('You are not eligible for this private sale.')
    } catch (e) {
      console.log(e)
    }
  }

  const handleBuy = useCallback(async () => {
    if (!account || !activeChain) return
    setWarning(null)

    if (purchaseTerms && !didCheckTerms) {
      setWarning('Please review terms of sale')
      return
    }

    if (purchaseTokenSymbol === 'ETH') {
      try {
        const amount = ethers.utils.parseEther(purchaseAmount)
        console.log(amount, ethers.constants.HashZero)

        const tx = await callCrowdsaleAsync({
          args: [daoAddress, amount],
          overrides: {
            value: amount,
            gasLimit: 1500000,
          },
        })
        console.log('tx - ', tx)
      } catch (e) {
        console.log(e)
      }
    } else {
      // TODO: Add custom tokens to deployment
      try {
        const amount = ethers.utils.parseUnits(purchaseAmount, purchaseTokenDecimals).toString()
        console.log(amount)
        const tx = await callCrowdsaleAsync({
          args: [daoAddress, amount],
          overrides: {
            gasLimit: 1500000,
          },
        })
        console.log('tx - ', tx)
      } catch (e) {
        console.log(e)
      }
    }
  }, [purchaseAmount, purchaseTokenSymbol, purchaseTerms, didCheckTerms, callCrowdsaleAsync])

  return (
    <Flex dir="col" gap="md">
      <Text color="foreground" variant="heading">
        Crowdsale
      </Text>
      {graph ? (
        <Text variant={'description'}>
          <i>{daoName}</i> is currently running a sale of its token with the following details:
        </Text>
      ) : (
        <Text variant={'description'}>
          <i>{daoName}</i> is not running any sale at this time.
        </Text>
      )}
      <Flex dir="col" gap="md">
        <Text>Access: {purchaseList}</Text>
        <Text>
          Peronal purchase limit: {personalPurchased} / {personalLimit}
        </Text>
        <Text>
          Total purchase limit: {totalPurchase} / {purchaseLimit}
        </Text>
        <Text>Sale ends: {timeLeft}</Text>
        <Text>
          Receive {purchaseAmount ? purchaseAmount * purchaseMultipler : purchaseMultipler} DAO tokens /{' '}
          <a href={purchaseTokenExplorer} target="_blank" rel="noreferrer noopener">
            {purchaseTokenSymbol ? purchaseTokenSymbol : '...fetching'}
          </a>
        </Text>
        {purchaseTerms && (
          <Flex>
            <Input
              type={'checkbox'}
              variant="checkbox"
              value={didCheckTerms}
              onChange={() => setDidCheckTerms(!didCheckTerms)}
            />
            <Label>
              I agree to the
              <a variant={'link'} href={purchaseTerms} target="_blank" rel="noopener noreferrer">
                terms
              </a>
              of sale
            </Label>{' '}
          </Flex>
        )}
        {warning && <Warning warning={warning} />}
        {approveButton && <Button onClick={approveSpend}>Approve</Button>}
        <Flex gap="md">
          <Input
            name="purchaseAmount"
            type="number"
            disabled={!eligibleBuyer}
            defaultValue={purchaseAmount}
            onChange={(e) => setPurchaseAmount(e.target.value)}
          />
          <Button onClick={handleBuy} disabled={!canPurchase || !eligibleBuyer}>
            Buy
          </Button>
        </Flex>
      </Flex>
    </Flex>
  )
}
