import React from 'react'
import updateAction from './updateAction'
import { useStateMachine } from 'little-state-machine'
import { Button } from "../../styles/elements";
import { DotFilledIcon } from '@radix-ui/react-icons';

export default function Toggle() {
  const { actions, state } = useStateMachine({ updateAction })
  const { hardMode } = state

  return (
    <Button
            variant="transparent"
            css={{
              display: 'flex',
              background: '$gray100',
              color: '$background',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '16px',
              fontWeight: '600',
              '&:hover': {
                background: '$gray100',
              },
            }}
            onClick={() => actions.updateAction({
              hardMode: !hardMode
            })}
          >
            {hardMode === false ? 'Easy Mode' : 'Hard Mode'}
            <DotFilledIcon color={hardMode === false ? 'green' : 'red'} />
    </Button>
  )
}
