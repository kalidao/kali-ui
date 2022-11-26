import React, { useState } from 'react'
import { useContract, useContractRead, useSigner } from 'wagmi'
import { Warning } from '@design/elements'
import { Stack, Text, Button, FieldSet, Input, IconLink } from '@kalidao/reality'
import FileUploader from '@components/tools/FileUpload'
import KALIDAO_ABI from '@abi/KaliDAO.json'
import { useRouter } from 'next/router'
import { AddressZero } from '@ethersproject/constants'
import { uploadFile } from '@utils/uploadFile'

// Move to DAO settings UI
export default function UpdateDocs() {
  const router = useRouter()
  const daoAddress = router.query.dao as string
  const daoChain = Number(router.query.chainId)
  const { data: signer } = useSigner()

  const kalidao = useContract({
    addressOrName: daoAddress,
    contractInterface: KALIDAO_ABI,
    signerOrProvider: signer,
  })
  const { data: prevDoc, isLoading: isFetchingDocs } = useContractRead({
    addressOrName: daoAddress,
    contractInterface: KALIDAO_ABI,
    functionName: 'docs',
    chainId: daoChain,
  })

  // form
  const [newDocLink, setNewDocLink] = useState<string>()
  const [newDocFile, setNewDocFile] = useState(null)
  const [warning, setWarning] = useState<string>()

  // TODO: Popup to change network if on different network from DAO
  const submit = async () => {
    let docs
    if (newDocFile) {
      docs = await uploadFile(newDocFile)
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
    <FieldSet legend="Update Docs" description={'New documentation will be uploaded to IPFS'}>
      {/* FIXME: Is not fetching  */}
      {!isFetchingDocs && prevDoc && prevDoc.toString() != 'none' ? (
        <Stack direction={'horizontal'} align="center" justify={'flex-start'}>
          <Text>Current Docs:</Text>
          <a href={`https://ipfs.fleek.co/ipfs/${prevDoc}`} target="_blank" rel="noreferrer noopener">
            <IconLink color="white" />
          </a>
        </Stack>
      ) : (
        <Text>We could not find any docs for your DAO.</Text>
      )}
      <Input
        label="Link to new document."
        name="recipient"
        type="text"
        defaultValue={newDocLink}
        onChange={(e) => setNewDocLink(e.target.value)}
      />

      <Text>OR</Text>

      <Text>Upload</Text>
      <FileUploader setFile={setNewDocFile} />
      {warning && <Warning warning={warning} />}
      <Button onClick={submit}>Submit</Button>
    </FieldSet>
  )
}
