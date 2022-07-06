import { Form, Input, Label, Title } from '../../styles/form-elements'
import { useForm, useFieldArray } from 'react-hook-form'
import { useStateMachine } from 'little-state-machine'
import updateAction from './updateAction'
import { useAccount, useEnsName } from 'wagmi'
import { Cross2Icon, PersonIcon, PlusIcon } from '@radix-ui/react-icons'
import { Button, Flex } from '../../styles/elements'
import { ethers } from 'ethers'
import { fetchEnsAddress } from '../../utils/fetchEnsAddress'

export default function Members({ setStep }) {
  const { actions, state } = useStateMachine({ updateAction })
  const { hardMode } = state
  const { data: account } = useAccount()
  const { data: ensName } = useEnsName()

  const {
    control,
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: {
      signers: state.signers ?? [{ address: ensName ? ensName : account?.address }],
    },
  })
  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray({
    control,
    name: 'signers',
  })

  // TODO
  // .eth returning undefined
  const validateData = async (data) => {
    if (!data) return
    const signers = data?.signers

    for (let i = 0; i < signers.length; i++) {
      if (!ethers.utils.isAddress(signers[i].address)) {
        try {
          signers[i].address = await fetchEnsAddress(signers[i].address)
        } catch (e) {
          return false
        }
      }
    }

    console.log(signers)
    return true
  }

  const onPrevious = (data) => {
    if (validateData(data)) {
      actions.updateAction(data)

      setStep(0)
    }
  }

  const onNext = (data) => {
    if (validateData(data)) {
      actions.updateAction(data)

      setStep(2)
    }
  }

  return (
    <Form>
      {/* TODO: Copy last share value in next field */}
      <Flex style={{ flexDirection: 'column', gap: '1rem' }}>
        <Flex>Address</Flex>
        <Flex dir="col" css={{ gap: '1rem', width: '100%' }}>
          {fields.map((item, index) => {
            return (
              <Flex key={item.id} css={{ gap: '1rem', justifyContent: 'center', alignItems: 'center' }}>
                <Button
                  variant="icon"
                  onClick={(e) => {
                    e.preventDefault()
                    remove(index)
                  }}
                >
                  <Cross2Icon />
                </Button>

                <Input
                  id="address"
                  {...register(`signers.${index}.address`, {
                    required: true,
                  })}
                  defaultValue={item.address}
                  css={{
                    width: '100%',
                    fontFamily: 'Screen',
                  }}
                  type="text"
                />
                <Button
                  variant="icon"
                  css={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                  onClick={(e) => {
                    e.preventDefault()
                    append({
                      address: '',
                    })
                  }}
                >
                  <PlusIcon />
                </Button>
              </Flex>
            )
          })}
        </Flex>
        <Flex dir="row" align="separate">
          <Label htmlFor="name">Quorum</Label>
          <Flex dir="col" gap="sm">
            <Input
              type="number"
              name="quorum"
              min="0"
              max={fields.length}
              placeholder="1"
              aria-invalid={errors.quorum ? 'true' : 'false'}
              {...register('quorum', {
                required: {
                  value: true,
                  message: 'Quorum is required.',
                },
              })}
              defaultValue={state.quorum}
            />
            {errors.quorum && <span>{errors?.quorum?.message}</span>}
          </Flex>
        </Flex>
      </Flex>
      <Flex css={{ justifyContent: 'flex-end' }} gap="md">
        <Button variant="transparent" onClick={handleSubmit(onPrevious)}>
          Previous
        </Button>
        <Button variant="primary" onClick={handleSubmit(onNext)}>
          Next
        </Button>
      </Flex>
    </Form>
  )
}
