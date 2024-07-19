import React from 'react'
import { useForm } from 'react-hook-form'
import { GlobalState, useStateMachine } from 'little-state-machine'
import { Link2 } from 'lucide-react'
import { Button } from '@components/ui/button'
import { Switch } from '@components/ui/switch'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@components/ui/select'
import { Input } from '@components/ui/input'
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
    setStep(hardMode ? 4 : 0)
  }
  const onNext = (data: GlobalState) => {
    actions.updateAction(data)
    setStep(6)
  }

  const selectArray = [
    { label: 'Select', value: 'none' },
    ...Object.entries(legalEntities).map(([key, value]) => ({
      label: value.text,
      value: key,
    })),
  ]

  return (
    <fieldset className="space-y-6">
      <legend className="text-lg font-semibold">Legal</legend>
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium">Add structure</span>
        <Switch checked={watchLegal} onCheckedChange={(value) => setValue('legal', value)} />
      </div>
      {watchLegal && (
        <>
          <Select defaultValue={state.docType} onValueChange={(value) => setValue('docType', value)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {selectArray.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <p className="text-sm">
            Resources to help with entity selection:{' '}
            <a
              href="https://a16z.com/2022/05/23/dao-legal-frameworks-entity-features-selection/"
              className="text-blue-600 hover:underline"
            >
              a16z
            </a>{' '}
            or{' '}
            <a href="https://daos.paradigm.xyz/" className="text-blue-600 hover:underline">
              Paradigm
            </a>
          </p>

          {watchDocs && watchDocs !== 'none' && legalEntities[watchDocs]['email'] && (
            <Input
              type="email"
              placeholder="abc@xyz.com"
              defaultValue={state.email}
              {...register('email', {
                required: `Email is required for ${legalEntities[watchDocs]['text']}.`,
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Please enter a valid email.',
                },
              })}
            />
          )}
          {watchDocs && watchDocs !== 'none' && legalEntities[watchDocs]['mission'] && (
            <Input
              type="text"
              placeholder="http://"
              defaultValue={state.mission}
              {...register('mission', {
                required: `Mission is required for ${legalEntities[watchDocs]['text']}.`,
                pattern: {
                  value: /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/,
                  message: 'Please enter a valid URL.',
                },
              })}
            />
          )}
          {watchDocs === 'existing' && (
            <Input type="text" placeholder="Any link" {...register('existingDocs')} defaultValue={state.existingDocs} />
          )}
          {watchDocs && watchDocs !== 'none' && <p className="text-sm">{legalEntities[watchDocs]['message']}</p>}
          {watchDocs && watchDocs !== 'none' && legalEntities[watchDocs]['template'] && (
            <Button asChild variant="outline">
              <a
                href={legalEntities[watchDocs]['template']}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center"
              >
                <Link2 className="mr-2 h-4 w-4" />
                Review Template
              </a>
            </Button>
          )}
        </>
      )}

      <div className="flex justify-end space-x-4">
        <Button variant="outline" onClick={handleSubmit(onPrevious)}>
          Previous
        </Button>
        <Button onClick={handleSubmit(onNext)}>Next</Button>
      </div>
    </fieldset>
  )
}
