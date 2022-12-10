import React, { useEffect, useState } from 'react'
import { useContract, useContractRead, useSigner } from 'wagmi'
import { Warning } from '@design/elements'
import { Stack, Text, Button, FieldSet, Divider, Input, IconLink } from '@kalidao/reality'
import FileUploader from '@components/tools/FileUpload'
import KALIDAO_ABI from '@abi/KaliDAO.json'
import { useRouter } from 'next/router'
import { AddressZero } from '@ethersproject/constants'
import { uploadFile } from '@utils/ipfs'
import ChainGuard from '@components/dao-dashboard/ChainGuard'
import { resolveDocs } from '@utils/resolveDocs'

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
  const { data, isLoading: isFetchingDocs } = useContractRead({
    addressOrName: daoAddress,
    contractInterface: KALIDAO_ABI,
    functionName: 'docs',
    chainId: daoChain,
  })
  const prevDocs = resolveDocs(data?.toString())
  // form
  const [newDocLink, setNewDocLink] = useState<string>()
  const [newDocFile, setNewDocFile] = useState<File>()
  const [warning, setWarning] = useState<string>()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (newDocLink && newDocFile) {
      setWarning('You can only submit one document at a time')
    } else {
      setWarning(undefined)
    }
  }, [newDocLink, newDocFile])

  // TODO: Popup to change network if on different network from DAO
  const submit = async () => {
    setLoading(true)

    let docs
    if (newDocFile) {
      console.log('uploading file', newDocFile)
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
      } catch (e) {
        console.log('error', e)
      }
    } else {
      setWarning('Please set a new document.')
    }
    setLoading(false)
  }

  console.log('docs rwa', data, isFetchingDocs, prevDocs)
  return (
    <FieldSet legend="Update Docs" description={'New documentation will be uploaded to IPFS'}>
      {/* FIXME: Is not fetching  */}
      <Text>{prevDocs?.message}</Text>
      {data && prevDocs?.isLink && (
        <Button as="a" href={prevDocs.docs} target="_blank" rel="noopenner noreferrer">
          Review
        </Button>
      )}

      <Input
        label="Link to new document."
        name="recipient"
        type="text"
        defaultValue={newDocLink}
        onChange={(e) => setNewDocLink(e.target.value)}
        prefix={<IconLink />}
      />
      <Stack direction={'horizontal'} align="center">
        <Divider />
        <Text weight={'semiBold'}>OR</Text>
        <Divider />
      </Stack>
      <FileUploader setFile={setNewDocFile} label="Upload Document" />
      {warning && <Warning warning={warning} />}
      <ChainGuard fallback={<Button>Submit</Button>}>
        <Button center onClick={submit} loading={loading} disabled={warning ? true : false}>
          Submit
        </Button>
      </ChainGuard>
    </FieldSet>
  )
}
