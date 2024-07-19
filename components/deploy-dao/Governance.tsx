import React from 'react'
import { useForm, Controller } from 'react-hook-form'
import { GlobalState, useStateMachine } from 'little-state-machine'
import updateAction from './updateAction'
import { Input } from '@components/ui/input'
import { Button } from '@components/ui/button'
import { Switch } from '@components/ui/switch'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@components/ui/select'
import { ChevronLeft, ChevronRight } from 'lucide-react'

type Props = {
  setStep: React.Dispatch<React.SetStateAction<number>>
}

export default function Governance({ setStep }: Props) {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<GlobalState>()
  const { actions, state } = useStateMachine({ updateAction })
  const { hardMode } = state

  const onPrevious = (data: GlobalState) => {
    actions.updateAction(data)
    setStep(0)
  }

  const onNext = (data: GlobalState) => {
    actions.updateAction(data)
    setStep(hardMode ? 2 : 4)
  }

  return (
    <form onSubmit={handleSubmit(onNext)} className="space-y-6">
      <fieldset className="border p-4 rounded-md">
        <legend className="text-lg font-semibold">Governance</legend>

        <div className="flex space-x-4">
          <div className="flex-1">
            <Input
              type="number"
              id="votingPeriod"
              placeholder="5"
              {...register('votingPeriod', { required: true })}
              defaultValue={state.votingPeriod}
              min="1"
            />
            <label htmlFor="votingPeriod" className="block mt-1 text-sm">
              Voting Period
            </label>
          </div>
          <div className="flex-1">
            <Controller
              name="votingPeriodUnit"
              control={control}
              defaultValue={state.votingPeriodUnit}
              render={({ field }) => (
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="min">Minutes</SelectItem>
                    <SelectItem value="hour">Hours</SelectItem>
                    <SelectItem value="day">Days</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
            <label className="block mt-1 text-sm">Voting Period Unit</label>
          </div>
        </div>

        <div className="mt-4">
          <Input
            type="number"
            id="quorum"
            placeholder="20"
            min="1"
            max="100"
            {...register('quorum', {
              required: 'Participation percentage is required.',
              min: { value: 0, message: 'Participation percentage must be above 0.' },
              max: { value: 100, message: 'Participation percentage must be below 100.' },
            })}
            defaultValue={state.quorum}
          />
          <label htmlFor="quorum" className="block mt-1 text-sm">
            Participation Needed
          </label>
          {errors.quorum && <p className="text-red-500 text-sm">{errors.quorum.message}</p>}
          <p className="text-sm text-gray-500">Minimum percentage of votes required for a proposal to pass</p>
        </div>

        <div className="mt-4">
          <Input
            type="number"
            id="approval"
            placeholder="60"
            min="51"
            max="100"
            {...register('approval', {
              required: 'Approval percentage is required.',
              min: { value: 51, message: 'Approval percentage must be more than 52.' },
              max: { value: 100, message: 'Approval percentage must be below 100.' },
            })}
            defaultValue={state.approval}
          />
          <label htmlFor="approval" className="block mt-1 text-sm">
            Approval Needed
          </label>
          {errors.approval && <p className="text-red-500 text-sm">{errors.approval.message}</p>}
          <p className="text-sm text-gray-500">Minimum percentage of positive votes required for a proposal to pass</p>
        </div>

        <div className="mt-4 flex items-center space-x-2">
          <Controller
            name="transferability"
            control={control}
            render={({ field }) => (
              <Switch checked={field.value} onCheckedChange={field.onChange} id="transferability" />
            )}
          />
          <label htmlFor="transferability" className="text-sm">
            Allow token transferability
          </label>
        </div>
      </fieldset>

      <div className="flex justify-end space-x-4">
        <Button variant="outline" onClick={handleSubmit(onPrevious)}>
          <ChevronLeft className="mr-2 h-4 w-4" /> Previous
        </Button>
        <Button type="submit">
          Next <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </form>
  )
}
