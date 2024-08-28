'use client'
import React, { useState } from 'react'
import { NextPage } from 'next'
import { Setting } from '@components/dao-dashboard/settings/Setting'
import { SettingsMenu } from '@components/dao-dashboard/settings/SettingsMenu'

const SettingsPage: NextPage = () => {
  const [s, setS] = useState('gov')

  return (
    <div className="p-1">
      <SettingsMenu setSetting={setS} setting={s} />
      <Setting setting={s} />
    </div>
  )
}

export default SettingsPage
