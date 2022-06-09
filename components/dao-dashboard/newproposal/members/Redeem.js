import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { ethers } from 'ethers'
import { useContract, useSigner } from 'wagmi'
import { Flex, Text, Button } from '../../../../styles/elements'
import { Form, FormElement, Label, Input } from '../../../../styles/form-elements'
import KALIDAO_ABI from '../../../../abi/KaliDAO.json'
import { addresses } from '../../../../constants/addresses'
import { Warning } from '../../../../styles/elements'

export default function Redeem() {
  const router = useRouter()
  const daoAddress = router.query.dao
  const daoChainId = router.query.chainId
  const redemptionAddress = addresses[daoChainId]['extensions']['redemption']
  const { data: signer } = useSigner()

  const kalidao = useContract({
    addressOrName: daoAddress,
    contractInterface: KALIDAO_ABI,
    signerOrProvider: signer,
  })

  // form
  const [amount, setAmount] = useState(null)
  const [warning, setWarning] = useState(null)

  // TODO: Popup to change network if on different network from DAO
  const submit = async (e) => {
    e.preventDefault()

    console.log(amount)

    if (amount <= 0) {
      setWarning('Please input a valid amount.')
      return
    } else {
      amount = ethers.utils.parseEther(amount).toString()
    }
    console.log('Proposal Params - ', redemptionAddress, amount, '0x')
    try {
      const tx = await kalidao.callExtension(redemptionAddress, 0, '0x')
      console.log('tx', tx)
    } catch (e) {
      console.log('error', e)
    }
  }

  return (
    <Flex dir="col" gap="md">
      <Text>Redeem assets from DAO treasury by burning select amount of DAO tokens</Text>
      <Form>
        <FormElement>
          <Label htmlFor="amount">Amount</Label>
          <Input name="amount" type="number" onChange={(e) => setAmount(e.target.value)} />
        </FormElement>
        {warning && <Warning warning={warning} />}
        <Button onClick={submit}>Submit</Button>
      </Form>
    </Flex>
  )
}
