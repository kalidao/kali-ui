import React, { useState, useContext, useEffect } from 'react'
import Router, { useRouter } from 'next/router'
import AppContext from '../../context/AppContext'
import {
  Input,
  Button,
  Text,
  Textarea,
  VStack,
  Select,
  Checkbox,
  CheckboxGroup,
  HStack,
  Center,
} from '@chakra-ui/react'
import NumInputField from '../elements/NumInputField'
import DateSelect from '../elements/DateSelect'
import { addresses } from '../../constants/addresses'
import ProposalDescription from '../elements/ProposalDescription'
import { uploadIpfs } from '../../utils/helpers'
import { validateEns } from '../tools/ensHelpers'
import { toDecimals } from '../../utils/formatters'

export default function SetVesting() {
  const value = useContext(AppContext)
  const { web3, loading, account, abi, address, chainId, dao, daoChain } = value.state
  const [startDate, setStartDate] = useState(new Date())

  // For Notes section
  const [doc, setDoc] = useState([])
  const [note, setNote] = useState(null)
  const [file, setFile] = useState(null)

  const submitProposal = async (event) => {
    event.preventDefault()
    value.setLoading(true)

    // Configure proposal type
    const proposalType = 9

    // Configure description param and upload to IPFS if necessary
    let description
    note && file
      ? (description = await uploadIpfs(dao.address, 'Set Vesting Proposal', file.name))
      : (description = 'none')
    note ? (description = note) : (description = 'none')
    file ? (description = await uploadIpfs(dao.address, 'Set Vesting Proposal', file.name)) : null

    // Configure account param
    const vestingContract = addresses[daoChain]['extensions']['vesting']

    let object = event.target

    var array = []
    for (let i = 0; i < object.length; i++) {
      array[object[i].name] = object[i].value
    }

    var { account_, amount_, vestingStart_, vestingEnd_ } = array // this must contain any inputs from custom forms

    // Validate address or ENS
    account_ = await validateEns(account_, web3, value)
    if (account_ === undefined) {
      value.setLoading(false)
      return
    }

    // Configure vesting start and end times for proposal payload
    vestingStart_ = new Date(vestingStart_).getTime() / 1000
    vestingEnd_ = new Date(vestingEnd_).getTime() / 1000

    const timeDifference = vestingEnd_ - vestingStart_
    amount_ = toDecimals(amount_, 18)

    if (timeDifference == 0) {
      value.toast('Invalid vesting period.')
      return
    }

    if (amount_ % timeDifference != 0) {
      console.log(timeDifference)
      console.log(amount_ % timeDifference)
    }

    account_ = [account_]
    amount_ = [0]
    vestingStart_ = [vestingStart_]
    vestingEnd_ = [vestingEnd_]

    // Configure proposal payload
    const payload_ = web3.eth.abi.encodeParameters(
      ['address[]', 'uint256[]', 'uint256[]', 'uint256[]'],
      [account_, amount_, vestingStart_, vestingEnd_],
    )

    console.log(account_, amount_, vestingStart_, vestingEnd_)

    try {
      console.log(proposalType, description, vestingContract, payload_)
      // const instance = new web3.eth.Contract(abi, address)
      // let result = await instance.methods
      //   .propose(proposalType, description, [vestingContract], [1], [payload_])
      //   .send({ from: account })
      // value.setVisibleView(2)
    } catch (e) {
      value.toast(e)
      value.setLoading(false)
      console.log(e)
    }

    value.setLoading(false)
  }

  return (
    <form onSubmit={submitProposal}>
      <VStack align={'flex-starte'}>
        <Text>Recipient</Text>
        <Input name="account_" placeholder="0xKALI or ENS"></Input>

        <Text>Amount to Vest</Text>
        <NumInputField name="amount_"></NumInputField>

        <Text>Vesting Start</Text>
        <DateSelect name="vestingStart_" />

        <Text>Vesting End</Text>
        <DateSelect name="vestingEnd_" />
      </VStack>
      <br />
      <ProposalDescription doc={doc} setDoc={setDoc} note={note} setNote={setNote} setFile={setFile} />

      <br />
      <Center>
        <Button className="solid-btn" type="submit">
          Submit Proposal
        </Button>
      </Center>
    </form>
  )
}
