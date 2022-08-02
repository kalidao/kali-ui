import React, { useState, useEffect } from 'react'
import { useContract, useSigner } from 'wagmi'
import { Flex, Text, Button, Warning } from '../../../../styles/elements'
import { Form, FormElement, Label, Input } from '../../../../styles/form-elements'
import FileUploader from '../../../tools/FileUpload'
import KALIDAO_ABI from '../../../../abi/KaliDAO.json'
import { useRouter } from 'next/router'
import { uploadIpfs } from '../../../tools/ipfsHelpers'
import { AddressZero } from '@ethersproject/constants'
import { fetchDocs } from '../../../../utils/fetchDocs'
import { BsFillArrowUpRightSquareFill } from 'react-icons/bs'
import Back from '../../../../styles/proposal/Back'

// Move to DAO settings UI
export default function UpdateDocs({ setProposal }) {
  const router = useRouter()
  const daoAddress = router.query.dao
  const daoChain = router.query.chainId
  const { data: signer } = useSigner()

  const kalidao = useContract({
    addressOrName: daoAddress,
    contractInterface: KALIDAO_ABI,
    signerOrProvider: signer,
  })

  // form
  const [prevDoc, setPrevDoc] = useState(null)
  const [newDocLink, setNewDocLink] = useState(null)
  const [newDocFile, setNewDocFile] = useState(null)
  const [warning, setWarning] = useState(null)

  useEffect(() => {
    const getPrevDoc = async () => {
      let doc = await fetchDocs(daoChain, daoAddress)
      console.log('existing docs is - ', doc)
      setPrevDoc(doc)
    }
    getPrevDoc()
  }, [])

  // TODO: Popup to change network if on different network from DAO
  const submit = async (e) => {
    e.preventDefault()

    let docs
    if (newDocFile) {
      docs = await uploadIpfs(daoAddress, 'Docs Proposal', newDocFile)
    } else {
      docs = newDocLink
    }

    console.log('Proposal Params - ', 11, docs, [AddressZero], [0], [Array(0)])

    if (docs) {
      try {
        const tx = await kalidao.propose(
          11, // DOCS prop
          docs,
          [AddressZero],
          [0],
          [Array(0)],
        )
        console.log('tx', tx)
      } catch (e) {
        console.log('error', e)
      }
    } else {
      setWarning('Please set a new document.')
    }
  }

  return (
    <Flex
      dir="col"
      gap="md"
      css={{
        padding: '20px',
        width: '60vw',
        fontFamily: 'Regular',
      }}
    >
      <Text>New documentation will be uploaded to IPFS</Text>
      <Form>
        <FormElement>
          {/* FIXME: Is not fetching  */}
          <Label htmlFor="recipient">Current Document</Label>
          {prevDoc != 'none' ? (
            <a href={`https://ipfs.fleek.co/ipfs/${prevDoc}`} target="_blank" rel="noreferrer noopener">
              <BsFillArrowUpRightSquareFill color="white" />
            </a>
          ) : (
            <Text>None</Text>
          )}
        </FormElement>
        <FormElement>
          <Label htmlFor="recipient">Link to new document</Label>
          <Input
            name="recipient"
            type="text"
            defaultValue={newDocLink}
            onChange={(e) => setNewDocLink(e.target.value)}
          />
        </FormElement>
        <FormElement>
          <Label htmlFor="recipient">or</Label>
        </FormElement>
        <FormElement>
          <Label htmlFor="recipient">Upload</Label>
          <FileUploader setFile={setNewDocFile} />
        </FormElement>
        {warning && <Warning warning={warning} />}
        <Back onClick={() => setProposal('internalMenu')} />
        <Button onClick={submit}>Submit</Button>
      </Form>
    </Flex>
  )
}
