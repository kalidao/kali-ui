import React from 'react'
import { Stack, FieldSet, Input, Button, Field } from '@kalidao/reality'
import { Select } from '@design/Select'
import { Switch } from '@design/Switch'
import { useForm } from 'react-hook-form'
import { GlobalState, useStateMachine } from 'little-state-machine'
import updateAction from './updateAction'
import { Flex, Text } from '../../styles/elements'
import { legalEntities } from '../../constants/legalEntities'
import { OpenInNewWindowIcon } from '@radix-ui/react-icons'

type Props = {
  setStep: React.Dispatch<React.SetStateAction<number>>
}

export default function Legal({ setStep }: Props) {
  const {
    control,
    watch,
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<GlobalState>()
  const { actions, state } = useStateMachine({ updateAction })
  const { hardMode, legal, docType } = state
  const watchLegal = watch('legal', legal)
  const watchDocs = watch('docType', docType)

  const onPrevious = (data: GlobalState) => {
    actions.updateAction(data)

    if (!hardMode) {
      setStep(0)
    } else {
      setStep(4)
    }
  }
  const onNext = (data: GlobalState) => {
    actions.updateAction(data)

    setStep(6)
  }

  let selectArray = []
  for (let key in legalEntities) {
    selectArray.push({
      label: legalEntities[key].text,
      value: key,
    })
  }

  return (
    <FieldSet legend="Legal">
      <Stack align="center" justify={'space-between'} direction="horizontal">
        <Text>Add structure</Text>
        <Switch
          control={control}
          label="Add structure"
          name="legal"
          value="legal"
          defaultValue={state['legal']}
          onValueChange={(value: boolean) => setValue('legal', value)}
        />
      </Stack>
      {watchLegal && (
        <>
          <Select
            label="Choose Entity"
            {...register('docType')}
            defaultValue={state.docType}
            options={selectArray}
            // onChange={(value) => setValue('docType', value)}
          />
          <Text>
            Resources to help with entity selection:
            <a href="https://a16z.com/2022/05/23/dao-legal-frameworks-entity-features-selection/"> a16z</a>
            or
            <a href="https://daos.paradigm.xyz/"> Paradigm</a>
          </Text>

          {watchDocs && legalEntities[watchDocs]['email'] === true && (
            <Input
              label="Email"
              type="email"
              placeholder="abc@xyz.com"
              defaultValue={state.email}
              {...register('email', {
                required: {
                  value: true,
                  message: `Email is required for ${legalEntities[watchDocs]['text']}.`,
                },
                // regex taken from https://www.w3resource.com/javascript/form/email-validation.php
                pattern: {
                  value:
                    /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/,
                  message: 'Please enter a valid email.',
                },
              })}
              error={errors?.email?.message}
            />
          )}
          {watchDocs && legalEntities[watchDocs]['mission'] === true && (
            <Input
              label="Mission"
              type="text"
              placeholder="http://"
              defaultValue={state.mission}
              {...register('mission', {
                required: {
                  value: true,
                  message: `Mission is required for ${legalEntities[watchDocs]['text']}.`,
                },
                pattern: {
                  value:
                    /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/,
                  message: 'Please enter a valid URL.',
                },
              })}
              error={errors?.mission?.message}
            />
          )}
          {watchDocs === 'existing' && (
            <Input
              label="Existing Docs"
              type="text"
              placeholder="Any link"
              {...register('existingDocs')}
              defaultValue={state.existingDocs}
            />
          )}
          {watchDocs && <Text>{legalEntities[watchDocs]['message']}</Text>}
          {watchDocs && legalEntities[watchDocs]['template'] !== null && (
            <Button
              as="a"
              href={legalEntities[watchDocs]['template'] as string}
              target="_blank"
              prefix={<OpenInNewWindowIcon />}
            >
              Review Template
            </Button>
          )}
        </>
      )}

      <Stack direction={'horizontal'} align="center" justify={'flex-end'}>
        <Button variant="transparent" onClick={handleSubmit(onPrevious)}>
          Previous
        </Button>
        <Button variant="primary" type="submit" onClick={handleSubmit(onNext)}>
          Next
        </Button>
      </Stack>
    </FieldSet>
  )
}
