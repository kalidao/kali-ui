import React, { useState, useContext, useEffect } from 'react'
import Router, { useRouter } from 'next/router'
import AppContext from '../../context/AppContext'
import { Input, Button, Text, Textarea, VStack, Select, Checkbox, CheckboxGroup, HStack, Center } from '@chakra-ui/react'
import NumInputField from '../elements/NumInputField'
import DateSelect from '../elements/DateSelect'
import { addresses } from '../../constants/addresses'
import ProposalDescription from '../elements/ProposalDescription'
import { uploadIpfs } from '../../utils/helpers'
import { validateEns } from '../tools/ensHelpers'

export default function SetVesting() {
  const value = useContext(AppContext)
  const { web3, loading, account, abi, address, chainId, dao, daoChain } = value.state
  const [startDate, setStartDate] = useState(new Date())

  // For Notes section
  const [doc, setDoc] = useState([])
  const [note, setNote] = useState(null)
  const [file, setFile] = useState(null)

  useEffect(() => {
   
  }, [])

  const submitProposal = async (event) => {
    event.preventDefault()
    value.setLoading(true)

    // Configure proposal type
    const proposalType = 9

    // Configure description param and upload to IPFS if necessary
    let description
    note && file ? (description = await uploadIpfs(dao.address, 'Set Vesting Proposal', file.name)) : (description = 'none')
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
      console.log(array)

      account_ = await validateEns(account_, web3, value)
      if (account_ === undefined) {
        value.setLoading(false)
        return
      }

      vestingStart_ = new Date(vestingStart_).getTime() / 1000
      vestingEnd_ = new Date(vestingEnd_).getTime() / 1000

      const payload_ = web3.eth.abi.encodeParameters(['address[]', 'uint256[]', 'uint256[]', 'uint256[]'], [[account_], [amount_], [vestingStart_], [vestingEnd_]])

      const instance = new web3.eth.Contract(abi, address)

      try {
        let result = await instance.methods
          .propose(proposalType, description, [vestingContract], [1], [payload_])
          .send({ from: account })
        value.setVisibleView(2)
      } catch (e) {
        value.toast(e)
        value.setLoading(false)
        console.log(e)
      }

    value.setLoading(false)
  }

  return (
    <form onSubmit={submitProposal}>
      <VStack align={"flex-starte"}>

      <Text>Recipient</Text>
        <Input name="account_" placeholder='0xKALI or ENS'></Input>

        <Text>Amount to Vest</Text>
        <NumInputField name="amount_"></NumInputField>

        <Text>Vesting Start</Text>
        <DateSelect name="vestingStart_" />

        <Text>Vesting End</Text>
        <DateSelect name="vestingEnd_" />

        <Input type="hidden" name="proposalType_" value="9" />
        <Input type="hidden" name="account_" value={addresses[daoChain]['extensions']['redemption']} />

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
