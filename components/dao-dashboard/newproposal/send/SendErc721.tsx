import React, { useState } from 'react'
import { useReadContract, useWriteContract } from 'wagmi'
import { KALIDAO_ABI } from '@abi/KaliDAO'
import { useParams } from 'next/navigation'
import { isHolder } from '@utils/isHolder'
import { createProposal } from '@components/dao-dashboard/newproposal/utils/createProposal'
import { ProposalProps } from '../utils/types'
import { ProposalFooter } from '../utils/ProposalFooter'
import { Input } from '@components/ui/input'
import { Label } from '@components/ui/label'
import { Alert, AlertDescription } from '@components/ui/alert'
import { AlertTriangle } from 'lucide-react'
import { Address, encodeFunctionData, erc721Abi, zeroAddress } from 'viem'

export default function SendErc721({ setProposal, title, content }: ProposalProps) {
  const params = useParams<{ chainId: string; dao: Address }>()
  const chainId = params ? Number(params.chainId) : 1
  const dao = params?.dao as Address

  const { data: daoName } = useReadContract({
    address: dao ? (dao as `0xstring`) : zeroAddress,
    abi: KALIDAO_ABI,
    functionName: 'name',
    chainId: Number(chainId),
  })
  const { writeContractAsync } = useWriteContract()

  // form
  const [tokenAddress, setTokenAddress] = useState<string>()
  const [tokenId, setTokenId] = useState<string>()
  const [recipient, setRecipient] = useState<string>()
  const [warning, setWarning] = useState<string>()
  const [isProposalLoading, setIsProposalLoading] = useState(false)
  const [isProposalSuccess, setIsProposalSuccess] = useState(false)

  // TODO: Popup to change network if on different network from DAO
  const submit = async () => {
    const isHolding = await isHolder(Number(chainId), tokenAddress as string, Number(tokenId), dao as string)
    if (isHolding) {
      console.log('DAO is holder')
    } else {
      setWarning(
        `${
          daoName ? (daoName as unknown as string) : 'DAO'
        } does not currently own this ERC721. You may not be able to process proposal.`,
      )
    }

    if (!tokenAddress) {
      setWarning('Please enter a valid ERC721 contract address')
      return
    }

    if (!recipient) {
      setWarning('Please enter a valid recipient address')
      return
    }

    if (!tokenId) {
      setWarning('Please enter a valid token ID')
      return
    }

    let payload = encodeFunctionData({
      abi: erc721Abi,
      functionName: 'transferFrom',
      args: [dao as Address, recipient as Address, BigInt(tokenId)],
    })

    let docs
    try {
      docs = await createProposal(dao as string, Number(chainId), 2, title, content)
    } catch (e) {
      console.error(e)
      return
    }

    console.log('Proposal Params - ', 2, docs, [tokenAddress], [0], [payload])

    try {
      setIsProposalLoading(true)
      const tx = await writeContractAsync({
        address: dao ? (dao as `0xstring`) : zeroAddress,
        abi: KALIDAO_ABI,
        functionName: 'propose',
        args: [
          2, // CALL prop
          docs,
          [tokenAddress as Address],
          [0n],
          [payload],
        ],
        chainId: Number(chainId),
      })
      console.log('tx', tx)
      setIsProposalSuccess(true)
    } catch (e) {
      console.log('error', e)
    } finally {
      setIsProposalLoading(false)
    }
  }

  return (
    <div className="space-y-4">
      <p className="text-lg font-semibold">{`Send an ERC721 from ${daoName} treasury`}</p>

      <div className="space-y-2">
        <Label htmlFor="contractAddress">ERC721 Contract Address</Label>
        <Input
          id="contractAddress"
          type="text"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTokenAddress(e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="tokenId">Token ID</Label>
        <Input
          id="tokenId"
          type="number"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTokenId(e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="recipient">Recipient Address</Label>
        <Input
          id="recipient"
          type="text"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setRecipient(e.target.value)}
        />
      </div>

      {warning && (
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>{warning}</AlertDescription>
        </Alert>
      )}

      <ProposalFooter
        setProposal={setProposal}
        proposal={'sendMenu'}
        submitProposal={submit}
        disabled={isProposalSuccess}
        loading={isProposalLoading}
      />
    </div>
  )
}
