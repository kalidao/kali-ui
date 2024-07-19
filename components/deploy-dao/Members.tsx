import { Input } from '@components/ui/input'
import { Button } from '@components/ui/button'
import { useForm, useFieldArray } from 'react-hook-form'
import { GlobalState, useStateMachine } from 'little-state-machine'
import updateAction from './updateAction'
import { useAccount, useEnsName } from 'wagmi'
import { ethers } from 'ethers'
import { fetchEnsAddress } from '@utils/fetchEnsAddress'
import { UserPlus, X } from 'lucide-react'

type Props = {
  setStep: React.Dispatch<React.SetStateAction<number>>
}

export default function Members({ setStep }: Props) {
  const { actions, state } = useStateMachine({ updateAction })
  const { hardMode } = state
  const { address: account } = useAccount()
  const { data: ensName } = useEnsName({
    address: account,
    chainId: 1,
  })

  const { register, control, handleSubmit } = useForm<GlobalState>({
    defaultValues: {
      founders: state.founders ?? [{ member: ensName ? ensName : account, share: '1000' }],
    },
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'founders',
  })

  const validateData = async (data: GlobalState) => {
    if (!data) return
    const founders = data?.founders

    for (let i = 0; i < founders.length; i++) {
      if (!ethers.utils.isAddress(founders[i].member)) {
        try {
          const res = await fetchEnsAddress(founders[i].member)
          if (res) {
            founders[i].member = res as string
          }
        } catch (e) {
          return false
        }
      }
    }

    return true
  }

  const onPrevious = async (data: GlobalState) => {
    try {
      const res = await validateData(data)

      if (res) {
        actions.updateAction(data)

        if (!hardMode) {
          setStep(0)
        } else {
          setStep(3)
        }
      }
    } catch (e) {
      console.error(e)
    }
  }

  const onNext = async (data: GlobalState) => {
    const res = await validateData(data)

    if (res) {
      actions.updateAction(data)

      if (!hardMode) {
        setStep(6)
      } else {
        setStep(5)
      }
    }
  }

  return (
    <form className="space-y-4">
      <div className="space-y-4">
        {fields.map((item, index) => (
          <div key={item.id} className="flex items-center space-x-2">
            <Input
              placeholder="Member"
              {...register(`founders.${index}.member` as const, {
                required: true,
              })}
              defaultValue={item.member}
              className="max-w-lg"
            />
            <Input
              placeholder="Tokens"
              type="number"
              {...register(`founders.${index}.share` as const, {
                required: true,
                min: 1,
              })}
              defaultValue={item.share}
              className="max-w-sm"
            />
            <Button
              variant="destructive"
              size="icon"
              onClick={(e) => {
                e.preventDefault()
                remove(index)
              }}
              className="rounded-full h-8 w-8"
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
              member: '',
              share: '1000',
            })
          }}
        >
          <UserPlus className="mr-2 h-4 w-4" />
          Add
        </Button>
      </div>
      <div className="flex justify-end space-x-2">
        <Button variant="outline" onClick={handleSubmit(onPrevious)}>
          Previous
        </Button>
        <Button onClick={handleSubmit(onNext)}>Next</Button>
      </div>
    </form>
  )
}
