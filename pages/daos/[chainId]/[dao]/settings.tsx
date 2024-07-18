import React, { useState } from 'react'
import { NextPage } from 'next'
import Layout from '@components/dao-dashboard/layout'
import { Setting, SettingsMenu } from '@components/dao-dashboard/settings'
import { Card } from '@components/ui/card'

const Settings: NextPage = () => {
  const [setting, setSetting] = useState('gov')

  return (
    <Layout title={`Settings`} content="View and edit DAO configurations.">
      <Card className="flex flex-col p-6">
        <SettingsMenu setSetting={setSetting} setting={setting} />
        <Setting setting={setting} />
      </Card>
    </Layout>
  )
}

export default Settings
