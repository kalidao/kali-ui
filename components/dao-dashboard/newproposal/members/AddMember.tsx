import React, { useState } from 'react'
import { useContractWrite } from 'wagmi'
import KALIDAO_ABI from '@abi/KaliDAO.json'
import { useRouter } from 'next/router'
import { createProposal } from '@components/dao-dashboard/newproposal/utils/'
import { AddressZero } from '@ethersproject/constants'
import ChainGuard from '@components/dao-dashboard/ChainGuard'
import { FieldSet, Text, Input, Button, Stack, IconClose, IconUserSolid } from '@kalidao/reality'
import { ethers } from 'ethers'
import Back from '@design/proposal/Back'
import { ProposalProps } from '../utils/types'
import { useForm, useFieldArray } from 'react-hook-form'
import { fetchEnsAddress } from '@utils/fetchEnsAddress'

interface FormData {
  members: { address: string; share: string }[]
}

export default function AddMember({ setProposal, content, title }: ProposalProps) {
  const router = useRouter()
  const { dao, chainId } = router.query
  const [loading, setLoading] = useState(false)
  // form
  const {
    register,
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      members: [{ address: ethers.constants.AddressZero, share: '1000' }],
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

  const {
    isSuccess: isProposeSuccess,
    isError: isProposeError,
    error: proposeError,
    isLoading: isProposePending,
    write: propose,
  } = useContractWrite({
    mode: 'recklesslyUnprepared',
    addressOrName: dao as string,
    contractInterface: KALIDAO_ABI,
    functionName: 'propose',
    onSuccess: async () => {
      await setTimeout(() => {
        router.push(`/daos/${chainId}/${dao}/`)
      }, 35000)
    },
  })

  const submit = async (data: FormData) => {
    if (!propose || !dao || !chainId) return // wallet not ready to submit on chain
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

    const recipients = data.members.map((member) => member.address)
    const shares = data.members.map((member) => ethers.utils.parseEther(member.share.toString()))
    const payloads = data.members.map((member) => AddressZero)
    console.log('minting', recipients, shares)
    if (docs) {
      try {
        const tx = await propose({
          recklesslySetUnpreparedArgs: [0, docs, recipients, shares, payloads],
        })
        console.log('tx', tx)
      } catch (e) {
        console.log('error', e)
      }
    }
    setLoading(false)
  }

  return (
    <Stack>
      <FieldSet
        legend="Mint Tokens"
        description="This will create a proposal to create and give tokens to the recipient."
      >
        <Stack justify="flex-start">
          {fields.map((item, index) => {
            return (
              <Stack key={item.id} direction="horizontal" align="center" justify="center">
                <Input
                  label={`Member`}
                  hideLabel={index !== 0}
                  id="member"
                  {...register(`members.${index}.address` as const, {
                    required: true,
                  })}
                  defaultValue={item.address}
                  type="text"
                />
                <Input
                  label="Tokens"
                  hideLabel={index !== 0}
                  id="share"
                  type="number"
                  {...register(`members.${index}.share` as const, {
                    required: true,
                    min: 1,
                  })}
                  defaultValue={item.share}
                />
                <Button
                  tone="red"
                  variant="secondary"
                  size="small"
                  shape="circle"
                  onClick={(e) => {
                    e.preventDefault()
                    remove(index)
                  }}
                >
                  <IconClose />
                </Button>
              </Stack>
            )
          })}
          <Button
            suffix={<IconUserSolid />}
            variant="secondary"
            tone="green"
            onClick={(e) => {
              e.preventDefault()
              append({
                address: '',
                share: '1000',
              })
            }}
          >
            Add
          </Button>
        </Stack>
      </FieldSet>
      <Stack direction={'horizontal'} justify="space-between">
        <Back onClick={() => setProposal?.('membersMenu')} />
        <ChainGuard fallback={<Button center>Submit</Button>}>
          <Button
            center
            variant="primary"
            onClick={handleSubmit(submit)}
            loading={loading || isProposePending}
            disabled={!propose || isProposePending || isProposeSuccess}
          >
            {isProposePending ? 'Submitting...' : 'Submit'}
          </Button>
        </ChainGuard>
      </Stack>
      <Text>
        {isProposeSuccess
          ? 'Proposal submitted on chain!'
          : isProposeError && `Error submitting proposal: ${proposeError}`}
      </Text>
    </Stack>
  )
}
