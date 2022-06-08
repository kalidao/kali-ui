import React, { useState } from 'react'
import { useAccount, useNetwork, useContract, useSigner, erc20ABI, useContractRead } from 'wagmi'
import { Flex, Text, Button, Warning } from '../../../../styles/elements'
import { Form, FormElement, Label, Input } from '../../../../styles/form-elements'
import { Select } from '../../../../styles/form-elements/Select'
import FileUploader from '../../../tools/FileUpload'
import KALIDAO_ABI from '../../../../abi/KaliDAO.json'
import { useRouter } from 'next/router'
import { uploadIpfs } from '../../../tools/ipfsHelpers'
import { addresses } from '../../../../constants/addresses'
import { ethers } from 'ethers'

export default function CallContract() {
  const router = useRouter()
  const daoAddress = router.query.dao
  const daoChainId = router.query.chainId
  const { data: daoName, isLoading } = useContractRead(
    {
      addressOrName: daoAddress,
      contractInterface: KALIDAO_ABI,
    },
    'name',
    {
      chainId: Number(daoChainId),
    },
  )
  const { data: account } = useAccount()
  const { data: signer } = useSigner()
  const { activeChain } = useNetwork()

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
    if (file) {
      docs = await uploadIpfs(daoAddress, 'Send ERC20 Proposal', file)
    } else {
      docs = description
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
      setWarning('Supplied inputs do not match the required input type.')
    }
  }

  return (
    <Flex dir="col" gap="md">
      <Text>Send ERC20s from {daoName} treasury</Text>
      <Form>
        <FormElement>
          <Label htmlFor="contractAddress">Contract Address</Label>
          <Input
            name="contractAddress"
            type="text"
            defaultValue={contractAddress}
            onChange={(e) => setContractAddress(e.target.value)}
          />
        </FormElement>
        <FormElement variant="vertical">
          <Label htmlFor="description">Contract ABI</Label>
          <Input
            as="textarea"
            name="description"
            type="text"
            defaultValue={contractAbi}
            onChange={(e) => setContractAbi(e.target.value)}
            css={{ padding: '0.5rem', width: '97%', height: '10vh' }}
          />
          <Button onClick={handleParse}>Parse ABI</Button>
        </FormElement>
        {readFuncs && (
          <FormElement>
            <Label htmlFor="amount">Read Functions</Label>
            <Text>
              {' '}
              <a href={etherscanLink} target="_blank" rel="noopener noreferrer">
                Etherscan
              </a>
            </Text>
          </FormElement>
        )}
        {writeFuncs && (
          <FormElement>
            <Label htmlFor="amount">Write Functions</Label>
            <Select onChange={onWriteFunctionSelect}>
              <option>Select a function</option>
              {writeFuncs.map((f, index) => (
                <option key={index} value={index}>
                  {f['name']}
                </option>
              ))}
            </Select>{' '}
          </FormElement>
        )}
        {inputs == null ? null : (
          <div id="inputFields">
            {inputs.map((input, index) => (
              <FormElement id="inputFields">
                <Text>{input['name']}</Text>
                <Input onChange={onInputChange} />
              </FormElement>
            ))}
          </div>
        )}
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
