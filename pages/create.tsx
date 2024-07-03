import React, { useEffect } from 'react'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import Layout from '@components/layout'
import DeployDaoWrapper from '@components/deploy-dao'
import Back from '@design/proposal/Back'

const CreatePage: NextPage = () => {
  const router = useRouter()

  useEffect(() => {
    router.prefetch('/')
  }, [router])

  const goto = () => {
    router.push('/')
  }

  return (
    <Layout heading="Create" content="Create a Kali DAO.">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-4">
          <Back onClick={goto} />
        </div>
        <div className="bg-white shadow-md rounded-lg p-6">
          <DeployDaoWrapper />
        </div>
      </div>
    </Layout>
  )
}

export default CreatePage
