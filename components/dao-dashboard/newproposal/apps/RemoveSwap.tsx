import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { ethers } from 'ethers'
import { erc20ABI, useContract, useContractRead, useSigner } from 'wagmi'
import { Select } from '@design/Select'
import { Stack, Input, Text, Button, FieldSet, Textarea, Checkbox } from '@kalidao/reality'
import FileUploader from '@components/tools/FileUpload'
import KALIDAO_ABI from '@abi/KaliDAO.json'
import KALIACCESS_ABI from '@abi/KaliAccessManagerV2.json'
import { addresses } from '@constants/addresses'
import { Warning } from '@design/elements'
import { fetchEnsAddress } from '@utils/fetchEnsAddress'
import { AddressZero } from '@ethersproject/constants'
import Back from '@design/proposal/Back'
import { createProposal } from '../utils/'
import Editor from '@components/editor'
import { ProposalProps } from '../utils/types'
import { DateInput } from '@design/DateInput'
import { JSONContent } from '@tiptap/react'

export default function RemoveSwap({ setProposal, title, content }: ProposalProps) {
  const router = useRouter()
  const daoAddress = router.query.dao as string
  const chainId = Number(router.query.chainId)
  const { data: signer } = useSigner()
  const crowdsaleAddress = addresses[chainId]['extensions']['crowdsale2']

  const kalidao = useContract({
    address: daoAddress as `0xstring`,
    abi: KALIDAO_ABI,
    signerOrProvider: signer,
  })

  const [toggleConfirm, setToggleConfirm] = useState(false)
  const [warning, setWarning] = useState<string>()
  const [status, setStatus] = useState<string>()

  const submit = async () => {
    setStatus('Creating proposal...')
    if (toggleConfirm === false) return

    setStatus('Creating proposal metadata...')
    let docs
    try {
      docs = await createProposal(daoAddress as string, Number(chainId), 9, title, content)
    } catch (e) {
      console.error(e)
      return
    }

    setStatus('Encoding swap details...')
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

    setStatus('Creating proposal...')
    try {
      if (kalidao) {
        const tx = await kalidao.propose(
         9, // EXTENSION prop
         docs,
         [crowdsaleAddress],
         [1],
         [payload],
       )
       console.log('tx', tx)
      } else {
        console.log('kalidao is undefined')
      }
    } catch (e) {
      console.log('error', e)
    }
    setStatus('Proposed.')
  }

  return (
    <FieldSet
      legend="Swap"
      description="Please confirm and submit this removal proposal to remove current Swap."
    >

      <Checkbox
        size="small"
        // checked={toggleConfirm}
        onCheckedChange={() => setToggleConfirm(!toggleConfirm)}
        label={
          <Text>Confirm to submit this Swap removal proposal</Text>
        }
      />
      {warning && <Warning warning={warning} />}
      <Stack align="center" justify={'space-between'} direction="horizontal">
        <Back onClick={() => setProposal?.('appsMenu')} />
        <Button width={'full'} onClick={submit}>
          {status ? status : 'Remove Swap'}
        </Button>
      </Stack>
    </FieldSet>
  )
}
