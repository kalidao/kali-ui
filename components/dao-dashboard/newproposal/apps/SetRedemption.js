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
import Back from '../../../../styles/proposal/Back'

export default function SetRedemption({ setProposal, title, content }) {
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
  const [redemptionStatus, setRedemptionStatus] = useState('fetching...')
  const [redemptionStart, setRedemptionStart] = useState(null)
  const [tokenArray, setTokenArray] = useState([])
  const [toggleRedemption, setToggleRedemption] = useState(null)
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
    <Flex
      dir="col"
      gap="md"
      css={{
        maxWidth: '40vw',
      }}
    >
      <Text
        css={{
          fontFamily: 'Regular',
        }}
      >
        Pick the DAO assets that DAO members will receive when quitting and burning their DAO tokens{' '}
      </Text>
      <Form>
        <FormElement>
          <Label htmlFor="recipient">Current redemption Status</Label>
          <Text>{redemptionStatus}</Text>
        </FormElement>
        <FormElement>
          <Label htmlFor="recipient">Assets to redeem</Label>
          <Text>DAI, USDC, WETH</Text>
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
        {warning && <Warning warning={warning} />}
        <Back onClick={() => setProposal('appsMenu')} />
        <Button onClick={submit}>Submit</Button>
      </Form>
    </Flex>
  )
}
