import React from 'react'
import { GlobalState, useStateMachine } from 'little-state-machine'
import updateAction from './updateAction'
import { useForm } from 'react-hook-form'
import { Button } from '@components/ui/button'
import { Switch } from '@components/ui/switch'
import { DatePicker } from '@components/ui/date-picker'
import { ArrowLeft, ArrowRight } from 'lucide-react'

type Props = {
  setStep: React.Dispatch<React.SetStateAction<number>>
}

export default function Redemption({ setStep }: Props) {
  const { actions, state } = useStateMachine({ updateAction })
  const { hardMode } = state
  const { control, watch, handleSubmit, setValue } = useForm<GlobalState>()
  const watchRedemption = watch('redemption', state.redemption)

  const onPrevious = (data: GlobalState) => {
    actions.updateAction(data)
    setStep(hardMode ? 1 : 0)
  }

  const onNext = (data: GlobalState) => {
    actions.updateAction(data)
    setStep(hardMode ? 3 : 4)
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Redemption</h2>
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Switch
            id="redemption"
            checked={watchRedemption}
            onCheckedChange={(checked) => setValue('redemption', checked)}
          />
          <label
            htmlFor="redemption"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Add Redemption
          </label>
        </div>
        {watchRedemption && (
          <div className="space-y-2">
            <label htmlFor="redemptionStart" className="text-sm font-medium leading-none">
              Start Date
            </label>
            <DatePicker
              id="redemptionStart"
              selected={state.redemptionStart}
              onSelect={(date) => setValue('redemptionStart', date)}
            />
          </div>
        )}
      </div>
      <div className="flex justify-end space-x-2">
        <Button variant="outline" onClick={handleSubmit(onPrevious)}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Previous
        </Button>
        <Button onClick={handleSubmit(onNext)}>
          Next <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
