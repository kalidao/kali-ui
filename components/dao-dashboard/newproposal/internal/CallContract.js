import React, { useState } from 'react'
import { useAccount, useNetwork, useContract, useSigner, erc20ABI, useContractRead } from 'wagmi'
import { Flex, Text, Warning } from '../../../../styles/elements'
import { Button, Stack, Input, Textarea, FieldSet } from '@kalidao/reality'
import { FormElement, Label } from '../../../../styles/form-elements'
import { Select } from '../../../../styles/form-elements/Select'
import KALIDAO_ABI from '../../../../abi/KaliDAO.json'
import { useRouter } from 'next/router'
import { addresses } from '../../../../constants/addresses'
import { ethers } from 'ethers'
import Back from '../../../../styles/proposal/Back'
import { createProposal } from '../utils/'

export default function CallContract({ setProposal, title, content }) {
  const router = useRouter()
  const { chainId: daoChainId, dao: daoAddress } = router.query
  const { data: signer } = useSigner()

  const kalidao = useContract({
    addressOrName: daoAddress,
    contractInterface: KALIDAO_ABI,
    signerOrProvider: signer,
  })

  // form
  const [contractAddress, setContractAddress] = useState(null)
  const [contractAbi, setContractAbi] = useState(null)
  const [writeFuncs, setWriteFuncs] = useState(null)
  const [readFuncs, setReadFuncs] = useState(null)
  const [warning, setWarning] = useState(null)

  const [etherscanLink, setEtherscanLink] = useState(null)
  const [functionName, setFunctionName] = useState(null)
  const [inputs, setInputs] = useState(null)
  const [inputParams, setInputParams] = useState([])

  const [description, setDescription] = useState('')
  const [file, setFile] = useState(null)

  const handleParse = async (e) => {
    e.preventDefault()

    try {
      let array = JSON.parse(contractAbi)
      const writeFuncs_ = []
      const readFuncs_ = []

      for (var i = 0; i < array.length; i++) {
        let item = array[i]
        const funcType = item['stateMutability']
        if (funcType == 'nonpayable' || funcType == 'payable') {
          if (item['type'] != 'constructor' && item['type'] != 'fallback') {
            writeFuncs_.push(item)
            writeFuncs_.sort((a, b) => a.name > b.name)
            // console.log(writeFuncs_)
          }
        } else if (funcType == 'view') {
          readFuncs_.push(item)
          readFuncs_.sort((a, b) => a.name > b.name)
          setEtherscanLink(getExplorerLink(contractAddress))
          console.log(getExplorerLink(contractAddress))
        }
      }

      console.log(writeFuncs_)
      setWriteFuncs(writeFuncs_)
      setReadFuncs(readFuncs_)
      setInputs(null)
    } catch (e) {
      console.log(e)
    }
  }

  const onWriteFunctionSelect = (e) => {
    if (e.target.value == 999) {
      setInputs(null)
      setFunctionName(null)
    } else {
      let id = e.target.value
      let inputs_ = writeFuncs[id]['inputs']
      let name_ = writeFuncs[id]['name']
      // console.log(inputs_)
      setInputs(inputs_)
      setFunctionName(name_)
    }
  }

  const getExplorerLink = (address) => {
    const blockExplorerUrls = addresses[daoChainId]['blockExplorer']
    return blockExplorerUrls + '/address/' + address + '#readContract'
  }

  const onInputChange = (e) => {
    let element = document.getElementById('inputFields')
    let children = element.children
    console.log(children)
    let array = []
    for (var i = 0; i < children.length; i++) {
      let item = children[i].children[1].value
      if (item != undefined) {
        array.push(item)
      }
    }
    setInputParams(array)
  }

  // TODO: Popup to change network if on different network from DAO
  const submit = async (e) => {
    e.preventDefault()

    let docs
    try {
      docs = await createProposal(daoAddress, daoChainId, 2, title, content)
    } catch (e) {
      console.error(e)
      return
    }

    try {
      let iface = new ethers.utils.Interface(contractAbi)
      let payload = iface.encodeFunctionData(functionName, inputParams)
      console.log('Proposal Params - ', 2, docs, [contractAddress], [0], [payload])

      try {
        const tx = await kalidao.propose(
          2, // CALL prop
          docs,
          [contractAddress],
          [0],
          [payload],
        )
        console.log('tx', tx)
      } catch (e) {
        console.log('error', e)
      }
    } catch (e) {
      console.log('error', e)
      setWarning('Supplied inputs do not match the required input type.')
    }
  }

  return (
    <Stack>
      <Text
        variant="instruction"
        css={{
          fontFamily: 'Regular',
        }}
      >
        Supply a contract address and its corresponding ABI. Click "Parse ABI," pick the function you wish to interact
        with, and supply the appropriate inputs.{' '}
      </Text>
      <Text
        variant="instruction"
        css={{
          fontFamily: 'Regular',
        }}
      >
        External calls involve programmatically calling a smart contract without a dedicated user interface. It can be
        confusing if you're trying it out for the first time. But when in doubt, hop into the KALI Discord and we'll
        help you out.
      </Text>
      <Input
        label="Contract Address"
        description="The address of the contract you wish to interact with."
        name="contractAddress"
        type="text"
        defaultValue={contractAddress}
        onChange={(e) => setContractAddress(e.target.value)}
      />
      <Textarea
        label="Contract ABI"
        description="Supply the contract ABI here."
        as="textarea"
        name="description"
        type="text"
        defaultValue={contractAbi}
        onChange={(e) => setContractAbi(e.target.value)}
        css={{ padding: '0.5rem', width: '97%', height: '10vh' }}
      />
      <Button variant="secondary" onClick={handleParse}>
        Parse ABI
      </Button>
      {writeFuncs && (
        <FieldSet label="Write Functions">
          <Select onChange={onWriteFunctionSelect}>
            <option>Select a function</option>
            {writeFuncs.map((f, index) => (
              <option key={index} value={index}>
                {f['name']}
              </option>
            ))}
          </Select>{' '}
        </FieldSet>
      )}
      {inputs == null ? null : (
        <Stack id="inputFields">
          {inputs.map((input, index) => (
            <Input label={input['name']} key={index} onChange={onInputChange} />
          ))}
        </Stack>
      )}
      {warning && <Warning warning={warning} />}
      <Stack align="center" justify="space-between" direction={'horizontal'}>
        <Back onClick={() => setProposal('menu')} />
        <Button onClick={submit}>Submit</Button>
      </Stack>
    </Stack>
  )
}
