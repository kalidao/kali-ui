import React, { useState } from 'react'
import { NextPage } from 'next'
import Layout from '../../../../components/dao-dashboard/layout'
import { Card, Button, Stack, Text, IconPencil } from '@kalidao/reality'
import { Setting, SettingsMenu } from '@components/dao-dashboard/settings'

const Settings: NextPage = () => {
  const [setting, setSetting] = useState('gov')

  return (
    <Layout title={`Settings`} content="View and edit DAO configurations.">
      <Card padding="6">
        <Stack direction={'vertical'}>
          <SettingsMenu setSetting={setSetting} setting={setting} />
          <Setting setting={setting} />
        </Stack>
      </Card>
    </Layout>
  )
}

export default Settings
