import React, { useState } from 'react'
import { useContract, useSigner } from 'wagmi'
import { useRouter } from 'next/router'
import { ethers } from 'ethers'
import { AlertCircle, ArrowLeft } from 'lucide-react'
import { Button } from '@components/ui/button'
import { Input } from '@components/ui/input'
import { Textarea } from '@components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@components/ui/select'
import { Alert, AlertDescription, AlertTitle } from '@components/ui/alert'
import { KALIDAO_ABI } from '@abi/KaliDAO'
import { createProposal } from '@components/dao-dashboard/newproposal/utils/createProposal'
import { ProposalProps } from '../utils/types'

export default function CallContract({ setProposal, title, content }: ProposalProps) {
  const router = useRouter()
  const daoChainId = Number(router.query.chainId)
  const daoAddress = router.query.dao as string
  const { data: signer } = useSigner()

  const kalidao = useContract({
    address: daoAddress as string,
    abi: KALIDAO_ABI,
    signerOrProvider: signer,
  })

  const [contractAddress, setContractAddress] = useState<string>()
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
      const options = [{ label: 'Select a function', value: '999' }]
      for (var i = 0; i < writeFuncs_.length; i++) {
        options.push({ value: i.toString(), label: writeFuncs_[i]['name'] })
      }
      setWriteFuncs(writeFuncs_)
      setWriteOptions(options)
      setInputs([])
    } catch (e) {
      console.log(e)
    }
  }

  const onWriteFunctionSelect = (value: string) => {
    if (!writeFuncs) return
    if (value === '999') {
      setInputs([])
      setFunctionName('')
    } else {
      let id = Number(value)
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
      let item = (children[i].children[1].value as any) || ''
      if (item != undefined) {
        array.push(item)
      }
    }
    setInputParams(array)
  }

  const submit = async () => {
    if (!functionName) return
    let docs
    try {
      docs = await createProposal(daoAddress, daoChainId, 2, title, content)
    } catch (e) {
      console.error(e)
      return
    }

    try {
      let iface = new ethers.utils.Interface(contractAbi as string)
      let payload = iface.encodeFunctionData(functionName, inputParams)
      console.log('Proposal Params - ', 2, docs, [contractAddress], [0], [payload])

      try {
        const tx = await kalidao?.propose(
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
    <div className="space-y-4">
      <p className="text-sm text-gray-500">
        Supply a contract address and its corresponding ABI. Click "Parse ABI," pick the function you wish to interact
        with, and supply the appropriate inputs.
      </p>
      <p className="text-sm text-gray-500">
        External calls involve programmatically calling a smart contract without a dedicated user interface. It can be
        confusing if you're trying it out for the first time. But when in doubt, hop into the KALI Discord and we'll
        help you out.
      </p>
      <Input
        placeholder="Contract Address"
        value={contractAddress}
        onChange={(e) => setContractAddress(e.target.value)}
      />
      <Textarea placeholder="Contract ABI" value={contractAbi} onChange={(e) => setContractAbi(e.target.value)} />
      <Button variant="outline" onClick={handleParse}>
        Parse ABI
      </Button>
      {writeFuncs && (
        <Select onValueChange={onWriteFunctionSelect}>
          <SelectTrigger>
            <SelectValue placeholder="Select a function" />
          </SelectTrigger>
          <SelectContent>
            {writeOptions?.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}
      {inputs && (
        <div id="inputFields" className="space-y-2">
          {inputs.map((input, index) => (
            <Input key={index} placeholder={input['name']} onChange={onInputChange} />
          ))}
        </div>
      )}
      {warning && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Warning</AlertTitle>
          <AlertDescription>{warning}</AlertDescription>
        </Alert>
      )}
      <div className="flex justify-between items-center">
        <Button variant="outline" onClick={() => setProposal?.('menu')}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>
        <Button onClick={submit}>Submit</Button>
      </div>
    </div>
  )
}
