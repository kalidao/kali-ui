import React from 'react'
import updateAction from './updateAction'
import { useStateMachine } from 'little-state-machine'
import { Button } from '../../styles/elements'
import { DotFilledIcon } from '@radix-ui/react-icons'

export default function Toggle() {
  const { actions, state } = useStateMachine({ updateAction })
  const { hardMode } = state

  return (
    <Button
      variant="transparent"
      css={{
        color: '$gray11',
        padding: '2px 10px',
        border: '1px solid $gray6',
        borderRadius: '20px',

        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '16px',
        fontWeight: '600',

        '&:hover': {
          color: '$gray12',
          background: '$gray3',
          border: '1px solid $gray7',
        },
      }}
      onClick={() =>
        actions.updateAction({
          hardMode: !hardMode,
        })
      }
    >
      {hardMode === false ? '2 Clicks' : '7 Clicks'}
      <DotFilledIcon color={hardMode === false ? 'green' : 'red'} />
    </Button>
  )
}
