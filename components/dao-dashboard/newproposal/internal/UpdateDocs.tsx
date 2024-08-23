import React, { useEffect, useState } from 'react'
import { useContract, useReadContract, useSigner } from 'wagmi'
import { Button } from '@components/ui/button'
import { Input } from '@components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@components/ui/card'
import { Spinner } from '@components/ui/spinner'
import { Alert, AlertDescription } from '@components/ui/alert'
import { Separator } from '@components/ui/separator'
import { Link } from 'lucide-react'
import FileUploader from '@components/tools/FileUpload'
import { KALIDAO_ABI } from '@abi/KaliDAO'
import { useRouter } from 'next/router'
import { AddressZero } from '@ethersproject/constants'
import { uploadFile } from '@utils/ipfs'
import ChainGuard from '@components/dao-dashboard/ChainGuard'
import { resolveDocs } from '@utils/resolveDocs'

export function UpdateDocs() {
  const router = useRouter()
  const daoAddress = router.query.dao as string
  const daoChain = Number(router.query.chainId)
  const { data: signer } = useSigner()

  const kalidao = useContract({
    address: daoAddress,
    abi: KALIDAO_ABI,
    signerOrProvider: signer,
  })
  const { data, isLoading: isFetchingDocs } = useReadContract({
    address: daoAddress as `0x${string}`,
    abi: KALIDAO_ABI,
    functionName: 'docs',
    chainId: daoChain,
  })
  const prevDocs = resolveDocs(data?.toString())
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
        const tx = await kalidao?.propose(11, docs, [AddressZero], [0], [Array(0)])
      } catch (e) {
        console.log('error', e)
      }
    } else {
      setWarning('Please set a new document.')
    }
    setLoading(false)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Update Docs</CardTitle>
        <CardDescription>New documentation will be uploaded to IPFS</CardDescription>
      </CardHeader>
      <CardContent>
        {isFetchingDocs ? (
          <Spinner />
        ) : (
          <p className="text-sm mb-4">
            {prevDocs?.message}{' '}
            {data && prevDocs?.isLink && (
              <a
                href={prevDocs.docs}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                Link
              </a>
            )}
          </p>
        )}
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Link className="h-4 w-4" />
            <Input
              placeholder="Link to new document"
              value={newDocLink}
              onChange={(e) => setNewDocLink(e.target.value)}
            />
          </div>
          <div className="flex flex-row items-center space-x-4">
            <span className="flex-grow bg-border h-1" />
            <span className="text-sm font-semibold">OR</span>
            <span className="flex-grow bg-border h-1" />
          </div>
          <FileUploader setFile={setNewDocFile} label="Upload Document" />
          {warning && (
            <Alert variant="destructive">
              <AlertDescription>{warning}</AlertDescription>
            </Alert>
          )}
          <ChainGuard fallback={<Button>Submit</Button>}>
            <Button onClick={submit} disabled={warning ? true : false || loading} className="w-full">
              {loading ? <Spinner className="mr-2 h-4 w-4" /> : null}
              Submit
            </Button>
          </ChainGuard>
        </div>
      </CardContent>
    </Card>
  )
}
