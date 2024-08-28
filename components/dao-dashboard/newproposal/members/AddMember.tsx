import React, { useState } from 'react'
import { useWriteContract } from 'wagmi'
import { KALIDAO_ABI } from '@abi/KaliDAO'
import { useParams, useRouter } from 'next/navigation'
import { createProposal } from '@components/dao-dashboard/newproposal/utils/createProposal'
import ChainGuard from '@components/dao-dashboard/ChainGuard'
import { ethers } from 'ethers'
import { Back } from '@components/ui/back'
import { ProposalProps } from '../utils/types'
import { useForm, useFieldArray } from 'react-hook-form'
import { fetchEnsAddress } from '@utils/fetchEnsAddress'
import { X, UserPlus } from 'lucide-react'
import { Button } from '@components/ui/button'
import { Input } from '@components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@components/ui/card'
import { Address, parseEther, zeroAddress } from 'viem'

interface FormData {
  members: { address: string; share: string }[]
}

export default function AddMember({ setProposal, content, title }: ProposalProps) {
  const router = useRouter()
  const params = useParams<{ chainId: string; dao: Address }>()
  const chainId = params ? Number(params.chainId) : 1
  const dao = params?.dao as Address

  const [loading, setLoading] = useState(false)
  // form
  const { register, control, handleSubmit } = useForm<FormData>({
    defaultValues: {
      members: [{ address: zeroAddress, share: '1000' }],
    },
  })
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'members',
  })

  const validateData = async (data: FormData) => {
    if (!data) return
    const founders = data?.members

    for (let i = 0; i < founders.length; i++) {
      if (!ethers.utils.isAddress(founders[i].address)) {
        try {
          const res = await fetchEnsAddress(founders[i].address)
          if (res && ethers.utils.isAddress(res)) {
            founders[i].address = res as string
          } else {
            return false
          }
        } catch (e) {
          return false
        }
      }
    }

    return true
  }

  const { writeContractAsync } = useWriteContract()

  const submit = async (data: FormData) => {
    if (!writeContractAsync || !dao || !chainId) return // wallet not ready to submit on chain
    setLoading(true)
    const validated = await validateData(data)

    if (!validated) {
      setLoading(false)
      return
    }

    let docs
    try {
      docs = await createProposal(dao as string, Number(chainId), 0, title, content)
    } catch (e) {
      console.error(e)
      return
    }

    const recipients = data.members.map((member) => member.address as Address)
    const shares = data.members.map((member) => parseEther(member.share.toString()))
    const payloads = data.members.map((member) => zeroAddress)
    console.log('minting', recipients, shares)
    if (docs) {
      try {
        const tx = await writeContractAsync({
          address: dao as `0x${string}`,
          abi: KALIDAO_ABI,
          functionName: 'propose',
          args: [0, docs, recipients, shares, payloads],
        })
        console.log('tx', tx)
        router.push(`/daos/${chainId}/${dao}/`)
      } catch (e) {
        console.log('error', e)
      }
    }
    setLoading(false)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Mint Tokens</CardTitle>
          <CardDescription>This will create a proposal to create and give tokens to the recipient.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {fields.map((item, index) => (
              <div key={item.id} className="flex items-center space-x-2">
                <Input
                  placeholder="Member address"
                  {...register(`members.${index}.address` as const, {
                    required: true,
                  })}
                  defaultValue={item.address}
                />
                <Input
                  placeholder="Tokens"
                  type="number"
                  {...register(`members.${index}.share` as const, {
                    required: true,
                    min: 1,
                  })}
                  defaultValue={item.share}
                />
                <Button
                  variant="destructive"
                  size="icon"
                  onClick={(e) => {
                    e.preventDefault()
                    remove(index)
                  }}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <Button
              variant="outline"
              onClick={(e) => {
                e.preventDefault()
                append({
                  address: '',
                  share: '1000',
                })
              }}
            >
              <UserPlus className="mr-2 h-4 w-4" />
              Add
            </Button>
          </div>
        </CardContent>
      </Card>
      <div className="flex justify-between">
        <Back onClick={() => setProposal?.('membersMenu')} />
        <ChainGuard fallback={<Button>Submit</Button>}>
          <Button onClick={handleSubmit(submit)} disabled={loading}>
            {loading ? 'Submitting...' : 'Submit'}
          </Button>
        </ChainGuard>
      </div>
    </div>
  )
}
