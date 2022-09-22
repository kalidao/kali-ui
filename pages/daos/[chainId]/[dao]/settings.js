import React, { useState } from 'react'
import Layout from '../../../../components/dao-dashboard/layout/'
import { Button, Flex, Text } from '../../../../styles/elements'
import { FaPen } from 'react-icons/fa'
import { Setting, SettingsMenu } from '../../../../components/dao-dashboard/settings'

export default function SettingsPage() {
  const [setting, setSetting] = useState('gov')

  return (
    <Layout heading={`Settings`} content="View and edit DAO configurations.">
      <Flex
        css={{
          position: 'fixed',
          flexDirection: 'row',
          // borderLeft: '1px solid hsla(0, 0%, 90%, 0.1)',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          height: '100vh',
        }}
      >
        <SettingsMenu setSetting={setSetting} setting={setting} />
        <Setting setting={setting} />
      </Flex>
    </Layout>
  )
}

const Card = ({ title, value, propose }) => {
  return (
    <Flex
      css={{
        gap: '10px',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <Text
        css={{
          fontSize: '16px',
          fontFamily: 'Regular',
          width: '80%',
        }}
      >
        {title}
      </Text>
      <Text
        css={{
          fontSize: '16px',
          fontFamily: 'Regular',
        }}
      >
        {value}
      </Text>
      <Button
        css={{
          all: 'unset',
          height: '10px',
          width: '10px',
          padding: '6px',
          border: '1px solid $gray3',
          borderRadius: '100%',
          background: '$gray2',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',

          '&:hover': {
            border: '1px solid $gray4',
            background: '$gray3',
          },
        }}
      >
        <FaPen />
      </Button>
    </Flex>
  )
}
