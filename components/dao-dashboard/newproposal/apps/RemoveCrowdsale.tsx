import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { ethers } from 'ethers'
import { useContract, useSigner } from 'wagmi'
import { Input, Label } from '@design/form-elements'
import { Stack, Text } from '@kalidao/reality'
import KALIDAO_ABI from '@abi/KaliDAO.json'
import { addresses } from '@constants/addresses'
import { Warning } from '@design/elements'
import { AddressZero } from '@ethersproject/constants'
import { createProposal } from '../utils'
import { ProposalFooter } from '../utils/ProposalFooter'
import { ProposalProps } from '../utils/types'

export default function RemoveCrowdsale({ setProposal, title, content }: ProposalProps) {
  const router = useRouter()
  const { dao: daoAddress, chainId } = router.query
  const { data: signer } = useSigner()
  const crowdsaleAddress = addresses[Number(chainId)]['extensions']['crowdsale2']

  const kalidao = useContract({
    addressOrName: daoAddress ? (daoAddress as string) : AddressZero,
    contractInterface: KALIDAO_ABI,
    signerOrProvider: signer,
  })

  const [toggleConfirm, setToggleConfirm] = useState(false)
  const [warning, setWarning] = useState<string>()

  const submit = async () => {
    if (toggleConfirm === false) return

    let docs
    try {
      docs = await createProposal(daoAddress as string, Number(chainId), 9, title, content)
    } catch (e) {
      console.error(e)
      return
    }

    // Prop payload
    let payload
    try {
      const abiCoder = ethers.utils.defaultAbiCoder
      payload = abiCoder.encode(
        ['uint256', 'uint8', 'address', 'uint32', 'uint96', 'uint96', 'string'],
        [0, 1, AddressZero, 946702800, 0, 0, 'none'],
      )
      console.log(payload)
    } catch (e) {
      setWarning('Error formatting crowdsale setExtension() parameters.')
      console.log(e)
      return
    }

    console.log('Proposal Params - ', 9, docs, [crowdsaleAddress], [1], [payload])

    try {
      const tx = await kalidao.propose(
        9, // EXTENSION prop
        docs,
        [crowdsaleAddress],
        [1],
        [payload],
      )
      console.log('tx', tx)
    } catch (e) {
      console.log('error', e)
    }
  }

  return (
    <Stack>
      <Text>
        The Swap extension allows anyone to atomically swap Ether or ERC20 tokens, e.g., DAI, for KaliDAO tokens.
      </Text>
      <Text>Please confirm and submit this removal proposal to remove current Swap.</Text>

      <Stack direction={'horizontal'}>
        <Input
          type={'checkbox'}
          variant="checkbox"
          checked={toggleConfirm}
          size="sm"
          onChange={() => setToggleConfirm(!toggleConfirm)}
        />
        <Label htmlFor="recipient">Confirm to submit this Swap removal proposal</Label>
      </Stack>
      {warning && <Warning warning={warning} />}
      <ProposalFooter setProposal={setProposal} proposal="appsMenu" submitProposal={submit} disabled={!toggleConfirm} />
    </Stack>
  )
}
