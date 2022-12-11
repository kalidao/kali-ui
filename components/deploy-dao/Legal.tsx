import React from 'react'
import { Stack, FieldSet, Input, Text, Button, IconLink, Textarea } from '@kalidao/reality'
import { Select } from '@design/Select'
import { Switch } from '@design/Switch'
import { useForm } from 'react-hook-form'
import { GlobalState, useStateMachine } from 'little-state-machine'
import updateAction from './updateAction'
import { legalEntities } from '../../constants/legalEntities'

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

  let selectArray = [
    {
      label: 'Select',
      value: 'none',
    },
  ]
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
            // {...register('docType')}
            defaultValue={state.docType}
            options={selectArray}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setValue('docType', e.currentTarget.value)}
          />
          {watchDocs && watchDocs !== 'none' && legalEntities[watchDocs]['isJurisdiction'] === true && <Select label="Choose Jurisdiction" defaultValue={state.jurisdiction} options={legalEntities[watchDocs]['jurisdiction']} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setValue('jurisdiction', e.currentTarget.value)} />}
          {watchDocs && watchDocs !== 'none' && legalEntities[watchDocs]['email'] === true && (
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
          {watchDocs && watchDocs !== 'none' && legalEntities[watchDocs]['mission'] === true && (
            <Textarea
              label="Mission"
              placeholder="This DAO seeks to..."
              defaultValue={state.mission}
              {...register('mission', {
                required: {
                  value: true,
                  message: `Mission is required for ${legalEntities[watchDocs]['text']}.`,
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
          {watchDocs && watchDocs !== 'none' && <Text>{legalEntities[watchDocs]['message']}</Text>}
          {watchDocs && watchDocs !== 'none' && legalEntities[watchDocs]['template'] !== null && (
            <Button size="small" variant="secondary" as="a" href={legalEntities[watchDocs]['template'] as string} target="_blank" prefix={<IconLink />}>
              Review Template
            </Button>
          )}
        </>
      )}
       <Text>
            Resources to help with entity selection:{' '}
            <a href="https://a16z.com/2022/05/23/dao-legal-frameworks-entity-features-selection/">a16z</a> or{' '}
            <a href="https://daos.paradigm.xyz/"> Paradigm</a>
      </Text>
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
