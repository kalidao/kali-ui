import React from 'react'
import updateAction from './updateAction'
import { useStateMachine } from 'little-state-machine'
import { Button } from '@kalidao/reality'
import { DotFilledIcon } from '@radix-ui/react-icons'

export default function Toggle() {
  const { actions, state } = useStateMachine({ updateAction })
  const { hardMode } = state

  return (
    <Button
      suffix={<DotFilledIcon color={hardMode === false ? 'green' : 'red'} />}
      variant="transparent"
      onClick={() =>
        actions.updateAction({
          hardMode: !hardMode,
        })
      }
    >
      {hardMode === false ? '2 Clicks' : '7 Clicks'}
    </Button>
  )
}
