import React from 'react'
import { useStateMachine } from 'little-state-machine'
import { Button } from '@components/ui/button'
import { Plus, Minus } from 'lucide-react'
import updateAction from './updateAction'

export default function Toggle() {
  const { actions, state } = useStateMachine({ updateAction })
  const { hardMode } = state

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() =>
        actions.updateAction({
          hardMode: !hardMode,
        })
      }
      className="flex items-center space-x-1"
    >
      <span>{hardMode ? 'Hard' : 'Easy'}</span>
      {hardMode ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
    </Button>
  )
}
