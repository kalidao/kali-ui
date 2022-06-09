import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { ethers } from 'ethers'
import { useContract, useSigner } from 'wagmi'
import { Flex, Text, Button } from '../../../../styles/elements'
import { Form, FormElement, Label, Input, Switch } from '../../../../styles/form-elements'
import FileUploader from '../../../tools/FileUpload'
import KALIDAO_ABI from '../../../../abi/KaliDAO.json'
import { uploadIpfs } from '../../../tools/ipfsHelpers'
import { addresses } from '../../../../constants/addresses'
import { tokens } from '../../../../constants/tokens'
import { fetchExtensionStatus } from '../../../../utils/fetchExtensionStatus'
import { Warning } from '../../../../styles/elements'

export default function SetRedemption() {
  const router = useRouter()
  const daoAddress = router.query.dao
  const daoChainId = router.query.chainId
  const { data: signer } = useSigner()
  const redemptionAddress = addresses[daoChainId]['extensions']['redemption']

  const kalidao = useContract({
    addressOrName: daoAddress,
    contractInterface: KALIDAO_ABI,
    signerOrProvider: signer,
  })

  // form
  const [dai, setDai] = useState(false)
  const [usdc, setUsdc] = useState(false)
  const [weth, setWeth] = useState(false)
  const [redemptionStatus, setRedemptionStatus] = useState('fetching...')
  const [redemptionStart, setRedemptionStart] = useState(null)
  const [toggleRedemption, setToggleRedemption] = useState(null)
  const [description, setDescription] = useState('')
  const [file, setFile] = useState(null)
  const [warning, setWarning] = useState(null)

  useEffect(() => {
    const getRedemptionStatus = async () => {
      const status = await fetchExtensionStatus(daoChainId, daoAddress, redemptionAddress)
      status ? setRedemptionStatus('Active') : setRedemptionStatus('Inactive')
    }

    getRedemptionStatus()
  }, [])

  // TODO: Popup to change network if on different network from DAO
  const submit = async (e) => {
    e.preventDefault()

    // Redemption tokens
    const tokenArray = []
    dai ? tokenArray.push(tokens[daoChainId]['DAI']['address']) : null
    usdc ? tokenArray.push(tokens[daoChainId]['USDC']['address']) : null
    weth ? tokenArray.push(tokens[daoChainId]['WETH']['address']) : null

    // Redemption time
    redemptionStart = Date.parse(redemptionStart) / 1000

    console.log(toggleRedemption)
    const setRedemption = 0
    // Activate / Deactivate Redemption
    if (toggleRedemption && redemptionStatus === 'Inactive') {
      setRedemption = 1
    }
    if (toggleRedemption && redemptionStatus === 'Active') {
      setRedemption = 1
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
    if (file) {
      docs = await uploadIpfs(daoAddress, 'Set Redemption Proposal', file)
    } else {
      docs = description
    }

    console.log(
      'Proposal Params - ',
      9,
      docs,
      [addresses[daoChainId]['extensions']['redemption']],
      [setRedemption],
      [payload],
    )

    try {
      const tx = await kalidao.propose(
        9, // EXTENSION prop
        docs,
        [addresses[daoChainId]['extensions']['redemption']],
        [setRedemption],
        [payload],
      )
      console.log('tx', tx)
    } catch (e) {
      console.log('error', e)
    }
  }

  return (
    <Flex dir="col" gap="md">
      <Text>Pick the DAO assets that DAO members will receive when quitting and burning their DAO tokens </Text>
      <Form>
        <FormElement>
          <Label htmlFor="recipient">Current redemption Status</Label>
          <Text>{redemptionStatus}</Text>
        </FormElement>
        <FormElement>
          {redemptionStatus === 'Inactive' ? (
            <Label htmlFor="recipient">Activate Redemption</Label>
          ) : (
            <Label htmlFor="recipient">Deactivate Redemption</Label>
          )}
          <Input
            type={'checkbox'}
            variant="checkbox"
            value={toggleRedemption}
            onChange={() => setToggleRedemption(!toggleRedemption)}
          />
        </FormElement>
        <FormElement>
          <Label htmlFor="recipient">DAI</Label>
          <Input
            type="checkbox"
            variant="checkbox"
            name="dai"
            value={dai}
            defaultValue={dai}
            onChange={() => setDai(!dai)}
          />
        </FormElement>
        <FormElement>
          <Label htmlFor="recipient">USDC</Label>
          <Input
            type="checkbox"
            variant="checkbox"
            name="usdc"
            value={usdc}
            defaultValue={usdc}
            onChange={() => setUsdc(!usdc)}
          />
        </FormElement>
        <FormElement>
          <Label htmlFor="recipient">WETH</Label>
          <Input
            type="checkbox"
            variant="checkbox"
            name="weth"
            value={weth}
            defaultValue={weth}
            onChange={() => setWeth(!weth)}
          />
        </FormElement>
        <FormElement>
          <Label htmlFor="recipient">Redemption starts on</Label>
          <Input
            variant="calendar"
            type="datetime-local"
            onChange={(e) => setRedemptionStart(e.target.value)}
            // defaultValue={state['crowdsale-end']}
            // name="crowdsale-end"
            // {...register('crowdsale-end')}
          />
        </FormElement>
        <FormElement variant="vertical">
          <Label htmlFor="description">Proposal Note</Label>
          <Input
            as="textarea"
            name="description"
            type="text"
            defaultValue={description}
            onChange={(e) => setDescription(e.target.value)}
            css={{ padding: '0.5rem', width: '97%', height: '10vh' }}
          />
        </FormElement>
        <Flex gap="sm" align="end" effect="glow">
          <FileUploader setFile={setFile} />
        </Flex>
        {warning && <Warning warning={warning} />}
        <Button onClick={submit}>Submit</Button>
      </Form>
    </Flex>
  )
}
