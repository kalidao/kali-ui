import { Input, Button, Stack, IconUserSolid, IconClose } from '@kalidao/reality'
import { useForm, useFieldArray } from 'react-hook-form'
import { GlobalState, useStateMachine } from 'little-state-machine'
import updateAction from './updateAction'
import { useAccount, useEnsName } from 'wagmi'
import { ethers } from 'ethers'
import { fetchEnsAddress } from '@utils/fetchEnsAddress'

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

  const {
    register,
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<GlobalState>({
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
    <form>
      {/* TODO: Copy last share value in next field */}
      <Stack justify="flex-start">
        {fields.map((item, index) => {
          return (
            <Stack key={item.id} direction="horizontal" align="center" justify="center">
              <Input
                label={`Member`}
                hideLabel={index !== 0}
                id="member"
                {...register(`founders.${index}.member` as const, {
                  required: true,
                })}
                defaultValue={item.member}
                type="text"
              />
              <Input
                label="Tokens"
                hideLabel={index !== 0}
                id="share"
                type="number"
                {...register(`founders.${index}.share` as const, {
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
              member: '',
              share: '1000',
            })
          }}
        >
          Add
        </Button>
      </Stack>
      <Stack direction={'horizontal'} align="center" justify={'flex-end'}>
        <Button variant="transparent" onClick={handleSubmit(onPrevious)}>
          Previous
        </Button>
        <Button variant="primary" onClick={handleSubmit(onNext)}>
          Next
        </Button>
      </Stack>
    </form>
  )
}
