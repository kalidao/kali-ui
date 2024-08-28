import React, { useEffect, useState } from 'react'
import { useReadContract, useWriteContract } from 'wagmi'
import { Button } from '@components/ui/button'
import { Input } from '@components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@components/ui/card'
import { Spinner } from '@components/ui/spinner'
import { Alert, AlertDescription } from '@components/ui/alert'
import { Link } from 'lucide-react'
import FileUploader from '@components/tools/FileUpload'
import { KALIDAO_ABI } from '@abi/KaliDAO'
import { useParams } from 'next/navigation'
import { uploadFile } from '@utils/ipfs'
import ChainGuard from '@components/dao-dashboard/ChainGuard'
import { resolveDocs } from '@utils/resolveDocs'
import { Address, zeroAddress } from 'viem'

export function UpdateDocs() {
  const params = useParams<{ chainId: string; dao: Address }>()
  const daoChain = params ? Number(params.chainId) : 1
  const daoAddress = params?.dao as Address

  const { writeContractAsync } = useWriteContract()

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

    console.log('Proposal Params - ', 11, docs, [zeroAddress], [0], [Array(0)])

    if (docs) {
      try {
        await writeContractAsync({
          address: daoAddress,
          abi: KALIDAO_ABI,
          functionName: 'propose',
          args: [11, docs, [zeroAddress], [0n], []],
        })
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
