import React, { useState } from 'react'
import { ethers } from 'ethers'
import { useContractWrite, usePrepareContractWrite } from 'wagmi'
import { Flex, Text, Button } from '../../../../styles/elements'
import { Form, FormElement, Label, Input } from '../../../../styles/form-elements'
import KALIDAO_ABI from '../../../../abi/KaliDAO.json'
import { useRouter } from 'next/router'
import { createProposal } from '../../../tools/createProposal'
import Back from '../../../../styles/proposal/Back'
import { AddressZero } from '@ethersproject/constants'
import ChainGuard from '../../../../components/dao-dashboard/ChainGuard'

export default function AddMember({ setProposal, editor, title }) {
  const router = useRouter()
  const daoAddress = router.query.dao
  const daoChainId = router.query.chainId

  // form
  const [recipient, setRecipient] = useState(null)
  const [amount, setAmount] = useState(null)

  let amt = ethers.utils.parseEther(amount || '0').toString()

  console.log({ daoAddress, daoChainId })

  const { config: proposeConfig }  = usePrepareContractWrite({
    addressOrName: daoAddress,
    contractInterface: KALIDAO_ABI,
    functionName: 'propose',
    args: [0, '', [AddressZero], [0], [Array(0)]], // dummy params for gas estimate
    onError(error) {
      console.log('usePrepareContractWrite', { error } )
    },
  })
  console.log({ proposeConfig })

  const useContractWriteResult = useContractWrite({
    ...proposeConfig,
    onError(error) {
      console.log('useContractWrite', { error })
    },
  })
  const { isSuccess: isProposeSuccess, isError: isProposeError, error: proposeError, isLoading: isProposePending, write: propose } =
    useContractWriteResult
  console.log({ useContractWriteResult })

  const submit = async (e) => {
    e.preventDefault()
    if (!propose) return // wallet not ready to submit on chain
    let docs
    try {
      docs = await createProposal(daoAddress, daoChainId, 0, title, editor.getJSON())
    } catch (e) {
      console.error(e)
      return
    }

    console.log('Proposal Params - ', 0, docs, [recipient], [amt], [Array(0)])
    console.log({ isProposeSuccess })
    try {
      const tx = propose(0, docs, [recipient], [amt], [Array(0)])
      console.log('tx', tx)
    } catch (e) {
      console.log('error', e)
    }
  }

  return (
    <Flex dir="col" gap="md">
      <Text
        css={{
          fontFamily: 'Regular',
        }}
      >
        Mint DAO tokens to a new or existing DAO member
      </Text>
      <Form>
        <FormElement>
          <Label htmlFor="recipient">Recipient</Label>
          <Input
            name="recipient"
            type="text"
            placeholder={AddressZero}
            defaultValue={recipient}
            onChange={(e) => setRecipient(e.target.value)}
          />
        </FormElement>
        <FormElement>
          <Label htmlFor="amount">Amount</Label>
          <Input
            name="amount"
            type="number"
            placeholder="1000"
            defaultValue={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </FormElement>
        <ChainGuard>
          <Button variant="cta" onClick={submit} disabled={!propose || isProposePending || isProposeSuccess}>
            {isProposePending ? 'Submitting...(check wallet)' : 'Submit'}
          </Button>
          <Text
            css={{
              fontFamily: 'Regular',
            }}
          >
            {
              isProposeSuccess ? 'Proposal submitted on chain!' :
                isProposeError && `Error submitting proposal: ${proposeError}`
            }
          </Text>
        </ChainGuard>
        <Back onClick={() => setProposal('membersMenu')} />
      </Form>
    </Flex>
  )
}
