import Layout from '@components/dao-dashboard/layout'
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { ethers } from 'ethers'
import { erc20ABI, erc721ABI, useAccount, useContract, useContractRead, useSigner } from 'wagmi'
import { Select } from '@design/Select'
import { Stack, Input, Button, FieldSet, Textarea, Text, Box } from '@kalidao/reality'
import FileUploader from '@components/tools/FileUpload'
import KALIDAO_ABI from '@abi/KaliDAO.json'
import KALIACCESS_ABI from '@abi/KaliAccessManagerV2.json'
import KALITRIBUTE_ABI from '@abi/KaliDAOtribute.json'
import { addresses } from '@constants/addresses'
import { Warning } from '@design/elements'
import { fetchEnsAddress } from '@utils/fetchEnsAddress'
import { AddressZero } from '@ethersproject/constants'
import Back from '@design/proposal/Back'
import { createProposal } from '@components/dao-dashboard/newproposal/utils'
import Editor from '@components/editor'
import { ProposalProps } from '@components/dao-dashboard/newproposal/utils/types'
import { DateInput } from '@design/DateInput'
import { JSONContent } from '@tiptap/react'

export default function Tribute({}: ProposalProps) {
  const router = useRouter()
  const daoAddress = router.query.dao as string
  const chainId = Number(router.query.chainId)
  const { data: signer } = useSigner()
  const { address: user } = useAccount()
  const tributeAddress = addresses[chainId]['extensions']['tribute']

  const { data: kalidaoName } = useContractRead({
    address: daoAddress as `0xstring`,
    abi: KALIDAO_ABI,
    functionName: 'name',
    chainId: Number(chainId),
  })

  const kalidao = useContract({
    address: daoAddress as `0xstring`,
    abi: KALIDAO_ABI,
    signerOrProvider: signer,
  })

  const tributeContract = useContract({
    address: tributeAddress as `0xstring`,
    abi: KALITRIBUTE_ABI,
    signerOrProvider: signer,
  })

  // form
  const [tokenAddress, setTokenAddress] = useState<string>()
  const [tokenId, setTokenId] = useState<string>()
  const [amount, setAmount] = useState<string>()
  const [warning, setWarning] = useState<string>()
  const [approve, setApprove] = useState<Boolean>()
  const [isEnabled, setIsEnabled] = useState(false)
  const [approveStatus, setApproveStatus] = useState<string>()
  const [status, setStatus] = useState<string>()

  const handleApproval = async (e: React.ChangeEvent<HTMLInputElement>) => {
    let _tokenId = e.target.value
    let approved
    if (!signer) {
      setWarning('Please connect your wallet.')
      return
    }

    console.log(_tokenId)
    if (!tokenAddress || !_tokenId) {
      setWarning('Please enter both token address and ID.')
      return
    }

    setWarning('')
    setTokenId(_tokenId)

    try {
      const tokenContract = new ethers.Contract(tokenAddress, erc721ABI, signer)
      approved = await tokenContract.getApproved(_tokenId)
    } catch (e) {
      console.log(e)
      setWarning('Please double check the token address and ID.')
    }

    if (approved) {
      if (approved.toLowerCase() != tributeAddress.toLowerCase()) {
        setApprove(true)
      } else {
        setApprove(false)
        setApproveStatus('Approved.')
        setIsEnabled(true)
      }
    }
  }

  const approveTribute = async () => {
    if (!signer) {
      setWarning('Please connect your wallet.')
      return
    }

    if (!tokenAddress || !tokenId) {
      setWarning('Please enter both token address and ID.')
      return
    }

    try {
      const tokenContract = new ethers.Contract(tokenAddress, erc721ABI, signer)
      const tx = await tokenContract.approve(tributeAddress, tokenId)
      console.log(tx)

      setApprove(false)
      setIsEnabled(true)
    } catch (e) {
      setWarning('Something went wrong.')
      console.log(e)
    }
  }

  const submit = async () => {
    setStatus('Creating proposal...')
    if (!signer) {
      setWarning('Please connect your wallet.')
      return
    }

    if (!amount) return
    let amt = amount && ethers.utils.parseEther(amount.toString())

    setStatus('Creating proposal metadata...')
    let docs
    try {
      docs = await createProposal(daoAddress, chainId, 9, 'Tribute - Sell NFT', {
        type: 'doc',
        content: [
          {
            type: 'paragraph',
            content: [
              {
                type: 'text',
                text: `I'd like to sell my NFT.`,
              },
            ],
          },
        ],
      })
    } catch (e) {
      console.error(e)
      return
    }

    setStatus('Creating proposal...')
    try {
      setWarning('')
      const tx = await tributeContract?.submitTributeProposal(
        daoAddress,
        2,
        docs,
        [user],
        [amt],
        ['0x'],
        true,
        tokenAddress,
        tokenId,
      )
      console.log('tx', tx)
    } catch (e) {
      console.log('error', e)
    }
    setStatus('Proposed.')
  }

  return (
    <Layout title="Tribute" content="Make a tribute">
      <Stack align={'center'}>
        <Box width={'1/2'}>
          <FieldSet
            legend="Sell NFT"
            description={`Use Tribute to initiate an NFT proposal and sell NFTs to ${kalidaoName}.`}
          >
            <Input
              label="Contract Address"
              placeholder={`${AddressZero}`}
              description={`Please double check the contract address is on the same chain that ${kalidaoName} is on.`}
              name="tokenAddress"
              type="text"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTokenAddress(e.target.value)}
            />
            <Input
              label="Token ID"
              description=""
              placeholder="0"
              name="purchaseMultiplier"
              type="number"
              min={1}
              onChange={handleApproval}
            />

            <Input
              label="Asking Price"
              description=""
              placeholder="0"
              name="purchaseMultiplier"
              type="number"
              suffix="ether"
              min={1}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAmount(e.target.value)}
            />

            {warning && <Warning warning={warning} />}

            <Button width={'full'} disabled={!approve} onClick={approveTribute}>
              {approveStatus ? approveStatus : 'Approve Tribute Contract to use NFT'}
            </Button>
            <Button width={'full'} disabled={!isEnabled} onClick={submit}>
              {status ? status : 'Submit Tribute Proposal'}
            </Button>
          </FieldSet>
        </Box>
      </Stack>
    </Layout>
  )
}
