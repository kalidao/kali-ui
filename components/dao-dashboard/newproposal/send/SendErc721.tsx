import React, { useState } from 'react'
import { useContractRead, useSigner, erc721ABI, useContractWrite } from 'wagmi'
import { Stack, Text, Input } from '@kalidao/reality'
import { Warning } from '@design/elements'
import { ethers } from 'ethers'
import KALIDAO_ABI from '@abi/KaliDAO.json'
import { useRouter } from 'next/router'
import { isHolder } from '@utils/isHolder'
import { createProposal } from '../utils/'
import { ProposalProps } from '../utils/types'
import { ProposalFooter } from '../utils/ProposalFooter'

export default function SendErc721({ setProposal, title, content }: ProposalProps) {
  const router = useRouter()
  const { dao, chainId } = router.query
  const { data: daoName } = useContractRead({
    address: dao ? (dao as `0xstring`) : ethers.constants.AddressZero,
    abi: KALIDAO_ABI,
    functionName: 'name',
    chainId: Number(chainId),
  })
  const { data: signer } = useSigner()

  const {
    write: propose,
    isLoading: isProposalLoading,
    isSuccess: isProposalSuccess,
  } = useContractWrite({
    mode: 'recklesslyUnprepared',
    address: dao ? (dao as `0xstring`) : ethers.constants.AddressZero,
    abi: KALIDAO_ABI,
    functionName: 'propose',
    chainId: Number(chainId),
  })

  // form
  const [tokenAddress, setTokenAddress] = useState<string>()
  const [tokenId, setTokenId] = useState<string>()
  const [recipient, setRecipient] = useState<string>()
  const [warning, setWarning] = useState<string>()

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
    let iface = new ethers.utils.Interface(erc721ABI)
    let payload = iface.encodeFunctionData('transferFrom', [dao as string, recipient, tokenId])

    let docs
    try {
      docs = await createProposal(dao as string, Number(chainId), 2, title, content)
    } catch (e) {
      console.error(e)
      return
    }

    console.log('Proposal Params - ', 2, docs, [tokenAddress], [0], [payload])

    try {
      console.log(signer)
      const tx = await propose?.({
        recklesslySetUnpreparedArgs: [
          2, // CALL prop
          docs,
          [tokenAddress],
          [0],
          [payload],
        ],
      })
      console.log('tx', tx)
    } catch (e) {
      console.log('error', e)
    }
  }

  return (
    <Stack>
      <Text>
        <> Send an ERC721 from {daoName} treasury </>
      </Text>

      <Input
        label="ERC721 Contract Address"
        name="contractAddress"
        type="text"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTokenAddress(e.target.value)}
      />

      <Input
        label="Token ID"
        name="tokenId"
        type="number"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTokenId(e.target.value)}
      />

      <Input
        label="Recipient Address"
        name="recipient"
        type="text"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setRecipient(e.target.value)}
      />

      {warning && <Warning warning={warning} />}
      <ProposalFooter
        setProposal={setProposal}
        proposal={'sendMenu'}
        submitProposal={submit}
        disabled={isProposalSuccess}
        loading={isProposalLoading}
      />
    </Stack>
  )
}
