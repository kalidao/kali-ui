import React from 'react'
import { GlobalState, useStateMachine } from 'little-state-machine'
import { useForm } from 'react-hook-form'
import updateAction from './updateAction'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@components/ui/select'
import { Switch } from '@components/ui/switch'
import { Input } from '@components/ui/input'
import { Button } from '@components/ui/button'
import { Calendar } from '@components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@components/ui/popover'
import { cn } from '@utils/util'
import { format } from 'date-fns'
import { Calendar as CalendarIcon } from 'lucide-react'

type Props = {
  setStep: React.Dispatch<React.SetStateAction<number>>
}

export default function Crowdsale({ setStep }: Props) {
  const { actions, state } = useStateMachine({ updateAction })
  const { hardMode } = state
  const {
    control,
    watch,
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<GlobalState>()
  const watchCrowdsale = watch('crowdsale', state.crowdsale)
  const watchPurchaseToken = watch('purchaseToken', state.purchaseToken)

  const onPrevious = (data: GlobalState) => {
    actions.updateAction(data)
    if (!hardMode) {
      setStep(0)
    } else {
      setStep(2)
    }
  }

  const onNext = (data: GlobalState) => {
    actions.updateAction(data)
    setStep(4)
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">Swap</h2>
        <p className="text-sm text-gray-500">Configure your swap settings</p>
      </div>

      <div className="flex items-center justify-between">
        <span className="font-medium">Add Swap</span>
        <Switch checked={watchCrowdsale} onCheckedChange={(value) => setValue('crowdsale', value)} />
      </div>

      {watchCrowdsale && (
        <div className="space-y-4">
          <Select onValueChange={(value) => setValue('purchaseToken', value)} defaultValue={state['purchaseToken']}>
            <SelectTrigger>
              <SelectValue placeholder="Select contribution token" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="eth">ETH</SelectItem>
              <SelectItem value="custom">Custom</SelectItem>
            </SelectContent>
          </Select>

          {watchPurchaseToken === 'custom' && (
            <Input
              placeholder="Custom Token Address"
              {...register('customTokenAddress')}
              defaultValue={state['customTokenAddress']}
            />
          )}

          <Input
            type="number"
            placeholder="Total Contribution Limit"
            defaultValue={state['purchaseLimit']}
            {...register('purchaseLimit', {
              required: 'Purchase Limit is required.',
              min: { value: 0, message: 'Purchase Limit must be more than 0.' },
            })}
          />
          {errors.purchaseLimit && <p className="text-sm text-red-500">{errors.purchaseLimit.message}</p>}

          <Input
            type="number"
            placeholder="Personal Contribution Limit"
            defaultValue={state['personalLimit']}
            {...register('personalLimit', {
              required: 'Personal Purchase Limit is required.',
              min: { value: 0, message: 'Personal purchase Limit must be more than 0.' },
            })}
          />
          {errors.personalLimit && <p className="text-sm text-red-500">{errors.personalLimit.message}</p>}

          <Input
            type="number"
            placeholder="Contribution Multiplier"
            defaultValue={state['purchaseMultiplier']}
            {...register('purchaseMultiplier', {
              required: 'Purchase Multiplier is required.',
              min: { value: 0, message: 'Purchase Multiplier must be more than 0.' },
            })}
          />
          {errors.purchaseMultiplier && <p className="text-sm text-red-500">{errors.purchaseMultiplier.message}</p>}

          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={'outline'}
                className={cn(
                  'w-full justify-start text-left font-normal',
                  !state.crowdsaleEnd && 'text-muted-foreground',
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {state.crowdsaleEnd ? format(state.crowdsaleEnd, 'PPP') : <span>Pick an end date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={state.crowdsaleEnd ? new Date(state.crowdsaleEnd) : undefined}
                onSelect={(date) => setValue('crowdsaleEnd', date?.toString() || '')}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
      )}

      <div className="flex justify-end space-x-2">
        <Button variant="outline" onClick={handleSubmit(onPrevious)}>
          Previous
        </Button>
        <Button onClick={handleSubmit(onNext)}>Next</Button>
      </div>
    </div>
  )
}
