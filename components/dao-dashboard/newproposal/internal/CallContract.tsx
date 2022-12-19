import React, { useState } from 'react'
import { useContract, useSigner } from 'wagmi'
import { Warning } from '@design/elements'
import { Box, Button, Text, Stack, Input, Textarea } from '@kalidao/reality'
import { Select } from '@design/Select'
import { DAO_ABI } from '@abi/index'
import { useRouter } from 'next/router'
import { ethers, BigNumber } from 'ethers'
import Back from '@design/proposal/Back'
import { createProposal } from '../utils'
import { ProposalProps } from '../utils/types'

export default function CallContract({ setProposal, title, content }: ProposalProps) {
  const router = useRouter()
  const daoChainId = Number(router.query.chainId)
  const daoAddress = router.query.dao as `0x${string}`
  const { data: signer } = useSigner()

  const kalidao = useContract({
    address: daoAddress,
    abi: DAO_ABI,
    signerOrProvider: signer,
  })

  // form
  const [contractAddress, setContractAddress] = useState<`0x${string}`>()
  const [contractAbi, setContractAbi] = useState<string>()
  const [writeFuncs, setWriteFuncs] = useState<any[]>()
  const [writeOptions, setWriteOptions] = useState<any[]>()
  const [warning, setWarning] = useState<string>()

  const [functionName, setFunctionName] = useState<string>()
  const [inputs, setInputs] = useState<any[]>()
  const [inputParams, setInputParams] = useState<any[]>()

  const handleParse = async () => {
    if (!contractAbi) return
    try {
      let array = JSON.parse(contractAbi)
      const writeFuncs_ = []

      for (var i = 0; i < array.length; i++) {
        let item = array[i]
        const funcType = item['stateMutability']
        if (funcType == 'nonpayable' || funcType == 'payable') {
          if (item['type'] != 'constructor' && item['type'] != 'fallback') {
            writeFuncs_.push(item)
          }
        }
      }
      const options = [{ label: 'Select a function', value: 999 }]
      for (var i = 0; i < writeFuncs_.length; i++) {
        options.push({ value: i, label: writeFuncs_[i]['name'] })
      }
      setWriteFuncs(writeFuncs_)
      setWriteOptions(options)
      setInputs([])
    } catch (e) {
      console.log(e)
    }
  }

  const onWriteFunctionSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault()
    if (!writeFuncs) return
    if (e.currentTarget.value == '999') {
      setInputs([])
      setFunctionName('')
    } else {
      let id = Number(e.target.value)
      let inputs_ = writeFuncs[id]['inputs']
      let name_ = writeFuncs[id]['name']

      setInputs(inputs_)
      setInputParams([])
      setFunctionName(name_)
    }
  }

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    let element = document.getElementById('inputFields')
    if (!element) return
    let children = element.children
    console.log('elements', children)
    let array = []
    for (var i = 0; i < children.length; i++) {
      // @ts-expect-error
      let item = (children[i].children[1].children[0].children[0].value as any) || ''
      if (item != undefined) {
        array.push(item)
      }
    }
    setInputParams(array)
  }

  // TODO: Popup to change network if on different network from DAO
  const submit = async () => {
    if (!functionName || !contractAddress) return
    let docs
    try {
      docs = await createProposal(daoAddress, daoChainId, 2, title, content)
    } catch (e) {
      console.error(e)
      return
    }

    try {
      let iface = new ethers.utils.Interface(contractAbi as string)
      let payload = iface.encodeFunctionData(functionName, inputParams) as `0x${string}`
      console.log('Proposal Params - ', 2, docs, [contractAddress], [0], [payload])

      try {
        const tx = await kalidao?.propose(
          2, // CALL prop
          docs,
          [contractAddress],
          [BigNumber.from(0)],
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

  const handleContractAddress = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    if (e.currentTarget.value.slice(0, 2) == '0x' && ethers.utils.isAddress(e.currentTarget.value)) {
      setContractAddress(e.currentTarget.value as `0x${string}`)
    }
  }

  return (
    <Stack>
      <Text>
        Supply a contract address and its corresponding ABI. Click "Parse ABI," pick the function you wish to interact
        with, and supply the appropriate inputs.{' '}
      </Text>
      <Text>
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
        onChange={handleContractAddress}
      />
      <Textarea
        label="Contract ABI"
        description="Supply the contract ABI here."
        name="description"
        defaultValue={contractAbi}
        onChange={(e) => setContractAbi(e.target.value)}
      />
      <Button variant="secondary" onClick={handleParse}>
        Parse ABI
      </Button>
      {writeFuncs && (
        <Select label="Write Functions" onChange={onWriteFunctionSelect} options={writeOptions ? writeOptions : []} />
      )}
      {inputs == null ? null : (
        <Box id="inputFields">
          {inputs.map((input, index) => (
            <Input label={input['name']} id={`input-${index}`} key={index} onChange={onInputChange} />
          ))}
        </Box>
      )}
      {warning && <Warning warning={warning} />}
      <Stack align="center" justify="space-between" direction={'horizontal'}>
        <Back onClick={() => setProposal?.('menu')} />
        <Button onClick={submit}>Submit</Button>
      </Stack>
    </Stack>
  )
}
