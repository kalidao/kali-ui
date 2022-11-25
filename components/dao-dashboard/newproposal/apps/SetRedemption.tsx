import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { ethers } from 'ethers'
import { useContract, useSigner } from 'wagmi'
import KALIDAO_ABI from '@abi/KaliDAO.json'
import { addresses } from '@constants/addresses'
import { tokens } from '@constants/tokens'
import { fetchExtensionStatus } from '@utils/fetchExtensionStatus'
import { Warning } from '@design/elements'
import Back from '@design/proposal/Back'
import { ProposalProps } from '../utils/types'
import { FieldSet, Stack, Button, Text, Input, Field } from '@kalidao/reality'
import Switch from '@design/Switch'

export default function SetRedemption({ setProposal, title, content }: ProposalProps) {
  const router = useRouter()
  const daoAddress = router.query.dao as string
  const daoChainId = Number(router.query.chainId)
  const { data: signer } = useSigner()
  const redemptionAddress = addresses[daoChainId]['extensions']['redemption']

  const kalidao = useContract({
    addressOrName: daoAddress,
    contractInterface: KALIDAO_ABI,
    signerOrProvider: signer,
  })

  // form
  const [redemptionStatus, setRedemptionStatus] = useState('fetching...')
  const [redemptionStart, setRedemptionStart] = useState<string>()
  const [tokenArray, setTokenArray] = useState([])
  const [toggleRedemption, setToggleRedemption] = useState<boolean>()
  const [description, setDescription] = useState('')
  const [file, setFile] = useState(null)
  const [warning, setWarning] = useState(null)

  useEffect(() => {
    const getRedemptionStatus = async () => {
      const status = await fetchExtensionStatus(Number(daoChainId), daoAddress, redemptionAddress)
      status ? setRedemptionStatus('Active') : setRedemptionStatus('Inactive')
    }

    getRedemptionStatus()
  }, [])

  useEffect(() => {
    const getRedemptionTokens = async () => {
      let _tokenArray = []
      for (const [k, v] of Object.entries(tokens[daoChainId])) {
        _tokenArray.push(v.address)
        setTokenArray([..._tokenArray])
      }
      console.log(_tokenArray)
    }
    getRedemptionTokens()
  }, [])

  // TODO: Popup to change network if on different network from DAO
  const submit = async (e) => {
    e.preventDefault()

    // Redemption time
    redemptionStart = Date.parse(redemptionStart) / 1000

    const _toggleRedemption = 0
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
      payload = abiCoder.encode(['address[]', 'uint256'], [tokenArray, redemptionStart])
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
      const tx = await kalidao.propose(
        9, // EXTENSION prop
        docs,
        [addresses[daoChainId]['extensions']['redemption']],
        [_toggleRedemption],
        [payload],
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
      <Input
        label="Redemption Stats On"
        variant="calendar"
        type="datetime-local"
        onChange={(e) => setRedemptionStart(e.target.value)}
        // defaultValue={state['crowdsale-end']}
        // name="crowdsale-end"
        // {...register('crowdsale-end')}
      />
      {warning && <Warning warning={warning} />}
      <Stack align="center" justify={'space-between'} direction="horizontal">
        <Back onClick={() => setProposal?.('appsMenu')} />
        <Button onClick={submit}>Submit</Button>
      </Stack>
    </FieldSet>
  )
}
