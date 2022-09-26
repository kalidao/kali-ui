import React, { useState } from 'react'
import { NextPage } from 'next'
import Layout from '../../../../components/dao-dashboard/layout'
import { Button, Stack, Text, IconPencil } from '@kalidao/reality'
import { FaPen } from 'react-icons/fa'
import { Setting, SettingsMenu } from '@components/dao-dashboard/settings'

const Settings: NextPage = () => {
  const [setting, setSetting] = useState('gov')

  return (
    <Layout heading={`Settings`} content="View and edit DAO configurations.">
      <Stack direction={'vertical'}>
        <SettingsMenu setSetting={setSetting} setting={setting} />
        <Setting setting={setting} />
      </Stack>
    </Layout>
  )
}

export default Settings
