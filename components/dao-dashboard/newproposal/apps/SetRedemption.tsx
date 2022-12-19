import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { ethers, BigNumber } from 'ethers'
import { useContract, useSigner } from 'wagmi'
import { DAO_ABI } from '@abi/index'
import { addresses } from '@constants/addresses'
import { fetchExtensionStatus } from '@utils/fetchExtensionStatus'
import { Warning } from '@design/elements'
import Back from '@design/proposal/Back'
import { ProposalProps } from '../utils/types'
import { FieldSet, Stack, Button, Input } from '@kalidao/reality'
import Switch from '@design/Switch'
import { getRedemptionTokens } from '@utils/getRedemptionTokens'
import { useQuery } from '@tanstack/react-query'
import { createProposal } from '../utils'
import { DateInput } from '@design/DateInput'

export default function SetRedemption({ setProposal, title, content }: ProposalProps) {
  const router = useRouter()
  const daoAddress = router.query.dao as `0x${string}`
  const daoChainId = Number(router.query.chainId)
  const { data: signer } = useSigner()
  const redemptionAddress = addresses[daoChainId]['extensions']['redemption']
  const tokenArray = getRedemptionTokens(daoChainId)

  const kalidao = useContract({
    address: daoAddress,
    abi: DAO_ABI,
    signerOrProvider: signer,
  })

  // form
  const [redemptionStart, setRedemptionStart] = useState<string>()
  const [toggleRedemption, setToggleRedemption] = useState<boolean>()
  const [warning, setWarning] = useState<string>()

  const { data: redemptionStatus } = useQuery(
    ['redemptionStatus'],
    async () => {
      const status = await fetchExtensionStatus(Number(daoChainId), daoAddress, redemptionAddress)
      return status ? 'Active' : 'Inactive'
    },
    {
      enabled: !!daoAddress && !!daoChainId && !!redemptionAddress,
    },
  )

  // TODO: Popup to change network if on different network from DAO
  const submit = async () => {
    if (!redemptionStart) {
      setWarning('Please enter a valid date')
      return
    }
    // Redemption time
    let starts = Number(new Date(redemptionStart).getTime() / 1000)

    let _toggleRedemption = 0
    // Activate / Deactivate Redemption
    if (toggleRedemption && redemptionStatus === 'Inactive') {
      _toggleRedemption = 1
    }
    if (toggleRedemption && redemptionStatus === 'Active') {
      _toggleRedemption = 1
    }

    // Prop payload
    let payload
    try {
      const abiCoder = ethers.utils.defaultAbiCoder
      payload = abiCoder.encode(['address[]', 'uint256'], [tokenArray, starts])
      console.log(payload)
    } catch (e) {
      setWarning('Please set a start time.')
      return
    }

    let docs
    try {
      docs = await createProposal(daoAddress, daoChainId, 9, title, content)
    } catch (e) {
      console.error(e)
      return
    }

    console.log(
      'Proposal Params - ',
      9,
      docs,
      [addresses[daoChainId]['extensions']['redemption']],
      [_toggleRedemption],
      [payload],
    )

    try {
      const tx = await kalidao?.propose(
        9, // EXTENSION prop
        docs,
        [addresses[daoChainId]['extensions']['redemption']],
        [BigNumber.from(_toggleRedemption)],
        [payload as `0x${string}`],
      )
      console.log('tx', tx)
    } catch (e) {
      console.log('error', e)
    }
  }

  return (
    <FieldSet
      legend="Redemption"
      description={`Set redemption for DAI, USDC, WETH. Current status - ${redemptionStatus}`}
    >
      <Switch
        label={redemptionStatus === 'Inactive' ? 'Activate Redemption' : 'Deactivate Redemption'}
        value={toggleRedemption}
        onChange={() => setToggleRedemption(!toggleRedemption)}
      />
      <DateInput
        label="Redemption Starts On"
        onChange={(e) => setRedemptionStart(e.currentTarget.value)}
        defaultValue={redemptionStart}
      />
      {warning && <Warning warning={warning} />}
      <Stack align="center" justify={'space-between'} direction="horizontal">
        <Back onClick={() => setProposal?.('appsMenu')} />
        <Button onClick={submit}>Submit</Button>
      </Stack>
    </FieldSet>
  )
}
