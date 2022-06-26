import React, { useState } from 'react'
import { Flex, Text, Button } from '../../styles/elements'
import Mint from './Mint'

import CreateEntityType from './CreateEntityType'
import Settings from './Settings'
import Update from './Update'

export default function index() {
  const [view, setView] = useState(0)

  const views = [
    {
      title: 'MINT SERIES',
      component: <Mint />,
    },
    {
      title: 'CREATE ENTITY TYPE',
      component: <CreateEntityType />,
    },
    {
      title: 'UPDATE BASE URI',
      component: <Update />,
    },
  ]

  return (
    <Flex
      css={{
        position: 'absolute',
        marginLeft: 'auto',
        marginRight: 'auto',
        top: '25%',
        left: 0,
        right: 0,
        textAlign: 'center',
        maxWidth: '40rem',
        height: 'auto',
        background: '$mauve2',
        border: '1px solid $mauve6',
        color: '$mauve11',
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'column',
        gap: '20px',
        borderRadius: '20px',
        padding: '16px',
      }}
    >
      <Flex
        css={{
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%',
        }}
      >
        <Text
          css={{
            fontSize: '24px',
          }}
        >
          {views[view]['title']}
        </Text>
        <Settings view={view} setView={setView} />
      </Flex>
      {views[view]['component']}
    </Flex>
  )
}
