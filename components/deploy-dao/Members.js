import { Form, Input, Label, Title } from '../../styles/form-elements'
import { styled } from '../../styles/stitches.config'
import { useForm, useFieldArray } from 'react-hook-form'
import { useStateMachine } from 'little-state-machine'
import updateAction from './updateAction'
import { useAccount, useEnsName } from 'wagmi'
import { Cross2Icon, PersonIcon } from '@radix-ui/react-icons'
import { Button, Flex } from '../../styles/elements'
import { ethers } from 'ethers'
import { fetchEnsAddress } from '../../utils/fetchEnsAddress'

export default function Members({ setStep, hardMode }) {
  const { actions, state } = useStateMachine({ updateAction })
  const { data: account } = useAccount()
  const { data: ensName } = useEnsName()

  const {
    register,
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    defaultValues: {
      founders: state.founders ?? [{ member: ensName ? ensName : account?.address, share: '1000' }],
    },
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'founders',
  })

  // TODO
  // .eth returning undefined
  const validateData = async (data) => {
    if (!data) return
    const founders = data?.founders 

    for (let i=0; i<founders.length; i++) {
      if (!ethers.utils.isAddress(founders[i].member)) {
        try {
          founders[i].member = await fetchEnsAddress(founders[i].member)
        } catch (e) {
          return false
        }
      }
    }
    
    console.log(founders)
    return true
  };

  const onPrevious = (data) => {
    if (validateData(data)) {
      actions.updateAction(data)

      if (!hardMode) {
        setStep('id')
      } else {
        setStep('apps')
      }
    }
  }

  const onNext = (data) => {
    console.log("data", data);
    if (validateData(data)) {
      actions.updateAction(data)

      if (!hardMode) {
        setStep('confirm')
      } else {
        setStep('apps')
      }
    }
  }

  return (
    <Form>
      {/* TODO: Copy last share value in next field */}
      <Flex style={{ flexDirection: 'column', gap: '0.5rem' }}>
        <Flex style={{ justifyContent: 'space-around' }}>
          <div>Account</div>
          <div>Share</div>
        </Flex>
        <Flex dir="col" css={{ gap: '1rem', width: '100%' }}>
          {fields.map((item, index) => {
            return (
              <Flex key={item.id} css={{ gap: '1rem', justifyContent: 'center', alignItems: 'center' }}>
                <div>
                  <Input
                    id="member"
                    {...register(`founders.${index}.member`, {
                      required: true,
                    })}
                    defaultValue={item.member}
                    css={{
                      fontFamily: 'Screen',
                    }}
                    type="text"
                  />
                </div>
                <div>
                  <Input
                    id="share"
                    type="number"
                    {...register(`founders.${index}.share`, {
                      required: true,
                      min: 1
                    })}
                    defaultValue={item.share}
                  />
                </div>
                <Button
                  variant="icon"
                  onClick={(e) => {
                    e.preventDefault()
                    remove(index)
                  }}
                >
                  <Cross2Icon />
                </Button>
              </Flex>
            )
          })}
          <Flex
            css={{
              justifyContent: 'center',
            }}
          >
            <Button
              variant="primary"
              css={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '1%',
                width: '85%',
              }}
              onClick={(e) => {
                e.preventDefault()
                append({
                  member: '',
                  share: '1000',
                })
              }}
            >
              Add
              <PersonIcon />
            </Button>
          </Flex>
        </Flex>
      </Flex>
      <Flex css={{ justifyContent: 'flex-end' }}>
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
