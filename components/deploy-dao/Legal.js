import React from 'react'
import { Form, FormElement, Switch, Label, Input } from '../../styles/form-elements'
import { Select } from '../../styles/form-elements/Select'
import { useForm } from 'react-hook-form'
import { useStateMachine } from 'little-state-machine'
import updateAction from './updateAction'
import { Flex, Text } from '../../styles/elements'
import { legalEntities } from '../../constants/legalEntities'
import { OpenInNewWindowIcon } from '@radix-ui/react-icons'
import { Stack, Button } from '@kalidao/reality'

export default function Legal({ setStep }) {
  const {
    control,
    watch,
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const { actions, state } = useStateMachine({ updateAction })
  const { hardMode, legal, docType } = state
  const watchLegal = watch('legal', legal)
  const watchDocs = watch('docType', docType)
  console.log(watchDocs)
  const onPrevious = (data) => {
    actions.updateAction(data)
    setStep(2)
    // if (!hardMode) {
    //   setStep(0)
    // } else {
    //   setStep(4)
    // }
  }
  const onNext = (data) => {
    actions.updateAction(data)

    setStep(4)
  }

  let selectArray = []
  for (let key in legalEntities) {
    selectArray.push(
      <Select.Item key={key} value={key}>
        {legalEntities[key]['text']}
      </Select.Item>,
    )
  }

  return (
    <Form>
      <FormElement>
        <Label htmlFor="legal">Add structure</Label>
        <Switch
          control={control}
          name="legal"
          value="legal"
          defaultValue={state['legal']}
          onValueChange={(value) => setValue('legal', value)}
        />
      </FormElement>
      {watchLegal && (
        <>
          <FormElement>
            <Label htmlFor="docs">Choose entity</Label>
            <Select
              {...register('docType')}
              defaultValue={state.docType}
              // onChange={(value) => setValue('docType', value)}
            >
              {selectArray}
            </Select>
          </FormElement>
          <FormElement>
            <Label htmlFor="docs"></Label>
            <Text variant="link">
              Resources to help with entity selection:
              <a href="https://a16z.com/2022/05/23/dao-legal-frameworks-entity-features-selection/"> a16z</a>
              or
              <a href="https://daos.paradigm.xyz/"> Paradigm</a>
            </Text>
          </FormElement>
          {watchDocs && legalEntities[watchDocs]['email'] === true && (
            <FormElement>
              <Label htmlFor="email">Email</Label>
              <Flex dir="col" gap="sm">
                <Input
                  type="email"
                  name="email"
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
                />
                {errors?.email && <span>{errors?.email?.message}</span>}
              </Flex>
            </FormElement>
          )}
          {watchDocs && legalEntities[watchDocs]['mission'] === true && (
            <FormElement>
              <Label htmlFor="mission">Mission</Label>
              <Flex dir="col" gap="sm">
                <Input
                  type="url"
                  name="mission"
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
                />
                {errors?.mission && <span>{errors?.mission?.message}</span>}
              </Flex>
            </FormElement>
          )}
          {watchDocs === 'existing' && (
            <FormElement>
              <Label htmlFor="existingDocs">Existing Docs</Label>
              <Input
                type="text"
                name="existingDocs"
                placeholder="Any link"
                {...register('existingDocs')}
                defaultValue={state.existingDocs}
              />
            </FormElement>
          )}
          {watchDocs && <FormElement>{legalEntities[watchDocs]['message']}</FormElement>}
          {watchDocs && legalEntities[watchDocs]['template'] != null && (
            <Text
              as="a"
              href={legalEntities[watchDocs]['template']}
              target="_blank"
              css={{
                display: 'flex',
                gap: '0.2rem',
                justifyContent: 'flex-end',
                alignItems: 'center',
                fontFamily: 'Italic',

                '&:hover': {
                  color: '$accent',
                },
              }}
            >
              Review Template
              <OpenInNewWindowIcon />
            </Text>
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
    </Form>
  )
}
