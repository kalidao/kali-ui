import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { GlobalState, useStateMachine } from 'little-state-machine'
import { getNames } from '@graph/queries'
import updateAction from './updateAction'
import Tutorial from './tutorial'
import { Button } from '@components/ui/button'
import { Input } from '@components/ui/input'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@components/ui/form'
import { useAccount } from 'wagmi'

type Props = {
  setStep: React.Dispatch<React.SetStateAction<number>>
}

export default function Identity({ setStep }: Props) {
  const form = useForm<GlobalState>()
  const { chain: activeChain } = useAccount()
  const { actions, state } = useStateMachine({ updateAction })
  const { hardMode } = state
  const [names, setNames] = useState<string[]>([])

  useEffect(() => {
    if (!activeChain) return
    let mounted = true
    const fetchNames = async () => {
      const result = await getNames(activeChain?.id)
      const names = result?.data?.daos.map((dao) => dao?.token?.name) || []
      if (mounted) setNames(names)
    }
    fetchNames()
    return () => {
      mounted = false
    }
  }, [activeChain])

  const onSubmit = (data: GlobalState) => {
    if (names.includes(data?.name)) {
      form.setError('name', {
        type: 'custom',
        message: 'Name is not unique. Please choose another!',
      })
      return
    }
    actions.updateAction(data)
    setStep(hardMode ? 1 : 4)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="space-y-2">
          <h2 className="text-lg font-semibold">Token</h2>
          <p className="text-sm text-gray-500">
            Your token is the identity of your organization. The token created will be ERC20 compliant.
          </p>
        </div>

        <FormField
          control={form.control}
          name="name"
          rules={{
            required: 'Name is required.',
          }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="KaliCo" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="symbol"
          rules={{
            required: 'Symbol is required.',
            maxLength: {
              value: 11,
              message: 'Max symbol length exceeded',
            },
          }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Symbol</FormLabel>
              <FormControl>
                <Input
                  placeholder="KCO"
                  {...field}
                  className="uppercase"
                  onChange={(e) => field.onChange(e.target.value.toUpperCase())}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-between items-center">
          <Tutorial />
          <Button type="submit">Next</Button>
        </div>
      </form>
    </Form>
  )
}
