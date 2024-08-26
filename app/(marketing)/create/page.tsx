'use client'
import React, { useEffect } from 'react'
import { NextPage } from 'next'
import { useRouter } from 'next/navigation'
import DeployDaoWrapper from '@components/deploy-dao'
import { Back } from '@components/ui/back'

const CreatePage: NextPage = () => {
  const router = useRouter()

  useEffect(() => {
    router.prefetch('/')
  }, [router])

  const goto = () => {
    router.push('/')
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-4">
        <Back onClick={goto} />
      </div>
      <DeployDaoWrapper />
    </div>
  )
}

export default CreatePage
