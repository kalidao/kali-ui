import { useState, useContext, useEffect } from 'react'
import Router, { useRouter } from 'next/router'
import AppContext from '../../context/AppContext'
import { Input, Button, Text, Textarea, VStack, HStack, Box } from '@chakra-ui/react'
import Select from 'react-select'
import { getDefaultProvider } from '@ethersproject/providers'
import FileUploader from '../tools/FileUpload'
import { uploadIpfs } from '../tools/ipfsHelpers'

export default function UpdateDoc() {
  const value = useContext(AppContext)
  const { web3, account, abi, address, dao } = value.state

  // For Notes section
  const [file, setFile] = useState(null)

  const submitProposal = async () => {
    event.preventDefault()
    let description_

      if (!file) {
        console.log("No file to upload")
        return
      } 
      description_ = await uploadIpfs(address, 'doc proposal', file)

      const proposalType_ = 11

      const instance = new web3.eth.Contract(abi, address)
      
      console.log('doc proposal', proposalType_, description_)
      try {
        let result = await instance.methods
          .propose(proposalType_, description_, [], [], [])
          .send({ from: account })
        value.setVisibleView(2)
      } catch (e) {
        value.toast(e)
        value.setLoading(false)
      }
    

    value.setLoading(false)
  }

  return (
    <VStack align="flex-start" w="70%">
      <Text fontSize="14px">Upload a document below.</Text>
      <br />
      <FileUploader setFile={setFile} />
      <br />
      <VStack w="100%">
        <Button className="solid-btn" type="submit" onClick={submitProposal}>
          Submit Proposal
        </Button>
      </VStack>
    </VStack>
  )
}
